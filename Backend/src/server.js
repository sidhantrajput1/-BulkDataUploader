import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path, { format } from "path";
import monitor from "express-status-monitor";
import { Readable } from "stream";
import { v4 as uuidv4 } from 'uuid'; 
import { createClient } from "redis";

const client = createClient();
import csv from "csv-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(monitor());
app.use(express.json());
app.use(cors());

// multer.js

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {

  const fileUniqueId = uuidv4();
  let rowCount = 0;

  if (!req.file) res.status(400).json("No file upload");

  const fileName = req.file.originalname.split(".")[0];

  console.log(fileName, req.file);
  console.log(fileUniqueId)

  Readable.from(req.file.buffer)
    .pipe(csv())
    .on("data", async (row) => {
      const key = `${fileName}:row:${
        row.storeName.split(" ")[1] || Date.now()
      }`;
      rowCount++;
      await client.hSet(key, row);
    })
    .on("end", () => {
      console.log(" CSV parsed completely.");
      console.log("Total Rows:", rowCount);

      res.status(201).json({
        message: "File uploaded Successfully",
        file: req.file,
        // filename: req.file.filename,
        path: req.file.path,
        rowCount: rowCount,
        fileUniqueId : fileUniqueId,
      });
    });


});

client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await client.connect();
})();

app.get("/", (req, res) => {
  res.send("ping pong");
});

app.listen(PORT, (req, res) => {
  console.log(`Server started on PORT: http://localhost:${PORT}`);
});
