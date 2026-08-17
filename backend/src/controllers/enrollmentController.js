import Enrollment from "../models/Enrollment.js";
import ChitGroup from "../models/ChitGroup.js";

// @desc    Get all enrollments
// @route   GET /api/enrollments
export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("customer", "fullName customerCode phoneNumber email")
      .populate("chitGroup", "groupCode groupName totalValue monthlyInstallment maxMembers currentMembersCount status")
      .populate("assignedAgent", "fullName agentCode assignedArea")
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

    // 1. Verify group exists
    const group = await ChitGroup.findById(chitGroupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Chit Group not found" });
    }

    // 2. Check capacity
    if (group.currentMembersCount >= group.maxMembers) {
      return res.status(400).json({
        success: false,
        message: "This Chit Group has already reached its maximum capacity!",
      });
    }

    // 3. Auto-calculate ticket number if not provided
    const nextTicketNumber = ticketNumber ? Number(ticketNumber) : (group.currentMembersCount + 1);

    // 4. Create record
    const enrollment = await Enrollment.create({
      customer: customerId,
      chitGroup: chitGroupId,
      assignedAgent: assignedAgentId || null,
      ticketNumber: nextTicketNumber,
    });

    // 5. Update chit group counts
    group.currentMembersCount += 1;
    if (group.currentMembersCount === group.maxMembers) {
      group.status = "Active"; 
    }
    await group.save();

    // 6. Fetch fully populated document to send back to React UI
    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate("customer", "fullName customerCode phoneNumber email")
      .populate("chitGroup", "groupCode groupName totalValue monthlyInstallment maxMembers currentMembersCount status")
      .populate("assignedAgent", "fullName agentCode assignedArea");

    res.status(201).json({
      success: true,
      message: "Customer successfully enrolled in group",
      data: populatedEnrollment,
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