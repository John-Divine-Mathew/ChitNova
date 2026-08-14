import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer is required"],
    },
    chitGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChitGroup",
      required: [true, "Chit Group is required"],
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
    ticketNumber: {
      type: Number,
      required: [true, "Ticket number is required"],
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    hasWonAuction: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Defaulted"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a customer gets unique ticket numbers within the same chit group
enrollmentSchema.index({ chitGroup: 1, ticketNumber: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;