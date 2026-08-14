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
import reportRoutes from "./routes/reportRoutes.js"; // <-- Import
import settingRoutes from "./routes/settingRoutes.js"; // <-- Import
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
connectDatabase();

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/chit-groups", chitGroupRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/reports", reportRoutes); // <-- Mount
app.use("/api/settings", settingRoutes); // <-- Mount
app.use("/api/dashboard", dashboardRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`ChitNova API running on port ${PORT}`);
});