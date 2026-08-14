import Customer from "../models/Customer.js";
import Agent from "../models/Agent.js";
import ChitGroup from "../models/ChitGroup.js";
import Auction from "../models/Auction.js";

// @desc    Get Admin Dashboard Quick Stats
// @route   GET /api/dashboard/stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const activeAgents = await Agent.countDocuments({ status: "Active" });
    const activeChits = await ChitGroup.countDocuments({ status: "Active" });
    const totalAuctions = await Auction.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        activeAgents,
        activeChits,
        totalAuctions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};