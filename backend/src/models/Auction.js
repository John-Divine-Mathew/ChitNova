import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    chitGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChitGroup",
      required: [true, "Chit Group is required"],
    },
    auctionNumber: {
      type: Number, // e.g., Month 1, Month 2
      required: [true, "Auction number/round is required"],
    },
    winningEnrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
      required: [true, "Winning enrollment is required"],
    },
    winningCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Winning customer is required"],
    },
    bidDiscountAmount: {
      type: Number,
      required: [true, "Bid discount amount is required"],
      min: [0, "Discount cannot be negative"],
    },
    companyCommission: {
      type: Number,
      default: 0,
    },
    netDividendTotal: {
      type: Number,
      default: 0,
    },
    dividendPerMember: {
      type: Number,
      default: 0,
    },
    winningPayoutAmount: {
      type: Number,
      required: true, // Total Chit Value minus Bid Discount
    },
    auctionDate: {
      type: Date,
      default: Date.now,
    },
    payoutStatus: {
      type: String,
      enum: ["Pending Guarantee", "Approved", "Paid"],
      default: "Pending Guarantee",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent hosting duplicate auction rounds for the same group
auctionSchema.index({ chitGroup: 1, auctionNumber: 1 }, { unique: true });

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;