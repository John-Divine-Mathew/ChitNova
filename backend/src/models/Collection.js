import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
      required: [true, "Enrollment reference is required"],
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer reference is required"],
    },
    chitGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChitGroup",
      required: [true, "Chit Group reference is required"],
    },
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
    amountPaid: {
      type: Number,
      required: [true, "Amount paid is required"],
      min: [1, "Amount must be greater than 0"],
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Bank Transfer", "Cheque"],
      default: "Cash",
    },
    transactionId: {
      type: String,
      default: "",
    },
    collectionDate: {
      type: Date,
      default: Date.now,
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;