import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  Clock,
  Edit2,
  Trash2,
  X,
  Loader2,
  RefreshCw,
  Phone,
  Mail,
  Briefcase,
} from "lucide-react";

// Dynamic API URL for Laptop & Mobile connections
const getApiBaseUrl = () => {
  const envApiUrl =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    (typeof process !== "undefined" && process.env?.REACT_APP_API_URL);

  if (envApiUrl) return `${envApiUrl}/agents`;

  const hostname = window.location.hostname || "localhost";
  return `http://${hostname}:5000/api/agents`;
};

const API_URL = getApiBaseUrl();

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State (Includes assignedArea required by backend)
  const [formData, setFormData] = useState({
    agentCode: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    assignedArea: "",
    commissionRate: 5.0,
    status: "Active",
  });

  // Fetch Agents from API
  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      
      const responseData = response.data?.data || response.data;
      if (Array.isArray(responseData)) {
        setAgents(responseData);
      } else {
        setAgents([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch agents");
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open Modal for Create
  const handleOpenAddModal = () => {
    setEditingAgent(null);
    setFormData({
      agentCode: `AGT${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
      assignedArea: "",
      commissionRate: 5.0,
      status: "Active",
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (agent) => {
    setEditingAgent(agent);
    setFormData({
      agentCode: agent.agentCode || "",
      fullName: agent.fullName || "",
      phoneNumber: agent.phoneNumber || "",
      email: agent.email || "",
      address: agent.address || "",
      city: agent.city || "",
      pincode: agent.pincode || "",
      assignedArea: agent.assignedArea || "",
      commissionRate: agent.commissionRate || 5.0,
      status: agent.status || "Active",
    });
    setIsModalOpen(true);
  };

  // Submit Form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      
      const payload = {
        agentCode: formData.agentCode,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        assignedArea: formData.assignedArea,
        commissionRate: Number(formData.commissionRate),
        status: formData.status,
      };

      if (editingAgent) {
        await axios.put(`${API_URL}/${editingAgent._id}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      setIsModalOpen(false);
      fetchAgents();
    } catch (err) {
      console.error("EXACT BACKEND ERROR MESSAGE:", err.response?.data);
      alert(`Backend rejected request: ${JSON.stringify(err.response?.data || err.message)}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Agent
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchAgents();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete agent");
      }
    }
  };

  // Filtered Agents (Safe check with Array.isArray)
  const safeAgents = Array.isArray(agents) ? agents : [];
  const filteredAgents = safeAgents.filter((agent) => {
    const matchesSearch =
      (agent.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.agentCode || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.phoneNumber || "").includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" || agent.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics safely
  const totalAgents = safeAgents.length;
  const activeCount = safeAgents.filter((a) => a.status === "Active").length;
  const pendingCount = safeAgents.filter((a) => a.status === "Pending").length;
  const inactiveCount = safeAgents.filter((a) => a.status === "Inactive").length;

  return (
    <div className="p-3 sm:p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Agents</h1>
          <p className="text-xs sm:text-sm text-slate-500">Manage field sales personnel and partners</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={fetchAgents}
            className="flex-1 sm:flex-none justify-center items-center flex gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-100 font-medium text-xs sm:text-sm transition shadow-sm active:bg-slate-200"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex-1 sm:flex-none justify-center items-center flex gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg font-medium text-xs sm:text-sm shadow-sm transition active:bg-orange-800"
          >
            <Plus className="w-4 h-4" /> Add Agent
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">Total Agents</span>
            <span className="p-1 sm:p-1.5 bg-slate-100 rounded-lg text-slate-700">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">{totalAgents}</p>
        </div>

        <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">Active</span>
            <span className="p-1 sm:p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">{activeCount}</p>
        </div>

        <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">Pending</span>
            <span className="p-1 sm:p-1.5 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">{pendingCount}</p>
        </div>

        <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">Inactive</span>
            <span className="p-1 sm:p-1.5 bg-rose-50 text-rose-600 rounded-lg">
              <UserX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">{inactiveCount}</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 shadow-sm flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, code, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="flex items-center gap-2 justify-between sm:justify-start">
          <span className="text-xs sm:text-sm font-medium text-slate-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg py-2 px-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-white flex-1 sm:flex-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center p-12 text-slate-500 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-2" />
          <p className="text-sm">Loading agents data...</p>
        </div>
      ) : error ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-rose-600 shadow-sm">
          <p className="font-semibold mb-2">Error Loading Agents</p>
          <p className="text-sm text-slate-500">{error}</p>
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 shadow-sm">
          <p className="font-medium text-slate-800">No Agents Found</p>
          <p className="text-sm mt-1">Try adding a new agent or adjusting search filters.</p>
        </div>
      ) : (
        <>
          {/* Mobile View */}
          <div className="grid grid-cols-1 gap-3.5 md:hidden">
            {filteredAgents.map((agent) => (
              <div
                key={agent._id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="inline-block text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {agent.agentCode}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1.5 leading-snug">
                      {agent.fullName}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${
                      agent.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : agent.status === "Pending"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                    <a href={`tel:${agent.phoneNumber}`} className="font-medium text-slate-800">
                      {agent.phoneNumber || "N/A"}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                    <span className="truncate font-medium text-slate-800">{agent.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>
                      Area: <strong className="text-slate-900 font-semibold">{agent.assignedArea || "N/A"}</strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 mt-1">
                  <button
                    onClick={() => handleOpenEditModal(agent)}
                    className="flex items-center justify-center gap-1.5 text-slate-700 hover:text-orange-600 text-xs font-semibold py-2 bg-slate-100 rounded-lg border border-slate-200 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="flex items-center justify-center gap-1.5 text-rose-600 hover:text-rose-700 text-xs font-semibold py-2 bg-rose-50 rounded-lg border border-rose-200 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Code</th>
                    <th className="px-6 py-3 font-semibold">Agent Name</th>
                    <th className="px-6 py-3 font-semibold">Phone</th>
                    <th className="px-6 py-3 font-semibold">Assigned Area</th>
                    <th className="px-6 py-3 font-semibold">Commission</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredAgents.map((agent) => (
                    <tr key={agent._id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-mono font-medium text-slate-900">{agent.agentCode}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{agent.fullName}</td>
                      <td className="px-6 py-4 text-slate-600">{agent.phoneNumber}</td>
                      <td className="px-6 py-4 text-slate-600">{agent.assignedArea || "N/A"}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{agent.commissionRate}%</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          agent.status === "Active" ? "bg-emerald-100 text-emerald-700" : agent.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                        }`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleOpenEditModal(agent)} className="text-slate-600 hover:text-orange-600 p-1 rounded transition">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(agent._id)} className="text-slate-600 hover:text-rose-600 p-1 rounded transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-t-2xl sm:rounded-xl max-w-md w-full p-5 sm:p-6 shadow-xl relative max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              {editingAgent ? "Edit Agent" : "Add New Agent"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Agent Code</label>
                <input type="text" name="agentCode" value={formData.agentCode} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Phone</label>
                  <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Assigned Area / Route</label>
                <input 
                  type="text" 
                  name="assignedArea" 
                  value={formData.assignedArea} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="e.g. North Zone / Downtown"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Commission Rate (%)</label>
                <input type="number" step="0.1" name="commissionRate" value={formData.commissionRate} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Pincode</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-white">
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-600 hover:bg-slate-100 font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="flex-1 sm:flex-none justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingAgent ? "Update Agent" : "Save Agent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agents;