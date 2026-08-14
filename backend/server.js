import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./config/database.js";

dotenv.config();

const app = express();

// Enable CORS for all incoming connections (Laptop + Mobile)
app.use(cors());

app.use(express.json());

connectDatabase();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to ChitNova API",
    status: "Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

// Host on "0.0.0.0" so devices on your Wi-Fi (like your phone) can connect
app.listen(PORT, "0.0.0.0", () => {
  console.log("-----------------------------------");
  console.log(`ChitNova API running on port ${PORT}`);
  console.log(`Local:   http://localhost:${PORT}`);
  console.log(`Network: http://192.168.29.101:${PORT}`);
  console.log("-----------------------------------");
});