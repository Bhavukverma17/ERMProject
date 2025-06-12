# ERMProject - Engineering Resource Management System

A full-stack web application to manage engineering resources, track their project assignments, monitor capacity, and streamline team allocation.

---

## 📌 Overview

**ERMProject** is designed to help engineering managers:

- Assign engineers to projects based on availability and skills  
- Track who’s working on what and when they’ll be available  
- Analyze capacity utilization and optimize team planning  
- Manage engineer and project records efficiently

---

## 🚀 Features

- 👥 Engineer Management (CRUD)  
- 🧠 Project Management (CRUD)  
- 🔄 Assignment System with capacity tracking  
- 📊 Dashboards & Analytics for resource utilization  
- 🔐 Authentication with role-based access (Manager / Engineer)  
- 📂 Modal-based UI for better user interaction

---

## ⚙️ Tech Stack

| Layer         | Tech Used                     |
|---------------|-------------------------------|
| Frontend      | React + TypeScript            |
| Backend       | Node.js + Express.js          |
| Database      | MongoDB (Mongoose ODM)        |
| Auth          | MongoDB                       |
| UI Components | React Icons, Tailwind CSS     |
| Hosting       | Vercel (Frontend), Render (Backend) |

---

## 🛠️ Getting Started

### 🔧 Prerequisites

- Node.js & npm or yarn  
- MongoDB Atlas or local instance  
- Git

---

### 📥 Installation

#### 1. Clone the Repo

bash
git clone https://github.com/Bhavukverma17/ERMProject.git
cd ERMProject

#### 2. Backend Setup
cd server
npm install
node seed.js
node seedAssignments.js
node seedProjects.js
node seedEngineers.js
node seedEngineerUsers.js
node index.js

#### 3. Frontend Setup
cd frontend
npm install --legacy-peer-deps
npm start

📈 Dashboards
Total Engineers, Projects, and Assignments

Capacity Utilization Graphs

Assignment History View

🧑‍💻 Roles
Manager: Full access to manage engineers, projects, and assignments

Engineer: Limited view to check their own assignments and profile

📬 API Endpoints (Backend)
/api/auth - Login/Register

/api/engineers - Engineer CRUD

/api/projects - Project CRUD

/api/assignments - Assign/Unassign engineers
