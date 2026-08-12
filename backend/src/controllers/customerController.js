import Customer from "../models/Customer.js";

// @desc    Get all customers
// @route   GET /api/customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch customers",
      error: error.message,
    });
  }
};

// @desc    Get single customer by ID
// @route   GET /api/customers/:id
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch customer details",
      error: error.message,
    });
  }
};

// @desc    Create a new customer
// @route   POST /api/customers
export const createCustomer = async (req, res) => {
  try {
    console.log("--> Incoming POST Request Body:", req.body);

    const {
      customerCode,
      fullName,
      phoneNumber,
      email,
      address,
      city,
      pincode,
      status,
    } = req.body;

    // Check if customer code already exists
    const existingCustomer = await Customer.findOne({ customerCode });
    if (existingCustomer) {
      console.log("--> Validation Error: Customer code already exists");
      return res.status(400).json({
        success: false,
        message: "Customer code already exists",
      });
    }

    const customer = await Customer.create({
      customerCode,
      fullName,
      phoneNumber,
      email,
      address,
      city,
      pincode,
      status: status || "Active",
    });

    console.log("--> Saved to MongoDB Successfully:", customer);

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    console.error("--> Error Saving Customer:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to create customer",
      error: error.message,
    });
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};