import fileQueue from "../queues/fileQueue.js";
import fileProcessor from "../Jobs/fileProcessor.js";

export const setupSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log("Client connected");

    const stats = {
      active: await fileQueue.getActiveCount(),
      completed: await fileQueue.getCompletedCount(),
      failed: await fileQueue.getFailedCount(),
      queued: await fileQueue.getWaitingCount(),
    };
    io.emit("job-stats", stats);
  });

  fileQueue.process(async (job, done) => {
    await fileProcessor(job, done, io);
  });

  setInterval(async () => {
    const stats = {
      active: await fileQueue.getActiveCount(),
      completed: await fileQueue.getCompletedCount(),
      failed: await fileQueue.getFailedCount(),
      queued: await fileQueue.getWaitingCount(),
    };
    io.emit("job-stats", stats);
  }, 10000);
};
