const UploadDetails = ({ uploadResponse, progress }) => {
  const {
    file,
    fileUniqueId,
    rowCount = 0,
    successCount = 0,
    failedCount = 0,
    duration = "Running",
  } = uploadResponse;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col gap-y-4">
      <div className="flex items-start gap-4">
        <div className="text-4xl text-indigo-600">
          <ion-icon name="document-text-outline"></ion-icon>
        </div>

        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-gray-500 font-medium">File Name:</span>{" "}
            {file?.originalname || "N/A"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <span className="text-gray-400">File ID:</span>{" "}
            {fileUniqueId || "Pending"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-4 text-center">
        <div className="bg-blue-50 rounded-md py-3 shadow-sm">
          <p className="text-sm text-gray-500">Total Rows</p>
          <p className="text-lg font-bold text-blue-600">{rowCount}</p>
        </div>

        <div className="bg-green-50 rounded-md py-3 shadow-sm">
          <p className="text-sm text-gray-500">Success</p>
          <p className="text-lg font-bold text-green-600">{successCount}</p>
        </div>

        <div className="bg-red-50 rounded-md py-3 shadow-sm">
          <p className="text-sm text-gray-500">Failed</p>
          <p className="text-lg font-bold text-red-600">{failedCount}</p>
        </div>

        <div className="bg-yellow-50 rounded-md py-3 shadow-sm">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="text-lg font-bold text-yellow-600">{duration}</p>
        </div>

        <div className="bg-indigo-50 rounded-md py-3 shadow-sm">
          <p className="text-sm text-gray-500">Progress</p>
          <p className="text-lg font-bold text-indigo-600">{progress ?? 0}%</p>
        </div>
      </div>
    </div>
  );
};

export default UploadDetails;