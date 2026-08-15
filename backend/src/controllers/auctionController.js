import Auction from "../models/Auction.js";
import ChitGroup from "../models/ChitGroup.js";
import Enrollment from "../models/Enrollment.js";

// @desc    Get all completed auctions
// @route   GET /api/auctions
export const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find()
      .populate("chitGroup", "groupName groupCode totalValue maxMembers commissionPercentage")
      .populate("winningCustomer", "fullName customerCode phoneNumber")
      .populate("winningEnrollment", "ticketNumber")
      .sort({ auctionDate: -1 });

    res.status(200).json({
      success: true,
      count: auctions.length,
      data: auctions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch auctions",
      error: error.message,
    });
  }
};

// @desc    Conduct a new auction
// @route   POST /api/auctions
export const createAuction = async (req, res) => {
  try {
    const { chitGroupId, auctionNumber, winningEnrollmentId, bidDiscountAmount } = req.body;

    const group = await ChitGroup.findById(chitGroupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Chit Group not found" });
    }

    const winningEnrollment = await Enrollment.findById(winningEnrollmentId);
    if (!winningEnrollment) {
      return res.status(404).json({ success: false, message: "Enrollment record not found" });
    }

    if (winningEnrollment.hasWonAuction) {
      return res.status(400).json({
        success: false,
        message: "This member has already won a chit auction previously!",
      });
    }

    const discount = Number(bidDiscountAmount);
    const totalValue = group.totalValue;
    const maxMembers = group.maxMembers;
    const commissionPct = group.commissionPercentage || 5;

    // Financial calculations
    const companyCommission = (totalValue * commissionPct) / 100;
    const netDividendTotal = Math.max(0, discount - companyCommission);
    const dividendPerMember = netDividendTotal / maxMembers;
    const winningPayoutAmount = totalValue - discount;

    // Save Auction Record
    const auction = await Auction.create({
      chitGroup: chitGroupId,
      auctionNumber: Number(auctionNumber),
      winningEnrollment: winningEnrollment._id,
      winningCustomer: winningEnrollment.customer,
      bidDiscountAmount: discount,
      companyCommission,
      netDividendTotal,
      dividendPerMember,
      winningPayoutAmount,
    });

    // Mark member as auction winner
    winningEnrollment.hasWonAuction = true;
    await winningEnrollment.save();

    res.status(201).json({
      success: true,
      message: "Auction completed and payout calculated successfully",
      data: auction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to process auction",
      error: error.message,
    });
  }
};

// @desc    Update Payout Status
// @route   PUT /api/auctions/:id/status
export const updateAuctionStatus = async (req, res) => {
  try {
    const { payoutStatus } = req.body;
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ success: false, message: "Auction record not found" });
    }

    auction.payoutStatus = payoutStatus || auction.payoutStatus;
    await auction.save();

    res.status(200).json({
      success: true,
      message: "Payout status updated",
      data: auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update auction status",
      error: error.message,
    });
  }
};