import redisClient from "../utils/redisClient.js";

const fileProcessor = async (job, done, io) => {
  const { rows, fileId, fileName } = job.data;
  let successCount = 0;
  let failCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < rows.length; i++) {
    try {
      const row = rows[i];
      if (!row.storeName) throw new Error("Missing storeName");
      const key = `${fileName}:row:${row.storeName.split(" ")[1] || Date.now()}`;
      await redisClient.hSet(key, row);
      successCount++;
    } catch (e) {
      failCount++;
    }

    const percent = Math.round(((i + 1) / rows.length) * 100);
    if (percent % 10 === 0 || percent === 100) {
      io.emit("progress", { fileId, percent });
    }
  }

  io.emit("complete", {
    fileId,
    message: "Processing complete",
    total: rows.length,
    successCount,
    failCount,
    duration: `${((Date.now() - startTime) / 1000).toFixed(2)}s`,
  });

  done();
};

export default fileProcessor;
