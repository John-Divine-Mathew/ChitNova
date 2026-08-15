import express from "express";
import {
  getAuctions,
  createAuction,
  updateAuctionStatus,
} from "../controllers/auctionController.js";

const router = express.Router();

router.route("/")
  .get(getAuctions)
  .post(createAuction);

router.route("/:id/status")
  .put(updateAuctionStatus);

export default router;