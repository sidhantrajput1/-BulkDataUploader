import Queue from "bull";
const fileQueue = new Queue("fileQueue", {
  redis: { host: "127.0.0.1", port: 6379 },
});
export default fileQueue;
