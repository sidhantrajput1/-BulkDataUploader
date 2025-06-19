import express from "express";
import cors from "cors";
import multer from "multer";
import monitor from "express-status-monitor";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "redis";
import { Server } from "socket.io";
import { createServer } from "http";
import csv from "csv-parser";
import Queue from "bull";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Express and Socket.io server setup
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(monitor());
app.use(express.json());
app.use(cors());

// Redis setup
const redisClient = createClient();
redisClient.on("error", (err) => console.error("Redis Error", err));
await redisClient.connect();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Bull queue setup
const fileQueue = new Queue("fileQueue", {
  redis: { host: "127.0.0.1", port: 6379 },
});

// 🔁 Emit processing stats to frontend
const sendQueueStats = async () => {
  const stats = {
    active: await fileQueue.getActiveCount(),
    completed: await fileQueue.getCompletedCount(),
    failed: await fileQueue.getFailedCount(),
    queued: await fileQueue.getWaitingCount(),
  };
  io.emit("job-stats", stats);
};

// WebSocket connection
io.on("connection", (socket) => {
  console.log("Socket.io: Client connected");
  sendQueueStats(); // Emit stats on connect
});

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json("No file uploaded");

  const fileUniqueId = uuidv4();
  const fileName = req.file.originalname.split(".")[0];
  const rows = [];

  // Parse CSV from buffer
  Readable.from(req.file.buffer)
    .pipe(csv())
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", async () => {
      // Push to processing queue
      await fileQueue.add({ rows, fileId: fileUniqueId, fileName });
      res.status(201).json({
        message: "File uploaded & queued for processing",
        fileUniqueId,
        rowCount: rows.length,
        file: {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
        },
      });

      await sendQueueStats();
    });
});

// Queue worker logic
fileQueue.process(async (job, done) => {
  const { rows, fileId, fileName } = job.data;
  let successCount = 0;
  let failCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    try {
      if (!row.storeName) throw new Error("Missing storeName");

      const key = `${fileName}:row:${
        row.storeName.split(" ")[1] || Date.now()
      }`;
      await redisClient.hSet(key, row);
      successCount++;
    } catch (error) {
      failCount++;
    }

    const percent = Math.round(((i + 1) / rows.length) * 100);
    if (percent % 10 === 0 || percent === 100) {
      io.emit("progress", { fileId, percent });
    }
  }

  const duration = `${((Date.now() - startTime) / 1000).toFixed(2)}s`;

  io.emit("complete", {
    fileId,
    message: "Processing complete",
    total: rows.length,
    successCount,
    failCount,
    duration,
  });

  await sendQueueStats(); 
  done();
});

// Periodically send stats every 10 seconds
setInterval(() => {
  sendQueueStats();
}, 10000);


// Connect to MongoDB
connectDB();

// Ping route
app.get("/", (req, res) => {
  res.send("Ping Pong");
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
