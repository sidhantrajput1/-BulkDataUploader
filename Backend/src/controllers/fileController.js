import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import csv from "csv-parser";
import fileQueue from "../queues/fileQueue.js";

export const uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json("No file uploaded");

  const fileUniqueId = uuidv4();
  const fileName = req.file.originalname.split(".")[0];
  const rows = [];

  Readable.from(req.file.buffer)
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      await fileQueue.add({ rows, fileId: fileUniqueId, fileName });

      res.status(201).json({
        message: "File uploaded & queued",
        fileUniqueId,
        rowCount: rows.length,
        file: {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
        },
      });
    });
};
