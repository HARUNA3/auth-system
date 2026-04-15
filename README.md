# 🔐 Full Stack Authentication App (Node.js + React)

A simple but production-style authentication system built with **Node.js, Express, JWT, bcrypt, and React (Vite)**.  
This project demonstrates secure login/registration flow, protected routes, and token-based authentication.

---

## 🚀 Live Demo
*(Add your deployed link here if available)*  
Example: https://your-app-name.vercel.app

---

## 📌 Features

- User registration with hashed passwords (bcrypt)
- Secure login with JWT authentication
- Protected API routes using middleware
- Frontend authentication flow with React
- Token-based session handling
- Simple JSON file database (no setup required)
- Easily upgradeable to MongoDB / PostgreSQL

---

## screen shot
<img width="330" height="302" alt="image" src="https://github.com/user-attachments/assets/2b9723d0-55d7-4e91-ac0e-4e2ec7d3f181" />

<img width="466" height="169" alt="image" src="https://github.com/user-attachments/assets/0cb511f0-ce71-435c-ad97-345ce68a1452" />

- JWT (jsonwebtoken)
- bcryptjs
- fs (file-based storage)

### Frontend
- React (Vite)
- React Router DOM

### Database
- JSON file storage (users.json)

---

## 📁 Project Structure
backend/
├── middleware/
│ └── verifyToken.js
├── routes/
│ └── auth.js
├── users.json
├── server.js

frontend/
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ └── pages/


---

## 🔑 Authentication Flow

1. User registers → password is hashed using `bcrypt`
2. User logs in → server verifies credentials
3. Server generates a JWT token
4. Token is stored on client side
5. Protected routes use middleware to verify token

---

## 🔒 Example Protected Middleware

```js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

### What I Learned
How JWT authentication works in real-world apps
Password hashing and security best practices
Building protected routes in Express
Connecting React frontend with backend APIs
Structuring a full-stack project

### 📈 Future Improvements
Replace JSON file with MongoDB / PostgreSQL
Add refresh tokens
Add user roles (admin / user)
Improve UI with authentication state management (Redux / Context API)
Deploy backend + frontend properly
