import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Wallet,
  Plus,
  Search,
  RefreshCw,
  Trash2,
  Loader2,
  X,
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const COLLECTION_API = "http://localhost:5000/api/collections";
const ENROLLMENT_API = "http://localhost:5000/api/enrollments";
const AGENT_API = "http://localhost:5000/api/agents";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
      const [colRes, enrRes, agtRes] = await Promise.all([
        axios.get(COLLECTION_API),
        axios.get(ENROLLMENT_API),
        axios.get(AGENT_API),
      ]);

      if (colRes.data.success) setCollections(colRes.data.data);
      if (enrRes.data.success) setEnrollments(enrRes.data.data);
      if (agtRes.data.success) setAgents(agtRes.data.data);
    } catch (err) {
      console.error("Failed to load collection data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    const firstEnr = enrollments[0];
    setFormData({
      enrollmentId: firstEnr?._id || "",
      amountPaid: firstEnr?.chitGroup?.monthlyInstallment || "",
      paymentMode: "Cash",
      transactionId: "",
      collectedById: firstEnr?.assignedAgent?._id || agents[0]?._id || "",
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
      collectedById: selectedEnr?.assignedAgent?._id || prev.collectedById,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post(COLLECTION_API, formData);
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
  const totalCollectedAmount = collections.reduce((acc, c) => acc + (c.amountPaid || 0), 0);
  const cashPaymentsCount = collections.filter((c) => c.paymentMode === "Cash").length;
  const onlinePaymentsCount = collections.filter((c) => c.paymentMode !== "Cash").length;

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
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Daily Collections</h1>
          <p className="text-sm text-slate-500">Record customer dues, track payment modes, and issue receipts.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100 font-medium transition"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Record Collection
          </button>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Collected</span>
            <p className="text-3xl font-bold text-slate-900 mt-1">₹{totalCollectedAmount.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Cash Transactions</span>
            <p className="text-3xl font-bold text-slate-900 mt-1">{cashPaymentsCount}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Digital / Online</span>
            <p className="text-3xl font-bold text-slate-900 mt-1">{onlinePaymentsCount}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl mb-6 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, receipt #, or group name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Table displaying Real Collections */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        ) : filteredCollections.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No collection records found. Click <b>+ Record Collection</b> to enter a payment!
          </div>
        ) : (
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
                      {col.receiptNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{col.customer?.fullName || "N/A"}</div>
                      <div className="text-xs text-slate-400">Tkt #{col.enrollment?.ticketNumber}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {col.chitGroup?.groupName || "N/A"}
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-600">
                      ₹{col.amountPaid?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        col.paymentMode === "Cash"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {col.paymentMode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {col.collectedBy?.fullName || "Admin Direct"}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(col.collectionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(col._id)} className="text-slate-400 hover:text-rose-600 p-1">
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
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Record Payment Collection</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Select Enrolled Member</label>
                <select
                  value={formData.enrollmentId}
                  onChange={handleEnrollmentChange}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="">-- Choose Customer Enrollment --</option>
                  {enrollments.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.customer?.fullName} - {e.chitGroup?.groupName} (Tkt #{e.ticketNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Amount Paid (₹)</label>
                  <input
                    type="number"
                    value={formData.amountPaid}
                    onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Payment Mode</label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI / GPay / PhonePe</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Txn ID / Ref Number (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. UPI Ref # / Cheque #"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Collected By (Agent)</label>
                <select
                  value={formData.collectedById}
                  onChange={(e) => setFormData({ ...formData, collectedById: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="">Admin Direct</option>
                  {agents.map((a) => (
                    <option key={a._id} value={a._id}>{a.fullName} ({a.assignedArea})</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Save Payment
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