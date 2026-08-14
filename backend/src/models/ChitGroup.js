import mongoose from "mongoose";

const chitGroupSchema = new mongoose.Schema(
  {
    groupCode: {
      type: String,
      required: [true, "Group code is required"],
      unique: true,
      trim: true,
    },
    groupName: {
      type: String,
      required: [true, "Group name is required"],
      trim: true,
    },
    totalValue: {
      type: Number,
      required: [true, "Total chit value is required"],
    },
    durationMonths: {
      type: Number,
      required: [true, "Duration in months is required"],
    },
    monthlyInstallment: {
      type: Number,
      required: [true, "Monthly installment is required"],
    },
    maxMembers: {
      type: Number,
      required: [true, "Max members count is required"],
    },
    currentMembersCount: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    status: {
      type: String,
      enum: ["Upcoming", "Active", "Completed"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

const ChitGroup = mongoose.model("ChitGroup", chitGroupSchema);

export default ChitGroup;