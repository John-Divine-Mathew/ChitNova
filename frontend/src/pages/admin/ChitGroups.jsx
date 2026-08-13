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
  Layers,
  Users,
  Calendar,
  IndianRupee,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/chit-groups";

const ChitGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    groupCode: "",
    groupName: "",
    totalValue: 100000,
    durationMonths: 20,
    monthlyInstallment: 5000,
    maxMembers: 20,
    startDate: new Date().toISOString().split("T")[0],
    status: "Upcoming",
  });
const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setGroups(response.data.data);
      }
    } catch (err) {
      alert("Failed to fetch chit groups");
    } finally { // <-- Changed 'fontally' to 'finally'
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
      if (name === "totalValue" || name === "durationMonths" || name === "maxMembers") {
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
      startDate: new Date().toISOString().split("T")[0],
      status: "Upcoming",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (group) => {
    setEditingGroup(group);
    setFormData({
      groupCode: group.groupCode,
      groupName: group.groupName,
      totalValue: group.totalValue,
      durationMonths: group.durationMonths,
      monthlyInstallment: group.monthlyInstallment,
      maxMembers: group.maxMembers,
      startDate: new Date(group.startDate).toISOString().split("T")[0],
      status: group.status,
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
      g.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.groupCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Chit Groups</h1>
          <p className="text-sm text-slate-500">Manage active, upcoming, and completed chit schemes</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchGroups} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100 font-medium transition">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button onClick={handleOpenAddModal} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition">
            <Plus className="w-4 h-4" /> Create Group
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl mb-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search group name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500">
          <option value="All">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-orange-600" /></div>
      ) : filteredGroups.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">No Chit Groups found. Create your first group!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div key={group._id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{group.groupCode}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{group.groupName}</h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  group.status === "Active" ? "bg-emerald-100 text-emerald-700" : group.status === "Upcoming" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
                }`}>
                  {group.status}
                </span>
              </div>

              <div className="space-y-3 border-t border-b border-slate-100 py-4 my-4 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Total Scheme Value:</span>
                  <span className="font-bold text-slate-900">₹{group.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Monthly Installment:</span>
                  <span className="font-semibold text-slate-900">₹{group.monthlyInstallment.toLocaleString()} / mo</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Duration:</span>
                  <span className="font-medium text-slate-800">{group.durationMonths} Months</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Members Enrolled:</span>
                  <span className="font-medium text-slate-800">{group.currentMembersCount} / {group.maxMembers}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Starts: {new Date(group.startDate).toLocaleDateString()}</span>
                <div className="space-x-2">
                  <button onClick={() => handleOpenEditModal(group)} className="text-slate-600 hover:text-orange-600 p-1"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(group._id)} className="text-slate-600 hover:text-rose-600 p-1"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-slate-900 mb-4">{editingGroup ? "Edit Chit Group" : "Create Chit Group"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Group Code</label>
                  <input type="text" name="groupCode" value={formData.groupCode} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Group Name</label>
                  <input type="text" name="groupName" placeholder="e.g. Gold Chit 1L" value={formData.groupName} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Total Value (₹)</label>
                  <input type="number" name="totalValue" value={formData.totalValue} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Duration (Months)</label>
                  <input type="number" name="durationMonths" value={formData.durationMonths} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Monthly Installment (₹)</label>
                  <input type="number" name="monthlyInstallment" value={formData.monthlyInstallment} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 bg-slate-50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Max Members</label>
                  <input type="number" name="maxMembers" value={formData.maxMembers} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingGroup ? "Update Group" : "Save Group"}
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