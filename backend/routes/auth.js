const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
const DB = path.join(__dirname, "../users.json");

const getUsers = () => JSON.parse(fs.readFileSync(DB, "utf-8"));
const saveUsers = (users) => fs.writeFileSync(DB, JSON.stringify(users, null, 2));

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  if (users.find((u) => u.username === username))
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), username, password: hashed });
  saveUsers(users);

  res.status(201).json({ message: "Registered successfully!" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();
  const user = users.find((u) => u.username === username);

  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token, username });
});

// PROTECTED ROUTE
router.get("/me", verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}!`, user: req.user });
});

module.exports = router;