import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Helper function to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new Admin (Initial Setup / SuperAdmin action)
// @route   POST /api/auth/register
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password,
      role: role || "SuperAdmin",
    });

    if (admin) {
      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          token: generateToken(admin._id),
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid admin data",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error during admin registration",
      error: error.message,
    });
  }
};

// @desc    Authenticate Admin & Get Token (Login)
// @route   POST /api/auth/login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for admin email
    const admin = await Admin.findOne({ email });

    // Validate password match
    if (admin && (await admin.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          token: generateToken(admin._id),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error during admin login",
      error: error.message,
    });
  }
};

// @desc    Get Current Logged-in Admin Profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching profile",
      error: error.message,
    });
  }
};