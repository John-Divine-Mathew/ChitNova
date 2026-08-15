import express from "express";
import {
  getChitGroups,
  getChitGroupById,
  createChitGroup,
  updateChitGroup,
  deleteChitGroup,
} from "../controllers/chitGroupController.js";

const router = express.Router();

router.route("/")
  .get(getChitGroups)
  .post(createChitGroup);

router.route("/:id")
  .get(getChitGroupById)
  .put(updateChitGroup)
  .delete(deleteChitGroup);

export default router;