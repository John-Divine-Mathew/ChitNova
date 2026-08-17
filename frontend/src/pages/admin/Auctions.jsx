import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Gavel,
  RefreshCw,
  Search,
  Loader2,
  X,
  Trophy,
} from "lucide-react";

// Dynamic Host Resolution for Live Data
const getApiBaseUrl = () => {
  const envApiUrl =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    (typeof process !== "undefined" && process.env?.REACT_APP_API_URL);

  if (envApiUrl) return envApiUrl;

  const hostname = window.location.hostname || "localhost";
  return `http://${hostname}:5000/api`;
};

const BASE_URL = getApiBaseUrl();
const AUCTION_API = `${BASE_URL}/auctions`;
const GROUP_API = `${BASE_URL}/chit-groups`;
const ENROLLMENT_API = `${BASE_URL}/enrollments`;

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    chitGroupId: "",
    auctionNumber: 1,
    winningEnrollmentId: "",
    bidDiscountAmount: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [aucRes, grpRes, enrRes] = await Promise.all([
        axios.get(AUCTION_API),
        axios.get(GROUP_API).catch(() => axios.get(`${BASE_URL}/groups`)),
        axios.get(ENROLLMENT_API),
      ]);

      setAuctions(aucRes.data?.data || (Array.isArray(aucRes.data) ? aucRes.data : []));
      setGroups(grpRes.data?.data || (Array.isArray(grpRes.data) ? grpRes.data : []));
      setEnrollments(enrRes.data?.data || (Array.isArray(enrRes.data) ? enrRes.data : []));
    } catch (err) {
      console.error("Failed to load auction live data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGroupSelect = (groupId) => {
    const groupEnrollments = enrollments.filter(
      (e) => (e.chitGroup?._id === groupId || e.chitGroup === groupId) && !e.hasWonAuction
    );
    
    const groupAuctions = auctions.filter(
      (a) => a.chitGroup?._id === groupId || a.chitGroup === groupId
    );
    const nextRound = groupAuctions.length + 1;

    setFormData({
      chitGroupId: groupId,
      auctionNumber: nextRound,
      winningEnrollmentId: groupEnrollments[0]?._id || "",
      bidDiscountAmount: "",
    });
  };

  const handleOpenModal = () => {
    if (groups.length > 0) {
      handleGroupSelect(groups[0]._id);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post(AUCTION_API, formData);
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Auction entry failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${AUCTION_API}/${id}/status`, { payoutStatus: status });
      fetchData();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const availableEligibleMembers = enrollments.filter(
    (e) => (e.chitGroup?._id === formData.chitGroupId || e.chitGroup === formData.chitGroupId) && !e.hasWonAuction
  );

  const filteredAuctions = auctions.filter((a) => {
    const custName = a.winningCustomer?.fullName?.toLowerCase() || a.winningCustomer?.name?.toLowerCase() || "";
    const groupName = a.chitGroup?.groupName?.toLowerCase() || "";
    return custName.includes(searchTerm.toLowerCase()) || groupName.includes(searchTerm.toLowerCase());
  });

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-100/70 p-3 sm:p-6 lg:p-8 pb-20 sm:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-wider text-orange-600 uppercase">
            Bidding Operations
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Chit Auctions & Bidding
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Conduct bidding rounds, calculate dividends, and track payouts.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={fetchData}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-50 transition active:scale-95 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button
            onClick={handleOpenModal}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95"
          >
            <Gavel className="w-4 h-4" /> Conduct Auction
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search winner or group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm shadow-2xs focus:outline-none focus:border-orange-500 transition"
          />
        </div>
      </div>

      {/* Data Container */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-7 h-7 animate-spin text-orange-600 mb-2" />
          <p className="text-xs font-medium text-slate-600">Loading live auction data...</p>
        </div>
      ) : filteredAuctions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
          <p className="text-sm font-semibold text-slate-700">No auctions recorded yet</p>
          <p className="text-xs text-slate-400 mt-1">
            Tap <b>+ Conduct Auction</b> to start a new bidding round.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile View: Spaced Cards (< md) */}
          <div className="block md:hidden space-y-3">
            {filteredAuctions.map((auc) => (
              <div
                key={auc._id}
                className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-2xs"
              >
                {/* Header Info */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-600 font-mono font-bold text-[11px] rounded-md">
                      Round #{auc.auctionNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 truncate max-w-[140px]">
                      {auc.chitGroup?.groupName || "N/A"}
                    </span>
                  </div>
                  
                  {/* Status Dropdown */}
                  <select
                    value={auc.payoutStatus || "Pending Guarantee"}
                    onChange={(e) => handleStatusChange(auc._id, e.target.value)}
                    className="text-[10px] border border-slate-200 rounded-lg px-1.5 py-1 font-semibold text-slate-700 focus:outline-none focus:border-orange-500 bg-slate-50"
                  >
                    <option value="Pending Guarantee">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Paid">Paid Out</option>
                  </select>
                </div>

                {/* Winner Details */}
                <div className="flex items-center gap-2 mb-3 bg-slate-50/70 p-2 rounded-xl">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {auc.winningCustomer?.fullName || auc.winningCustomer?.name || "N/A"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Ticket #{auc.winningEnrollment?.ticketNumber || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-3 gap-2 text-center bg-slate-50/40 p-2 rounded-xl">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Discount
                    </span>
                    <span className="text-xs font-bold text-rose-600">
                      ₹{(auc.bidDiscountAmount || 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Dividend
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      ₹{Math.round(auc.dividendPerMember || 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Payout
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      ₹{(auc.winningPayoutAmount || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (≥ md) */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 text-slate-600 border-b border-slate-200 text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Round</th>
                    <th className="px-5 py-3.5">Chit Group</th>
                    <th className="px-5 py-3.5">Winner</th>
                    <th className="px-5 py-3.5">Bid Discount</th>
                    <th className="px-5 py-3.5">Dividend / Member</th>
                    <th className="px-5 py-3.5">Winning Payout</th>
                    <th className="px-5 py-3.5">Payout Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAuctions.map((auc) => (
                    <tr key={auc._id} className="hover:bg-slate-50/80 transition odd:bg-white even:bg-slate-50/30">
                      <td className="px-5 py-3.5 font-bold font-mono text-orange-600">
                        Month #{auc.auctionNumber}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-slate-900">
                        {auc.chitGroup?.groupName || "N/A"}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {auc.winningCustomer?.fullName || auc.winningCustomer?.name || "N/A"}
                            </p>
                            <p className="text-xs text-slate-400 font-mono">
                              Tkt #{auc.winningEnrollment?.ticketNumber || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-rose-600 font-bold">
                        ₹{(auc.bidDiscountAmount || 0).toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5 text-emerald-600 font-bold">
                        ₹{(auc.dividendPerMember || 0).toFixed(2)}
                      </td>
                      <td className="px-5 py-3.5 text-slate-900 font-bold">
                        ₹{(auc.winningPayoutAmount || 0).toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={auc.payoutStatus || "Pending Guarantee"}
                          onChange={(e) => handleStatusChange(auc._id, e.target.value)}
                          className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-orange-500 bg-slate-50"
                        >
                          <option value="Pending Guarantee">Pending Guarantee</option>
                          <option value="Approved">Approved</option>
                          <option value="Paid">Paid Out</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Conduct Auction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-4 sm:p-5 shadow-xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
              Conduct Chit Auction
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Select Chit Group
                </label>
                <select
                  value={formData.chitGroupId}
                  onChange={(e) => handleGroupSelect(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 bg-slate-50/50"
                >
                  {groups.map((g) => (
                    <option key={g._id} value={g._id}>
                      {g.groupName} (₹{(g.totalValue || 0).toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Auction Round / Month #
                </label>
                <input
                  type="number"
                  value={formData.auctionNumber}
                  onChange={(e) => setFormData({ ...formData, auctionNumber: e.target.value })}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Auction Winner (Eligible Members)
                </label>
                <select
                  value={formData.winningEnrollmentId}
                  onChange={(e) => setFormData({ ...formData, winningEnrollmentId: e.target.value })}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 bg-slate-50/50"
                >
                  {availableEligibleMembers.length === 0 ? (
                    <option value="">No eligible non-prized members left</option>
                  ) : (
                    availableEligibleMembers.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.customer?.fullName || e.customer?.name || "Customer"} (Ticket #{e.ticketNumber})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Bid Discount Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={formData.bidDiscountAmount}
                  onChange={(e) => setFormData({ ...formData, bidDiscountAmount: e.target.value })}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 bg-slate-50/50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-600 font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || availableEligibleMembers.length === 0}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Finalize Auction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Auctions;