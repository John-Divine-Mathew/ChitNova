import mongoose from "mongoose";

const companySettingSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: "ChitNova Financial Services" },
    registrationNumber: { type: String, default: "CHIT-REG-2026-001" },
    emailAddress: { type: String, default: "admin@chitnova.com" },
    phoneNumber: { type: String, default: "+91 98765 43210" },
    companyAddress: { type: String, default: "Trichy Main Branch, Tamil Nadu, India" },
    twoFactorAuth: { type: Boolean, default: true },
    loginNotifications: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CompanySetting = mongoose.model("CompanySetting", companySettingSchema);

export default CompanySetting;