import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  RefreshCw,
  Trash2,
  Loader2,
  X,
  Users,
  Layers,
  Award,
  UserCheck,
} from "lucide-react";

// Dynamic API Host Resolution for Cross-Device Testing (Mobile, Laptop, Localhost)
const getApiBaseUrl = () => {
  const envApiUrl =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    (typeof process !== "undefined" && process.env?.REACT_APP_API_URL);

  if (envApiUrl) {
    return envApiUrl;
  }

  const hostname = window.location.hostname || "localhost";
  return `http://${hostname}:5000/api`;
};

const API_BASE = getApiBaseUrl();

const ENROLL_API = `${API_BASE}/enrollments`;
const CUSTOMER_API = `${API_BASE}/customers`;
const GROUP_API = `${API_BASE}/chit-groups`;
const AGENT_API = `${API_BASE}/agents`;

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [agents, setAgents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchError, setFetchError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerId: "",
    chitGroupId: "",
    ticketNumber: "",
    assignedAgentId: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setFetchError(null);

      const results = await Promise.allSettled([
        axios.get(ENROLL_API),
        axios.get(CUSTOMER_API),
        axios.get(GROUP_API),
        axios.get(AGENT_API),
      ]);

      const extractData = (result) => {
        if (result.status !== "fulfilled") return [];
        const res = result.value;
        const d = res?.data;
        
        if (Array.isArray(d)) return d;
        if (Array.isArray(d?.data)) return d.data;
        if (Array.isArray(d?.groups)) return d.groups;
        if (Array.isArray(d?.customers)) return d.customers;
        if (Array.isArray(d?.agents)) return d.agents;
        if (Array.isArray(d?.enrollments)) return d.enrollments;
        
        return [];
      };

      const [enrollRes, custRes, groupRes, agentRes] = results;

      setEnrollments(extractData(enrollRes));
      setCustomers(extractData(custRes));
      setGroups(extractData(groupRes));
      setAgents(extractData(agentRes));

      if (enrollRes.status === "rejected") {
        const err = enrollRes.reason;
        setFetchError(
          err.response?.data?.message ||
            `Unable to connect to backend at ${API_BASE}. Verify backend status and CORS settings.`
        );
      }
    } catch (err) {
      console.error("Failed to load enrollment data:", err);
      setFetchError("Unexpected error while retrieving data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setFormData({
      customerId: "",
      chitGroupId: "",
      ticketNumber: "",
      assignedAgentId: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      // Providing multiple naming variants so backend controllers match regardless of their specific schema definition
      const payload = {
        customer: formData.customerId,
        customerId: formData.customerId,
        chitGroup: formData.chitGroupId,
        chitGroupId: formData.chitGroupId,
        groupId: formData.chitGroupId,
        ticketNumber: Number(formData.ticketNumber),
      };

      if (formData.assignedAgentId) {
        payload.assignedAgent = formData.assignedAgentId;
        payload.assignedAgentId = formData.assignedAgentId;
      }

      await axios.post(ENROLL_API, payload);
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create enrollment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enrollment?")) {
      try {
        await axios.delete(`${ENROLL_API}/${id}`);
        fetchData();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete enrollment");
      }
    }
  };

  const filteredEnrollments = enrollments.filter((e) => {
    const custName = e.customer?.fullName?.toLowerCase() || "";
    const groupName = (e.chitGroup?.groupName || e.chitGroup?.name)?.toLowerCase() || "";
    const ticketStr = e.ticketNumber != null ? String(e.ticketNumber) : "";
    const search = searchTerm.toLowerCase();

    return (
      custName.includes(search) ||
      groupName.includes(search) ||
      ticketStr.includes(search)
    );
  });

  const totalEnrollments = enrollments.length;
  const activeGroupsCount = groups.filter(
    (g) => g.status === "Active" || !g.status
  ).length;
  const activeAgentsCount = agents.filter((a) => a.status === "Active").length;
  const directEnrollmentsCount = enrollments.filter(
    (e) => !e.assignedAgent
  ).length;

  return (
    <div className="p-3 sm:p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Member Enrollments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Assign customers to chit groups, issue ticket numbers, and track agents.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchData}
            className="flex-1 sm:flex-none justify-center items-center flex gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-100 font-medium text-xs sm:text-sm transition shadow-sm"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={handleOpenModal}
            className="flex-1 sm:flex-none justify-center items-center flex gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg font-medium text-xs sm:text-sm shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> New Enrollment
          </button>
        </div>
      </div>

      {/* Connection Alert Banner */}
      {fetchError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl mb-6 text-sm font-medium flex items-center justify-between shadow-sm">
          <div>
            <p className="font-bold text-base">⚠️ Connection Error</p>
            <p className="text-xs text-rose-600 mt-0.5">{fetchError}</p>
          </div>
          <button
            onClick={fetchData}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition shadow-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">
              Total Enrollments
            </span>
            <span className="p-1 sm:p-1.5 bg-orange-50 text-orange-600 rounded-lg">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">
            {totalEnrollments}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">
              Active Chit Groups
            </span>
            <span className="p-1 sm:p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">
            {activeGroupsCount}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">
              Active Field Agents
            </span>
            <span className="p-1 sm:p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">
            {activeAgentsCount}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">
              Direct Admin
            </span>
            <span className="p-1 sm:p-1.5 bg-purple-50 text-purple-600 rounded-lg">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">
            {directEnrollmentsCount}
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 shadow-sm flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, chit group, or ticket number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Enrollment Content View */}
      <div className="bg-transparent md:bg-white md:border md:border-slate-200 md:rounded-xl md:overflow-hidden md:shadow-sm">
        {loading ? (
          <div className="flex justify-center p-12 bg-white rounded-xl border border-slate-200">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm bg-white rounded-xl border border-slate-200">
            No enrollment records found. Click <b>+ New Enrollment</b> to enroll a member!
          </div>
        ) : (
          <>
            {/* Mobile Card View Layout */}
            <div className="block md:hidden space-y-3">
              {filteredEnrollments.map((e) => (
                <div
                  key={e._id}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3 relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-orange-50 text-orange-600 font-mono font-bold text-xs rounded-md mb-1">
                        #{e.ticketNumber ?? "N/A"}
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {e.customer?.fullName || "No Customer Linked"}
                      </h3>
                      <p className="text-xs text-slate-400">{e.customer?.phone || "No phone available"}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded transition bg-slate-50 border border-slate-100"
                      title="Cancel Enrollment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-2.5 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Chit Group</span>
                      <span className="font-medium text-slate-800">{e.chitGroup?.groupName || e.chitGroup?.name || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Installment</span>
                      <span className="font-semibold text-emerald-600">
                        ₹{(e.chitGroup?.monthlyInstallment ?? e.chitGroup?.installmentAmount ?? 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Assigned Agent</span>
                      <span className="text-slate-700">{e.assignedAgent?.fullName || "Direct Admin"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Enrolled Date</span>
                      <span className="text-slate-500">
                        {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View Layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Tkt #</th>
                    <th className="px-6 py-3 font-semibold">Customer Name</th>
                    <th className="px-6 py-3 font-semibold">Chit Group</th>
                    <th className="px-6 py-3 font-semibold">Installment</th>
                    <th className="px-6 py-3 font-semibold">Assigned Agent</th>
                    <th className="px-6 py-3 font-semibold">Enrolled Date</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredEnrollments.map((e) => (
                    <tr key={e._id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-mono font-bold text-orange-600">
                        #{e.ticketNumber ?? "N/A"}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        <div>{e.customer?.fullName || "No Customer Linked"}</div>
                        <div className="text-xs text-slate-400">{e.customer?.phone || ""}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {e.chitGroup?.groupName || e.chitGroup?.name || "No Group Linked"}
                      </td>
                      <td className="px-6 py-4 font-semibold text-emerald-600">
                        ₹{(e.chitGroup?.monthlyInstallment ?? e.chitGroup?.installmentAmount ?? 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {e.assignedAgent?.fullName || "Direct Admin"}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(e._id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 rounded transition"
                          title="Cancel Enrollment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-4 sm:p-6 shadow-xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Enroll Member in Group
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Select Customer
                </label>
                <select
                  value={formData.customerId}
                  onChange={(e) =>
                    setFormData({ ...formData, customerId: e.target.value })
                  }
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-white"
                >
                  <option value="">-- Select Customer --</option>
                  {customers.map((c) => {
                    const phoneText = c.phone || c.phoneNumber || "No Phone";
                    return (
                      <option key={c._id} value={c._id}>
                        {c.fullName} ({phoneText})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Select Chit Group
                </label>
                <select
                  value={formData.chitGroupId}
                  onChange={(e) =>
                    setFormData({ ...formData, chitGroupId: e.target.value })
                  }
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-white"
                >
                  <option value="">-- Select Chit Group --</option>
                  {groups.map((g) => {
                    const gName = g.groupName || g.name || "Unnamed Group";
                    const gInstallment = g.monthlyInstallment || g.installmentAmount || 0;
                    const gDuration = g.durationMonths || g.totalMonths || 0;
                    return (
                      <option key={g._id} value={g._id}>
                        {gName} - ₹{gInstallment}/mo ({gDuration} mos)
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Ticket Number
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 101"
                    value={formData.ticketNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, ticketNumber: e.target.value })
                    }
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Assigned Agent (Optional)
                  </label>
                  <select
                    value={formData.assignedAgentId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assignedAgentId: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 bg-white"
                  >
                    <option value="">Direct / None</option>
                    {agents.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-600 font-medium hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2 shadow-sm"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Enroll
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