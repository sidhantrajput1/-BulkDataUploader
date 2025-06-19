import axios from "axios";
import { useState, useEffect } from "react";
import UploadDetails from "./UploadDetails";
import ProcessingOverview from "./ProcessingOverview";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResponses, setUploadResponses] = useState([]);
  const [progressMap, setProgressMap] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileId = res.data.fileUniqueId;

      // Set upload response and initialize progress
      setUploadResponses((prev) => [...prev, { ...res.data, progress: 0 }]);
      setProgressMap((prev) => ({ ...prev, [fileId]: 0 }));

      alert("Upload Success");
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  // Listen for socket updates
  useEffect(() => {
    socket.on("progress", ({ fileId, percent }) => {
      setProgressMap((prev) => ({
        ...prev,
        [fileId]: percent,
      }));
    });

    socket.on("complete", ({ fileId, successCount, failCount, duration }) => {
      setUploadResponses((prevResponses) =>
        prevResponses.map((upload) =>
          upload.fileUniqueId === fileId
            ? {
                ...upload,
                successCount,
                failedCount: failCount,
                duration: duration || "Done",
              }
            : upload
        )
      );

      alert(`File ${fileId} processing complete!`);
    });

    return () => {
      socket.off("progress");
      socket.off("complete");
    };
  }, []);

  return (
    <div className="m-auto max-w-7xl">
      <div className="pt-14 grid grid-cols-2 gap-4">
        {/* Heading */}
        <div className="py-4 col-span-2">
          <h1 className="font-bold text-3xl mb-3">Bulk Data Uploader</h1>
          <p className="text-gray-500">
            Upload CSV or Excel files for batch processing with real-time
            progress tracking
          </p>
        </div>

        {/* File Upload Section */}
        <div className="border p-4 border-gray-300 rounded-md shadow-sm">
          <h3 className="flex items-center gap-2 text-xl font-medium mb-1">
            <ion-icon name="cloud-upload-outline"></ion-icon>
            <span>File Upload</span>
          </h3>
          <p className="text-gray-500 mb-6 text-sm">
            Drag and drop your CSV or Excel file, or click to browse
          </p>

          <label
            htmlFor="fileInput"
            className="border-2 border-dashed border-gray-400 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition"
          >
            <ion-icon
              name="document-outline"
              className="text-4xl text-gray-500 mb-2"
            ></ion-icon>

            <h4 className="font-medium mb-1">Upload your data file</h4>
            <p className="text-gray-400 text-sm mb-4">
              Supports CSV and Excel files up to 50MB
            </p>

            <div className="py-2 px-4 bg-gray-800 text-white rounded-md">
              Choose File
            </div>

            <span className="mt-2 text-gray-700">
              {selectedFile?.name || "No file selected"}
            </span>

            <input
              type="file"
              id="fileInput"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            onClick={handleUpload}
            className="mt-4 w-full cursor-pointer py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Upload File
          </button>
        </div>

        {/* Processing Overview */}
        <div className="border p-4 border-gray-300 rounded-md shadow-sm">
          <ProcessingOverview />
        </div>

        {/* Processing Jobs */}
        <div className="border p-6 col-span-2 border-gray-200 rounded-xl shadow-lg bg-white">
          <h3 className="font-semibold text-2xl text-gray-800 mb-2">
            Processing Jobs
          </h3>
          <p className="text-gray-500 text-sm mb-5">
            Track the progress of your uploaded files
          </p>

          <div className="flex flex-col gap-y-6">
            {uploadResponses.map((response, index) => (
              <UploadDetails
                key={index}
                uploadResponse={response}
                progress={progressMap[response.fileUniqueId] || 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
