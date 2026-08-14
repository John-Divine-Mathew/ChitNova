import express from "express";
import {
  getCollections,
  createCollection,
  deleteCollection,
} from "../controllers/collectionController.js";

const router = express.Router();

router.route("/")
  .get(getCollections)
  .post(createCollection);

router.route("/:id")
  .delete(deleteCollection);

export default router;