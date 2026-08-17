import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

import customerRoutes from "./routes/customerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import chitGroupRoutes from "./routes/chitGroupRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDatabase();

// 1. CORS Configuration (Keep single declaration before express body parsers)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// 2. Express Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. API Routes
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);

// Support both /api/groups AND /api/chit-groups so React frontend calls never fail
app.use("/api/groups", chitGroupRoutes);
app.use("/api/chit-groups", chitGroupRoutes);

app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check endpoint for testing mobile reachability
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is reachable" });
});

const PORT = process.env.PORT || 5000;

// Binding to '0.0.0.0' enables access from Wi-Fi / Local IP (e.g. 192.168.x.x)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});