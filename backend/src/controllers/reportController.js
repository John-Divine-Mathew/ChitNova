import Collection from "../models/Collection.js";
import Customer from "../models/Customer.js";
import ChitGroup from "../models/ChitGroup.js";
import Auction from "../models/Auction.js";
import Agent from "../models/Agent.js";

// @desc    Get dynamic aggregate metrics for report dashboard
// @route   GET /api/reports/analytics
export const getReportAnalytics = async (req, res) => {
  try {
    const totalCollectionsAgg = await Collection.aggregate([
      { $group: { _id: null, total: { $sum: "$amountPaid" } } }
    ]);
    const totalCollection = totalCollectionsAgg[0]?.total || 0;

    const totalCustomers = await Customer.countDocuments();
    const activeChits = await ChitGroup.countDocuments({ status: "Active" });
    const totalAuctions = await Auction.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalCollection,
        totalCustomers,
        activeChits,
        totalAuctions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate data export by module type
// @route   GET /api/reports/export/:type
export const exportReportData = async (req, res) => {
  try {
    const { type } = req.params;
    let data = [];

    switch (type) {
      case "collections":
        data = await Collection.find()
          .populate("customer", "fullName customerCode")
          .populate("chitGroup", "groupName")
          .lean();
        break;
      case "customers":
        data = await Customer.find().lean();
        break;
      case "agents":
        data = await Agent.find().lean();
        break;
      case "chit-groups":
        data = await ChitGroup.find().lean();
        break;
      case "auctions":
        data = await Auction.find()
          .populate("chitGroup", "groupName")
          .populate("winningCustomer", "fullName")
          .lean();
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid report type requested" });
    }

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};