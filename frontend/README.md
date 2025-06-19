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


