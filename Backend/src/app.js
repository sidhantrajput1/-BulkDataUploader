import express from "express";
import cors from "cors";
import monitor from "express-status-monitor";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./utils/db.js";

const app = express();

connectDB();

app.use(monitor());
app.use(cors());
app.use(express.json());

app.use("/api/files", fileRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Ping Pong"));

export default app;
