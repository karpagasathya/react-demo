# User Management Fullstack App

This project is a fullstack user management application built with React (frontend), Node.js/Express (backend), and MongoDB Atlas (cloud database). It allows users to add, edit, and delete user records, with all data stored in a remote MongoDB collection.

## Features
- Add, edit, and delete users (User Identifier, User Name, Email Address)
- All user data is stored in MongoDB Atlas
- Modern UI built with Material-UI (MUI)
- Real-time updates between frontend and backend
- RESTful API endpoints for all CRUD operations
- Deployed frontend (Vercel) and backend (Render)

## Tech Stack
- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (frontend), Render (backend)

## API Endpoints
- `GET /api/users` — Get all users
- `POST /api/users` — Add a new user
- `PUT /api/users/:id` — Update a user
- `DELETE /api/users/:id` — Delete a user

## How It Works
- The React frontend fetches and displays all users from the backend.
- Adding or editing a user updates the database and UI in real time.
- Each user row has a Delete button to remove the user from the database.
- The backend root URL (`/`) returns a simple status message.

## Deployment URLs
- **Frontend (Vercel):** https://react-demo-ochre-seven.vercel.app/
- **API Endpoint:** https://react-demo-77dq.onrender.com/api/users

## Getting Started (Local Development)

1. Clone the repository:
   ```sh
   git clone <repo-url>
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   cd react_demo
   npm install
   cd backend
   npm install
   ```
3. Set up your MongoDB Atlas connection string as an environment variable (`MONGODB_URI`) in the backend.
4. Start the backend:
   ```sh
   node server.js
   ```
5. Start the frontend:
   ```sh
   cd ..
   npm start
   ```

## License
MIT
