# 🗓️ Task Scheduler Dashboard

VERCEL APP URL : https://task-scheduler-dashboard-xi.vercel.app/

A full-stack Task Management Dashboard built with **React (Vite)**, **Node.js (Express)**, and **MongoDB**. Users can create, view, and manage their tasks visually using a calendar interface, list view, hourly blocks, and task filters. Fully responsive and supports **dark/light theme toggling**.

---

## 🚀 Features

- 🔐 JWT-based authentication (Login, token-protected routes)
- 📅 Sliding calendar with date selection
- 🌗 Light/Dark theme toggle
- ➕ Create task with title, description, time
- 🕒 Hourly task blocks for visual planning
- 📋 List view with overdue task filter
- ✅ Filter by: My Tasks, Delegated Tasks, and Meetings
- 📌 Mark tasks as: No Action / In Progress / Done
- 📦 View All overdue tasks from backend
- 📁 Clean UI with TailwindCSS

---

## 🧰 Tech Stack

| Frontend  | Backend   | Database      |
|-----------|-----------|---------------|
| React (Vite) | Node.js (Express) | MongoDB Atlas |
| TailwindCSS | JWT Auth | Mongoose ORM |
| Axios      | CORS      | Render Deployment |

---

## 🔗 Live URLs

- 🌐 Frontend: [task-frontend.netlify.app](https://task-frontend.netlify.app) *(replace with your link)*
- 🔧 Backend: [task-backend.onrender.com](https://task-backend.onrender.com) *(replace with your link)*

---

## 📂 Folder Structure (Simplified)

📁 client/ → React frontend (Vite)
└── components/ → Calendar, Header, Task Filters, etc.
└── pages/ → Dashboard, Login, Account
└── App.jsx
📁 server/ → Node.js backend
└── models/ → User, Task schemas
└── routes/ → /api/tasks, /api/auth
└── middleware/ → auth.js (JWT protect)
.env → JWT_SECRET, MONGO_URI

🙌 Credits
Built with ❤️ by Surya Mazumder
If you liked this project, give it a ⭐ on GitHub!
