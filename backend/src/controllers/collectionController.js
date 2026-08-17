import Collection from "../models/Collection.js";
import Enrollment from "../models/Enrollment.js";

// @desc    Get all payment collections
// @route   GET /api/collections
export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find()
      .populate("customer", "fullName customerCode phoneNumber")
      .populate("chitGroup", "groupName groupCode monthlyInstallment")
      .populate("collectedBy", "fullName agentCode")
      .populate("enrollment", "ticketNumber")
      .sort({ collectionDate: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: collections.length,
      data: collections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch collections",
      error: error.message,
    });
  }
};

// @desc    Record a new daily payment collection
// @route   POST /api/collections
export const createCollection = async (req, res) => {
  try {
    const { enrollmentId, amountPaid, paymentMode, transactionId, collectedById, remarks } = req.body;

    const enrollment = await Enrollment.findById(enrollmentId)
      .populate("customer")
      .populate("chitGroup");

    if (!enrollment) {
      return res.status(404).json({ 
        success: false, 
        message: "Enrollment record not found" 
      });
    }

    if (!enrollment.customer || !enrollment.chitGroup) {
      return res.status(400).json({
        success: false,
        message: "The selected enrollment is missing customer or group reference data.",
      });
    }

    // Auto-generate unique receipt number (e.g., REC-104928)
    const receiptNumber = `REC-${Math.floor(100000 + Math.random() * 900000)}`;

    const newCollection = await Collection.create({
      receiptNumber,
      enrollment: enrollment._id,
      customer: enrollment.customer._id,
      chitGroup: enrollment.chitGroup._id,
      collectedBy: collectedById || enrollment.assignedAgent || null,
      amountPaid: Number(amountPaid),
      paymentMode: paymentMode || "Cash",
      transactionId: transactionId || "",
      remarks: remarks || "",
    });

    // Populate the newly created document before returning to React
    const populatedCollection = await Collection.findById(newCollection._id)
      .populate("customer", "fullName customerCode phoneNumber")
      .populate("chitGroup", "groupName groupCode monthlyInstallment")
      .populate("collectedBy", "fullName agentCode")
      .populate("enrollment", "ticketNumber");

    res.status(201).json({
      success: true,
      message: "Payment collection recorded successfully",
      data: populatedCollection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to record payment collection",
      error: error.message,
    });
  }
};

// @desc    Delete/Cancel a collection record
// @route   DELETE /api/collections/:id
export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ 
        success: false, 
        message: "Collection record not found" 
      });
    }

    await collection.deleteOne();

    res.status(200).json({
      success: true,
      message: "Collection record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete collection record",
      error: error.message,
    });
  }
};