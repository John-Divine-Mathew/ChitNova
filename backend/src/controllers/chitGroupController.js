import ChitGroup from "../models/ChitGroup.js";

// @desc    Get all chit groups
// @route   GET /api/chit-groups
export const getChitGroups = async (req, res) => {
  try {
    const groups = await ChitGroup.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch chit groups",
      error: error.message,
    });
  }
};

// @desc    Get single chit group
// @route   GET /api/chit-groups/:id
export const getChitGroupById = async (req, res) => {
  try {
    const group = await ChitGroup.findById(req.params.id);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Chit Group not found",
      });
    }
    res.status(200).json({
      success: true,
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch chit group details",
      error: error.message,
    });
  }
};

// @desc    Create new chit group
// @route   POST /api/chit-groups
export const createChitGroup = async (req, res) => {
  try {
    const {
      groupCode,
      groupName,
      totalValue,
      durationMonths,
      monthlyInstallment,
      maxMembers,
      startDate,
      status,
    } = req.body;

    const existingGroup = await ChitGroup.findOne({ groupCode });
    if (existingGroup) {
      return res.status(400).json({
        success: false,
        message: "Group code already exists",
      });
    }

    const group = await ChitGroup.create({
      groupCode,
      groupName,
      totalValue,
      durationMonths,
      monthlyInstallment,
      maxMembers,
      startDate,
      status: status || "Upcoming",
    });

    res.status(201).json({
      success: true,
      message: "Chit Group created successfully",
      data: group,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create chit group",
      error: error.message,
    });
  }
};

// @desc    Update chit group
// @route   PUT /api/chit-groups/:id
export const updateChitGroup = async (req, res) => {
  try {
    const group = await ChitGroup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Chit Group not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chit Group updated successfully",
      data: group,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update chit group",
      error: error.message,
    });
  }
};

// @desc    Delete chit group
// @route   DELETE /api/chit-groups/:id
export const deleteChitGroup = async (req, res) => {
  try {
    const group = await ChitGroup.findByIdAndDelete(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Chit Group not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chit Group deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete chit group",
      error: error.message,
    });
  }
};