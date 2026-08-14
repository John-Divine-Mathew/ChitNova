import express from "express";
import {
  getEnrollments,
  createEnrollment,
  deleteEnrollment,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.route("/")
  .get(getEnrollments)
  .post(createEnrollment);

router.route("/:id")
  .delete(deleteEnrollment);

export default router;