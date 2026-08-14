import express from "express";
import { getReportAnalytics, exportReportData } from "../controllers/reportController.js";

const router = express.Router();

router.get("/analytics", getReportAnalytics);
router.get("/export/:type", exportReportData);

export default router;