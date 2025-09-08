# 🦈 MyShark – CRUD + Auth Full-Stack Project

A full-stack CRUD application with authentication built as a school project.  
- **Backend**: Node.js, Express, MySQL2, JWT, Bcrypt  
- **Frontend**: React, React Router, React Query, Axios  

---

## 📂 Project Structure
CF7-final-project/
├── backend/ # Express + MySQL2 REST API
└── frontend/ # React SPA (login + sharks CRUD)

---

## 🚀 Getting Started

1. Clone the repo

git clone https://github.com/MikeVasileiou/CF7-final-project.git
cd CF7-final-project

2. Backend setup

cd backend
npm install

Create a .env file in backend/:

PORT=3333
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=sharkdb
JWT_SECRET=your_secret_key

Set up the database using src/db/create-database-tables.sql.
Then start the backend:

npm run dev   # starts with nodemon

Backend runs at: http://localhost:3333

3. Frontend setup

cd ../frontend
npm install


Create a .env file in frontend/:

REACT_APP_API_URL=http://localhost:3333/api


Start the React app:

npm start


Frontend runs at: http://localhost:3000

🔑 Authentication

Register at /register

Login at /login

A JWT token is stored in cookies

Protected routes require Authorization: Bearer <token>

⚙️ Available Scripts

Backend
cd backend
npm run dev   # run with nodemon (watch mode)
npm start     # run normally

Frontend
cd frontend
npm start     # start dev server
npm run build # create production build

📱 PWA Support

The frontend includes a manifest.json and icons, so the app can be installed on desktop or mobile as a Progressive Web App (PWA).
Check installability via Chrome DevTools → Application → Manifest.

🛠️ Tech Stack

Backend

Express
MySQL2
JWT
Bcrypt
Joi
Cors
Helmet
Morgan

Frontend

React 18
React Router 6
React Query
Axios
Universal Cookie

⚠️ Notes

node_modules/ are not committed — run npm install in both backend & frontend before starting.
.env files are ignored — create your own with the values above.

📜 License

This project was built as part of a CF7 assignment.
Feel free to use it as a learning reference.