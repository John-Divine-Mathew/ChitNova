import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserPlus, Search, RefreshCw, Trash2, Loader2, X, Ticket, Layers, User } from "lucide-react";

const ENROLL_API = "http://localhost:5000/api/enrollments";
const CUSTOMER_API = "http://localhost:5000/api/customers";
const GROUP_API = "http://localhost:5000/api/chit-groups";
const AGENT_API = "http://localhost:5000/api/agents";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerId: "",
    chitGroupId: "",
    assignedAgentId: "",
    ticketNumber: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [enrollRes, custRes, groupRes, agentRes] = await Promise.all([
        axios.get(ENROLL_API),
        axios.get(CUSTOMER_API),
        axios.get(GROUP_API),
        axios.get(AGENT_API),
      ]);

      if (enrollRes.data.success) setEnrollments(enrollRes.data.data);
      if (custRes.data.success) setCustomers(custRes.data.data);
      if (groupRes.data.success) setGroups(groupRes.data.data);
      if (agentRes.data.success) setAgents(agentRes.data.data);
    } catch (err) {
      console.error("Failed to load enrollment data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setFormData({
      customerId: customers[0]?._id || "",
      chitGroupId: groups[0]?._id || "",
      assignedAgentId: agents[0]?._id || "",
      ticketNumber: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post(ENROLL_API, formData);
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Cancel this membership enrollment?")) {
      try {
        await axios.delete(`${ENROLL_API}/${id}`);
        fetchData();
      } catch (err) {
        alert("Failed to delete enrollment");
      }
    }
  };

  const filteredEnrollments = enrollments.filter((e) => {
    const custName = e.customer?.fullName?.toLowerCase() || "";
    const groupName = e.chitGroup?.groupName?.toLowerCase() || "";
    return custName.includes(searchTerm.toLowerCase()) || groupName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Group Enrollments</h1>
          <p className="text-sm text-slate-500">Assign customers to Chit Groups & assign ticket numbers</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchData} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100 font-medium transition">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button onClick={handleOpenModal} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition">
            <UserPlus className="w-4 h-4" /> Enroll Customer
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl mb-6 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name or group name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-orange-600" /></div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No enrollments found. Enroll a customer into a scheme!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Ticket #</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Chit Group</th>
                  <th className="px-6 py-3 font-semibold">Assigned Agent</th>
                  <th className="px-6 py-3 font-semibold">Monthly Due</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredEnrollments.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-mono font-bold text-orange-600">
                      Ticket #{item.ticketNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{item.customer?.fullName || "N/A"}</div>
                      <div className="text-xs text-slate-400">{item.customer?.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{item.chitGroup?.groupName || "N/A"}</div>
                      <div className="text-xs text-slate-400">Val: ₹{item.chitGroup?.totalValue?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.assignedAgent?.fullName || "Unassigned"}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      ₹{item.chitGroup?.monthlyInstallment?.toLocaleString()} / mo
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(item._id)} className="text-slate-400 hover:text-rose-600 p-1">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Enroll Customer in Scheme</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Select Customer</label>
                <select
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="">-- Choose Customer --</option>
                  {customers.map((c) => (
                    <option key={c._id} value={c._id}>{c.fullName} ({c.customerCode || c.phoneNumber})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Select Chit Group</label>
                <select
                  value={formData.chitGroupId}
                  onChange={(e) => setFormData({ ...formData, chitGroupId: e.target.value })}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="">-- Choose Group --</option>
                  {groups.map((g) => (
                    <option key={g._id} value={g._id}>
                      {g.groupName} (Val: ₹{g.totalValue.toLocaleString()} - {g.currentMembersCount}/{g.maxMembers} filled)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Assign Agent (Optional)</label>
                <select
                  value={formData.assignedAgentId}
                  onChange={(e) => setFormData({ ...formData, assignedAgentId: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="">-- Choose Collection Agent --</option>
                  {agents.map((a) => (
                    <option key={a._id} value={a._id}>{a.fullName} ({a.assignedArea})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Ticket Number (Optional)</label>
                <input
                  type="number"
                  placeholder="Leave blank for auto-number"
                  value={formData.ticketNumber}
                  onChange={(e) => setFormData({ ...formData, ticketNumber: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Save Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollments;