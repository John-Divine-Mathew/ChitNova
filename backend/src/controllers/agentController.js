import Agent from "../models/Agent.js";

// @desc    Get all agents
// @route   GET /api/agents
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: agents.length,
      data: agents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch agents",
      error: error.message,
    });
  }
};

// @desc    Get single agent by ID
// @route   GET /api/agents/:id
export const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }
    res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch agent details",
      error: error.message,
    });
  }
};

// @desc    Create new agent
// @route   POST /api/agents
export const createAgent = async (req, res) => {
  try {
    const { agentCode, fullName, phoneNumber, email, assignedArea, commissionRate, status } = req.body;

    const existingAgent = await Agent.findOne({ agentCode });
    if (existingAgent) {
      return res.status(400).json({
        success: false,
        message: "Agent code already exists",
      });
    }

    const agent = await Agent.create({
      agentCode,
      fullName,
      phoneNumber,
      email,
      assignedArea,
      commissionRate: commissionRate || 2.5,
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Agent registered successfully",
      data: agent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create agent",
      error: error.message,
    });
  }
};

// @desc    Update agent
// @route   PUT /api/agents/:id
export const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Agent updated successfully",
      data: agent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update agent",
      error: error.message,
    });
  }
};

// @desc    Delete agent
// @route   DELETE /api/agents/:id
export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Agent deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete agent",
      error: error.message,
    });
  }
};