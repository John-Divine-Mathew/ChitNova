import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  RefreshCw,
  Trash2,
  Loader2,
  X,
  CreditCard,
  DollarSign,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";

const HOSTNAME = window.location.hostname || "localhost";
const API_BASE = `http://${HOSTNAME}:5000/api`;

const COLLECTION_API = `${API_BASE}/collections`;
const ENROLLMENT_API = `${API_BASE}/enrollments`;
const AGENT_API = `${API_BASE}/agents`;

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [fetchError, setFetchError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    enrollmentId: "",
    amountPaid: "",
    paymentMode: "Cash",
    transactionId: "",
    collectedById: "",
    remarks: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setFetchError(null);

      const [colRes, enrRes, agtRes] = await Promise.all([
        axios.get(COLLECTION_API),
        axios.get(ENROLLMENT_API),
        axios.get(AGENT_API),
      ]);

      const extractData = (res) =>
        Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];

      setCollections(extractData(colRes));
      setEnrollments(extractData(enrRes));
      setAgents(extractData(agtRes));
    } catch (err) {
      console.error("Failed to load collection data:", err);
      setFetchError(
        err.response?.data?.message ||
          err.message ||
          "Network Error: Unable to connect to backend server"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setFormData({
      enrollmentId: "",
      amountPaid: "",
      paymentMode: "Cash",
      transactionId: "",
      collectedById: "",
      remarks: "Monthly installment paid",
    });
    setIsModalOpen(true);
  };

  const handleEnrollmentChange = (e) => {
    const selectedId = e.target.value;
    const selectedEnr = enrollments.find((item) => item._id === selectedId);

    setFormData((prev) => ({
      ...prev,
      enrollmentId: selectedId,
      amountPaid: selectedEnr?.chitGroup?.monthlyInstallment || "",
      collectedById: selectedEnr?.assignedAgent?._id || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const payload = { ...formData };
      if (!payload.collectedById) delete payload.collectedById;

      await axios.post(COLLECTION_API, payload);
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Payment collection failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this payment collection entry?")) {
      try {
        await axios.delete(`${COLLECTION_API}/${id}`);
        fetchData();
      } catch (err) {
        alert("Failed to delete collection entry");
      }
    }
  };

  // Dynamic summary stats
  const totalCollectedAmount = collections.reduce(
    (acc, c) => acc + (c.amountPaid || 0),
    0
  );
  const cashPaymentsCount = collections.filter(
    (c) => c.paymentMode === "Cash"
  ).length;
  const onlinePaymentsCount = collections.filter(
    (c) => c.paymentMode !== "Cash"
  ).length;

  // 4th stat: Filter collections recorded today
  const todayStr = new Date().toDateString();
  const todayCollectedAmount = collections
    .filter((c) => c.collectionDate && new Date(c.collectionDate).toDateString() === todayStr)
    .reduce((acc, c) => acc + (c.amountPaid || 0), 0);

  const filteredCollections = collections.filter((c) => {
    const custName = c.customer?.fullName?.toLowerCase() || "";
    const receipt = c.receiptNumber?.toLowerCase() || "";
    const groupName = c.chitGroup?.groupName?.toLowerCase() || "";
    return (
      custName.includes(searchTerm.toLowerCase()) ||
      receipt.includes(searchTerm.toLowerCase()) ||
      groupName.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen pb-24 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3 md:gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Daily Collections
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Record customer dues, track payment modes, and issue receipts.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={fetchData}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 transition shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleOpenModal}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Record Collection</span>
          </button>
        </div>
      </div>

      {/* Error Banner UI */}
      {fetchError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl mb-4 md:mb-6 text-sm font-medium flex items-center justify-between shadow-sm">
          <div>
            <p className="font-bold text-sm md:text-base">⚠️ Connection Error</p>
            <p className="text-xs text-rose-600 mt-0.5">{fetchError}</p>
          </div>
          <button
            onClick={fetchData}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition shadow-sm shrink-0 ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* 2x2 Summary Grid for Mobile (expands to 4-cols on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="bg-white border border-slate-200 p-3.5 md:p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Total Collected
            </span>
            <p className="text-lg md:text-2xl font-bold text-slate-900 mt-0.5 truncate">
              ₹{totalCollectedAmount.toLocaleString()}
            </p>
          </div>
          <div className="p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl text-emerald-600 shrink-0 ml-1">
            <TrendingUp className="w-4 h-4 md:w-6 md:h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 md:p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Today's Revenue
            </span>
            <p className="text-lg md:text-2xl font-bold text-slate-900 mt-0.5 truncate">
              ₹{todayCollectedAmount.toLocaleString()}
            </p>
          </div>
          <div className="p-2 md:p-3 bg-purple-50 rounded-lg md:rounded-xl text-purple-600 shrink-0 ml-1">
            <CalendarCheck className="w-4 h-4 md:w-6 md:h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 md:p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Cash Payments
            </span>
            <p className="text-lg md:text-2xl font-bold text-slate-900 mt-0.5">
              {cashPaymentsCount}
            </p>
          </div>
          <div className="p-2 md:p-3 bg-amber-50 rounded-lg md:rounded-xl text-amber-600 shrink-0 ml-1">
            <DollarSign className="w-4 h-4 md:w-6 md:h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 md:p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Digital / Online
            </span>
            <p className="text-lg md:text-2xl font-bold text-slate-900 mt-0.5">
              {onlinePaymentsCount}
            </p>
          </div>
          <div className="p-2 md:p-3 bg-blue-50 rounded-lg md:rounded-xl text-blue-600 shrink-0 ml-1">
            <CreditCard className="w-4 h-4 md:w-6 md:h-6" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-3 md:p-4 rounded-xl mb-4 md:mb-6 shadow-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer, receipt #, or group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Data Section */}
      {loading ? (
        <div className="flex justify-center items-center p-12 bg-white rounded-xl border border-slate-200 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
        </div>
      ) : filteredCollections.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm text-sm">
          No collection records found. Click <b>+ Record Collection</b> to enter a payment!
        </div>
      ) : (
        <>
          {/* Mobile Card Layout (Visible on Mobile) */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {filteredCollections.map((col) => (
              <div
                key={col._id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-3 relative"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-orange-600 tracking-wider uppercase font-mono bg-orange-50 px-2 py-0.5 rounded">
                      #{col.receiptNumber || "N/A"}
                    </span>
                    <h3 className="font-semibold text-slate-900 text-base mt-1">
                      {col.customer?.fullName || "No Customer"}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Amount</span>
                    <span className="text-lg font-bold text-emerald-600">
                      ₹{col.amountPaid?.toLocaleString() || "0"}
                    </span>
                  </div>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Chit Group</span>
                    <span className="font-medium text-slate-800">
                      {col.chitGroup?.groupName || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Ticket No.</span>
                    <span className="font-medium text-slate-800">
                      #{col.enrollment?.ticketNumber || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Agent</span>
                    <span className="font-medium text-slate-800">
                      {col.collectedBy?.fullName || "Admin Direct"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Date</span>
                    <span className="font-medium text-slate-800">
                      {col.collectionDate
                        ? new Date(col.collectionDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      col.paymentMode === "Cash"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {col.paymentMode || "Cash"}
                  </span>
                  <button
                    onClick={() => handleDelete(col._id)}
                    className="flex items-center gap-1 text-slate-400 hover:text-rose-600 font-medium text-xs p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (Hidden on Mobile) */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Receipt #</th>
                    <th className="px-6 py-3 font-semibold">Customer</th>
                    <th className="px-6 py-3 font-semibold">Chit Group</th>
                    <th className="px-6 py-3 font-semibold">Amount Paid</th>
                    <th className="px-6 py-3 font-semibold">Mode</th>
                    <th className="px-6 py-3 font-semibold">Agent</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredCollections.map((col) => (
                    <tr key={col._id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-mono font-semibold text-orange-600">
                        {col.receiptNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {col.customer?.fullName || "No Customer"}
                        </div>
                        <div className="text-xs text-slate-400">
                          Tkt #{col.enrollment?.ticketNumber || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {col.chitGroup?.groupName || "No Group"}
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-600">
                        ₹{col.amountPaid?.toLocaleString() || "0"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            col.paymentMode === "Cash"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {col.paymentMode || "Cash"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {col.collectedBy?.fullName || "Admin Direct"}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {col.collectionDate
                          ? new Date(col.collectionDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(col._id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
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

      {/* Modal / Mobile Bottom Sheet */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-t-2xl sm:rounded-xl max-w-md w-full p-5 sm:p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Record Payment Collection
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Enrolled Member
                </label>
                <select
                  value={formData.enrollmentId}
                  onChange={handleEnrollmentChange}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white"
                >
                  <option value="">-- Choose Customer Enrollment --</option>
                  {enrollments.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.customer?.fullName} - {e.chitGroup?.groupName} (Tkt #
                      {e.ticketNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Amount Paid (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.amountPaid}
                    onChange={(e) =>
                      setFormData({ ...formData, amountPaid: e.target.value })
                    }
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMode: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 bg-white"
                  >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI / GPay / PhonePe</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Txn ID / Ref Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. UPI Ref # / Cheque #"
                  value={formData.transactionId}
                  onChange={(e) =>
                    setFormData({ ...formData, transactionId: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Collected By (Agent)
                </label>
                <select
                  value={formData.collectedById}
                  onChange={(e) =>
                    setFormData({ ...formData, collectedById: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 bg-white"
                >
                  <option value="">Admin Direct</option>
                  {agents.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.fullName} ({a.assignedArea})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;