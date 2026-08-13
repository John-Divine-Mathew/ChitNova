import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  UserCheck,
  UserX,
  Clock,
  Edit2,
  Trash2,
  X,
  Loader2,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/customers";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerCode: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    status: "Active",
  });

  // Fetch Customers from API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setCustomers(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open Modal for Create
  const handleOpenAddModal = () => {
    setEditingCustomer(null);
    setFormData({
      customerCode: `CUS${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      customerCode: customer.customerCode,
      fullName: customer.fullName,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      pincode: customer.pincode,
      status: customer.status,
    });
    setIsModalOpen(true);
  };

  // Submit Form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingCustomer) {
        await axios.put(`${API_URL}/${editingCustomer._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setIsModalOpen(false);
      fetchCustomers();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Customer
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCustomers();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete customer");
      }
    }
  };

  // Filtered Customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNumber.includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalCustomers = customers.length;
  const activeCount = customers.filter((c) => c.status === "Active").length;
  const pendingCount = customers.filter((c) => c.status === "Pending").length;
  const inactiveCount = customers.filter((c) => c.status === "Inactive").length;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500">Manage all registered customer records</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchCustomers}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100 font-medium transition"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-sm font-medium">Total Customers</span>
            <span className="p-2 bg-slate-100 rounded-lg text-slate-700">👥</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalCustomers}</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-sm font-medium">Active</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><UserCheck className="w-4 h-4" /></span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{activeCount}</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-sm font-medium">Pending</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-4 h-4" /></span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{pendingCount}</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-sm font-medium">Inactive</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-lg"><UserX className="w-4 h-4" /></span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{inactiveCount}</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl mb-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, code, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-2" />
            <p className="text-sm">Loading customer data...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-600">
            <p className="font-semibold mb-2">Error Loading Customers</p>
            <p className="text-sm text-slate-500">{error}</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="font-medium text-slate-800">No Customers Found</p>
            <p className="text-sm mt-1">Try adding a new customer or adjusting search filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Code</th>
                  <th className="px-6 py-3 font-semibold">Customer Name</th>
                  <th className="px-6 py-3 font-semibold">Phone</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">City</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-mono font-medium text-slate-900">
                      {customer.customerCode}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {customer.fullName}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{customer.phoneNumber}</td>
                    <td className="px-6 py-4 text-slate-600">{customer.email}</td>
                    <td className="px-6 py-4 text-slate-600">{customer.city}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          customer.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : customer.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(customer)}
                        className="text-slate-600 hover:text-orange-600 p-1 rounded transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(customer._id)}
                        className="text-slate-600 hover:text-rose-600 p-1 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {editingCustomer ? "Edit Customer" : "Add New Customer"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Customer Code
                </label>
                <input
                  type="text"
                  name="customerCode"
                  value={formData.customerCode}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingCustomer ? "Update Customer" : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;