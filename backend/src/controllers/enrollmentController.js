import Enrollment from "../models/Enrollment.js";
import ChitGroup from "../models/ChitGroup.js";

// @desc    Get all enrollments
// @route   GET /api/enrollments
export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("customer", "fullName customerCode phoneNumber email")
      .populate("chitGroup", "groupCode groupName totalValue monthlyInstallment maxMembers currentMembersCount")
      .populate("assignedAgent", "fullName agentCode")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch enrollments",
      error: error.message,
    });
  }
};

// @desc    Enroll a customer into a Chit Group
// @route   POST /api/enrollments
export const createEnrollment = async (req, res) => {
  try {
    const { customerId, chitGroupId, assignedAgentId, ticketNumber } = req.body;

    const group = await ChitGroup.findById(chitGroupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Chit Group not found" });
    }

    if (group.currentMembersCount >= group.maxMembers) {
      return res.status(400).json({
        success: false,
        message: "This Chit Group has already reached its maximum capacity!",
      });
    }

    // Auto-calculate ticket number if not manually provided
    const nextTicketNumber = ticketNumber || (group.currentMembersCount + 1);

    const enrollment = await Enrollment.create({
      customer: customerId,
      chitGroup: chitGroupId,
      assignedAgent: assignedAgentId || null,
      ticketNumber: nextTicketNumber,
    });

    // Increment enrolled count on the group automatically
    group.currentMembersCount += 1;
    if (group.currentMembersCount === group.maxMembers) {
      group.status = "Active"; // Auto activate when full
    }
    await group.save();

    res.status(201).json({
      success: true,
      message: "Customer successfully enrolled in group",
      data: enrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to enroll customer",
      error: error.message,
    });
  }
};

// @desc    Delete/Cancel enrollment
// @route   DELETE /api/enrollments/:id
export const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment record not found" });
    }

    // Decrement group member count
    const group = await ChitGroup.findById(enrollment.chitGroup);
    if (group && group.currentMembersCount > 0) {
      group.currentMembersCount -= 1;
      await group.save();
    }

    await enrollment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Enrollment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete enrollment",
      error: error.message,
    });
  }
};