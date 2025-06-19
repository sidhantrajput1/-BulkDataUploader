import mongoose from "mongoose";

const UploadRecordSchema = new mongoose.Schema({
  fileId: String,
  fileName: String,
  data: Object,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("UploadRecord", UploadRecordSchema);