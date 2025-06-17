const FileUploader = () => {
  return (
    <div className="m-auto max-w-7xl">
      <div className="pt-14 grid grid-cols-2 gap-4">
        <div className=" p-4 col-span-2">
          <h1 className="font-bold text-3xl mb-3">Bulk Data Uploader</h1>
          <p className="text-gray-500">
            Upload CSV or Excel files for batch processing with real-time
            progress tracking
          </p>
        </div>

        <div className="border p-4 border-gray-300 rounded-md shadow-sm">
          <h3 className="flex items-center gap-2 text-xl font-medium mb-1">
            <ion-icon name="cloud-upload-outline"></ion-icon>{" "}
            <span className=" ">File Upload</span>
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
              class="text-4xl text-gray-500 mb-2"
            ></ion-icon>

            <h4 className="font-medium mb-1">Upload your data file</h4>

            <p className="text-gray-400 text-sm mb-4">
              Supports CSV and Excel files up to 50MB
            </p>

            <div className="py-2 px-4 bg-gray-800 text-white rounded-md">
              Choose File
            </div>

            <input
              type="file"
              id="fileInput"
              accept=".csv,.xlsx,.xls"
              className="hidden"
            />
          </label>
        </div>

        <div className="border p-4  border-gray-300 rounded-md shadow-sm">
          <h3 className="font-medium text-xl mb-1">Processing Overview</h3>
          <p className="text-gray-400 text-sm mb-6">
            Current processing statistics
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 shadow-sm rounded-md flex flex-col justify-center items-center">
              <span className="font-bold text-blue-600 text-md mb-1">0</span>{" "}
              <p className="text-gray-500 ">Active Job</p>
            </div>
            <div className="bg-gray-100 p-4 shadow-sm rounded-md flex flex-col justify-center items-center">
              <span className="font-bold text-green-600 text-md mb-1">0</span>{" "}
              <p className="text-gray-500 ">Completed</p>
            </div>
            <div className="bg-gray-100 p-4 shadow-sm rounded-md flex flex-col justify-center items-center">
              <span className="font-bold text-orange-600 text-md mb-1">0</span>{" "}
              <p className="text-gray-500 ">Queued</p>
            </div>
            <div className="bg-gray-100 p-4 shadow-sm rounded-md flex flex-col justify-center items-center">
              <span className="font-bold text-red-600 text-md mb-1">0</span>{" "}
              <p className="text-gray-500 ">Failed</p>
            </div>
          </div>
        </div>
        <div className="border p-4 col-span-2 border-gray-300 rounded-md shadow-sm">
          <h3 className="font-medium text-xl mb-1">Processing Jobs</h3>
          <p className="text-gray-400 text-sm mb-6">
            Track the progress of your uploaded files
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
