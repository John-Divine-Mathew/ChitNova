import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  RefreshCw,
  Users,
  Calendar,
  IndianRupee,
} from "lucide-react";

// Dynamic API URL for Laptop & Mobile connections
const getApiBaseUrl = () => {
  const envApiUrl =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    (typeof process !== "undefined" && process.env?.REACT_APP_API_URL);

  if (envApiUrl) return `${envApiUrl}/chit-groups`;

  const hostname = window.location.hostname || "localhost";
  return `http://${hostname}:5000/api/chit-groups`;
};

const API_URL = getApiBaseUrl();

const ChitGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Helper function to safely format ISO dates to YYYY-MM-DD for <input type="date">
  const formatDateForInput = (dateInput) => {
    if (!dateInput) return new Date().toISOString().split("T")[0];
    const dateObj = new Date(dateInput);
    if (isNaN(dateObj.getTime())) return new Date().toISOString().split("T")[0];

    // Format locally to avoid UTC timezone off-by-one errors
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    groupCode: "",
    groupName: "",
    totalValue: 100000,
    durationMonths: 20,
    monthlyInstallment: 5000,
    maxMembers: 20,
    startDate: formatDateForInput(new Date()),
    status: "Upcoming",
  });

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data?.success) {
        setGroups(response.data.data);
      } else if (Array.isArray(response.data)) {
        setGroups(response.data);
      }
    } catch (err) {
      alert("Failed to fetch chit groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto recalculate monthly installment if totalValue or durationMonths changes
      if (name === "totalValue" || name === "durationMonths") {
        const val = Number(updated.totalValue) || 0;
        const dur = Number(updated.durationMonths) || 1;
        updated.monthlyInstallment = Math.round(val / dur);
      }
      return updated;
    });
  };

  const handleOpenAddModal = () => {
    setEditingGroup(null);
    setFormData({
      groupCode: `CG${Math.floor(100 + Math.random() * 900)}`,
      groupName: "",
      totalValue: 100000,
      durationMonths: 20,
      monthlyInstallment: 5000,
      maxMembers: 20,
      startDate: formatDateForInput(new Date()),
      status: "Upcoming",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (group) => {
    setEditingGroup(group);
    setFormData({
      groupCode: group.groupCode || "",
      groupName: group.groupName || "",
      totalValue: group.totalValue || 0,
      durationMonths: group.durationMonths || 1,
      monthlyInstallment: group.monthlyInstallment || 0,
      maxMembers: group.maxMembers || 0,
      startDate: formatDateForInput(group.startDate),
      status: group.status || "Upcoming",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingGroup) {
        await axios.put(`${API_URL}/${editingGroup._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setIsModalOpen(false);
      fetchGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Chit Group?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchGroups();
      } catch (err) {
        alert("Failed to delete group");
      }
    }
  };

  const filteredGroups = groups.filter((g) => {
    const matchesSearch =
      (g.groupName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.groupCode || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 sm:pb-6">
      {/* Sticky Mobile Header / Standard Desktop Header */}
      <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-md px-4 pt-4 pb-3 sm:p-6 border-b border-slate-200 sm:border-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Chit Groups
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage active, upcoming, and completed chit schemes
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={fetchGroups}
              className="flex-1 sm:flex-none justify-center items-center flex gap-2 bg-white border border-slate-200 text-slate-700 px-3.5 py-2.5 sm:py-2 rounded-xl hover:bg-slate-100 font-medium text-xs sm:text-sm transition shadow-sm active:bg-slate-200"
            >
              <RefreshCw className="w-4 h-4" /> 
              <span>Refresh</span>
            </button>
            <button
              onClick={handleOpenAddModal}
              className="flex-1 sm:flex-none justify-center items-center flex gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-2.5 sm:py-2 rounded-xl font-medium text-xs sm:text-sm shadow-sm shadow-orange-600/20 transition active:bg-orange-800"
            >
              <Plus className="w-4 h-4" /> 
              <span>Create Group</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pt-4">
        {/* Filter Bar */}
        <div className="bg-white border border-slate-200 p-3.5 sm:p-4 rounded-2xl mb-4 sm:mb-6 shadow-sm flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search group name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-slate-50/50 sm:bg-white"
            />
          </div>
          <div className="flex items-center gap-2 justify-between sm:justify-start">
            <span className="text-xs sm:text-sm font-medium text-slate-600 shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-xl py-2.5 sm:py-2 px-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-white flex-1 sm:flex-none shadow-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-12 text-slate-500 shadow-sm">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-2" />
            <p className="text-sm font-medium">Loading chit groups...</p>
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
            <p className="font-semibold text-slate-800 text-base">No Chit Groups Found</p>
            <p className="text-xs sm:text-sm mt-1 text-slate-400">Create your first group or adjust filter parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {filteredGroups.map((group) => (
              <div
                key={group._id}
                className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <div className="space-y-1">
                      <span className="inline-block text-[11px] font-mono font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                        {group.groupCode}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {group.groupName}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${
                        group.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : group.status === "Upcoming"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {group.status}
                    </span>
                  </div>

                  <div className="space-y-2.5 border-t border-b border-slate-100 py-3 sm:py-4 my-3 sm:my-4 text-xs sm:text-sm">
                    <div className="flex justify-between items-center text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <IndianRupee className="w-3.5 h-3.5 text-orange-600" /> Total Scheme Value
                      </span>
                      <span className="font-bold text-slate-900">
                        ₹{group.totalValue?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span className="font-medium text-slate-500">Monthly Installment</span>
                      <span className="font-semibold text-slate-900">
                        ₹{group.monthlyInstallment?.toLocaleString()} <span className="text-slate-400 font-normal">/mo</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span className="font-medium text-slate-500">Duration</span>
                      <span className="font-semibold text-slate-800">
                        {group.durationMonths} Months
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <Users className="w-3.5 h-3.5 text-orange-600" /> Members Enrolled
                      </span>
                      <span className="font-semibold text-slate-800">
                        {group.currentMembersCount || 0} / {group.maxMembers}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Controls */}
                <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Starts: {new Date(group.startDate).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(group)}
                      className="p-2 text-slate-600 hover:text-orange-600 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition"
                      title="Edit Group"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="p-2 text-slate-600 hover:text-rose-600 rounded-xl hover:bg-rose-50 active:bg-rose-100 transition"
                      title="Delete Group"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal (Agent-Style Responsive Bottom Sheet / Centered Dialog) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white border-t sm:border border-slate-200 rounded-t-[24px] sm:rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative max-h-[92vh] sm:max-h-[85vh] overflow-y-auto">
            
            {/* Mobile drag handle indicator */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden"></div>

            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {editingGroup ? "Edit Chit Group" : "Create Chit Group"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Group Code
                  </label>
                  <input
                    type="text"
                    name="groupCode"
                    value={formData.groupCode}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-slate-50/50 sm:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Group Name
                  </label>
                  <input
                    type="text"
                    name="groupName"
                    placeholder="e.g. Gold Chit 1L"
                    value={formData.groupName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-slate-50/50 sm:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Total Value (₹)
                  </label>
                  <input
                    type="number"
                    name="totalValue"
                    value={formData.totalValue}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-slate-50/50 sm:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Duration (Months)
                  </label>
                  <input
                    type="number"
                    name="durationMonths"
                    value={formData.durationMonths}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-slate-50/50 sm:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Monthly Installment (₹)
                  </label>
                  <input
                    type="number"
                    name="monthlyInstallment"
                    value={formData.monthlyInstallment}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-slate-100 text-slate-600 font-medium cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Max Members
                  </label>
                  <input
                    type="number"
                    name="maxMembers"
                    value={formData.maxMembers}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-slate-50/50 sm:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-slate-50/50 sm:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-white shadow-sm"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-slate-100 font-semibold transition active:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 justify-center px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm shadow-orange-600/20 flex items-center gap-2 active:bg-orange-800 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingGroup ? "Update Group" : "Save Group"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChitGroups;