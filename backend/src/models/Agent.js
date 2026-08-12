import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    agentCode: {
      type: String,
      required: [true, "Agent code is required"],
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    assignedArea: {
      type: String,
      required: [true, "Assigned area/route is required"],
      trim: true,
    },
    commissionRate: {
      type: Number,
      required: [true, "Commission rate (%) is required"],
      default: 2.5,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;