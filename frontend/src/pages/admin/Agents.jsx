import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  UserCheck,
  UserX,
  Edit2,
  Trash2,
  X,
  Loader2,
  RefreshCw,
  MapPin,
  Percent,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/agents";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    agentCode: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    assignedArea: "",
    commissionRate: 2.5,
    status: "Active",
  });

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setAgents(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAddModal = () => {
    setEditingAgent(null);
    setFormData({
      agentCode: `AGT${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: "",
      phoneNumber: "",
      email: "",
      assignedArea: "",
      commissionRate: 2.5,
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (agent) => {
    setEditingAgent(agent);
    setFormData({
      agentCode: agent.agentCode,
      fullName: agent.fullName,
      phoneNumber: agent.phoneNumber,
      email: agent.email,
      assignedArea: agent.assignedArea,
      commissionRate: agent.commissionRate,
      status: agent.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingAgent) {
        await axios.put(`${API_URL}/${editingAgent._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setIsModalOpen(false);
      fetchAgents();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

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

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.assignedArea.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agents</h1>
          <p className="text-sm text-slate-500">Manage field collection agents & routes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchAgents}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100 font-medium transition"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Add Agent
          </button>
        </div>
      </div>

      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Agents</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{agents.length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Agents</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {agents.filter((a) => a.status === "Active").length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Inactive / On Leave</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {agents.filter((a) => a.status !== "Active").length}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl mb-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by agent name, code, or route..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-orange-600" /></div>
        ) : filteredAgents.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No agents found. Add your first agent!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Code</th>
                  <th className="px-6 py-3 font-semibold">Agent Name</th>
                  <th className="px-6 py-3 font-semibold">Phone</th>
                  <th className="px-6 py-3 font-semibold">Assigned Route</th>
                  <th className="px-6 py-3 font-semibold">Commission</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAgents.map((agent) => (
                  <tr key={agent._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-mono font-medium text-slate-900">{agent.agentCode}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{agent.fullName}</td>
                    <td className="px-6 py-4 text-slate-600">{agent.phoneNumber}</td>
                    <td className="px-6 py-4 text-slate-600">{agent.assignedArea}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{agent.commissionRate}%</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        agent.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>{agent.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleOpenEditModal(agent)} className="text-slate-600 hover:text-orange-600 p-1"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(agent._id)} className="text-slate-600 hover:text-rose-600 p-1"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-slate-900 mb-4">{editingAgent ? "Edit Agent" : "Add New Agent"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Agent Code</label>
                <input type="text" name="agentCode" value={formData.agentCode} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Phone</label>
                  <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Assigned Route</label>
                  <input type="text" name="assignedArea" value={formData.assignedArea} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Commission (%)</label>
                  <input type="number" step="0.1" name="commissionRate" value={formData.commissionRate} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
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