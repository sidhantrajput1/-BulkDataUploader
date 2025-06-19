#  Bulk Data Uploader Backend

This is a high-performance backend system for real-time bulk CSV file uploads using:

-  Node.js + Express
-  Multer (for in-memory file uploads)
-  Bull Queue (for job processing)
-  Redis (for fast key-value storage)
-  Socket.IO (for real-time progress updates)
-  Express Monitor (for server monitoring)
-  CSV Parser (for streaming large CSVs)
-  MongoDB (for user management, optional)
-  Bull Board (for queue dashboard UI)

---

## 📁 Folder Structure

src/
├── server.js # Main server with Express, Bull, Redis, Socket.io
├── utils/
│ └── db.js # MongoDB connection
├── models/ # 
│ └── UploadRecord.jsx
└── .env





---

##  Features

- Upload CSV files directly from frontend (memory upload via `multer`)
- Streams & parses CSV rows without memory overflow
- Sends real-time job status to frontend using `socket.io`
- Uses Redis + Bull Queue for background processing
- Built-in dashboard monitoring via Bull Board and `express-status-monitor`

---

##  Technologies Used

| Tech            | Description                         |
|-----------------|-------------------------------------|
| Node.js         | JavaScript runtime                  |
| Express.js      | Web framework                       |
| Multer          | File upload middleware              |
| Redis           | In-memory data store                |
| Bull            | Queue system (Redis-based)          |
| Socket.IO       | Real-time client-server communication |
| dotenv          | For loading environment variables   |
| uuid            | To uniquely identify file uploads   |
| csv-parser      | Streaming CSV data                  |

---

##  Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/sidhantrajput1/-BulkDataUploader.git
cd -BulkDataUploader/backend


* Install Dependencies
-  npm install

* .env
PORT=3000
MONGO_URI=mongodb+srv://<your_mongo_uri>

* Run Redis (via Docker)
- docker run -d -p 6379:6379 redis/redis-stack

*****Start Server*****
- npm start



---------------------------------------------------------------------------------


# 📤 Bulk Data Uploader – Frontend

This is a modern frontend built using **React.js** and **Tailwind CSS** that allows users to upload CSV/Excel files, track upload progress in real-time, and visualize job statuses using **Socket.IO**.

> Paired with the backend powered by Express, Redis, Bull, and MongoDB.

---

## 🚀 Features

- 📁 Drag and drop or browse file upload UI
- 📊 Real-time progress tracking via **WebSocket**
- 📈 Processing job stats and summaries
- 🔐 Signup and login screens (ready for integration)
- ⚡ Fast and responsive Tailwind CSS layout

---

## 🛠️ Built With

| Tech              | Purpose                            |
|-------------------|------------------------------------|
| React.js          | Frontend library                   |
| React Router DOM  | Client-side routing                |
| Axios             | API requests                       |
| Socket.IO Client  | Real-time updates from backend     |
| Tailwind CSS      | Styling framework                  |
| Vite              | Lightning-fast dev server          |

---

## 📂 Folder Structure

src/
├── App.jsx # Main router setup
├── FileUploader.jsx # Main upload and tracking page
├── components/
│ ├── NavBar.jsx # Navigation bar
│ ├── Signup.jsx # Sign up form
│ ├── Login.jsx # Login form
│ ├── UploadDetails.jsx # Per-file progress UI
│ └── ProcessingOverview.jsx # Realtime queue stats


---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sidhantrajput1/-BulkDataUploader.git
cd -BulkDataUploader/frontend


---------------------------------------
2. Install Dependencies
- npm install


3. Start Development Server
- npm run dev

Frontend will be available at:
- http://localhost:5173



