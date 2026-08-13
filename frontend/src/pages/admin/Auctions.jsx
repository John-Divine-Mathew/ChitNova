import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Gavel,
  Plus,
  RefreshCw,
  Search,
  Loader2,
  X,
  Trophy,
  Percent,
  CheckCircle,
} from "lucide-react";

const AUCTION_API = "http://localhost:5000/api/auctions";
const GROUP_API = "http://localhost:5000/api/chit-groups";
const ENROLLMENT_API = "http://localhost:5000/api/enrollments";

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
        axios.get(GROUP_API),
        axios.get(ENROLLMENT_API),
      ]);

      if (aucRes.data.success) setAuctions(aucRes.data.data);
      if (grpRes.data.success) setGroups(grpRes.data.data);
      if (enrRes.data.success) setEnrollments(enrRes.data.data);
    } catch (err) {
      console.error("Failed to load auction data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGroupSelect = (groupId) => {
    const groupEnrollments = enrollments.filter(
      (e) => e.chitGroup?._id === groupId && !e.hasWonAuction
    );
    
    // Find highest completed auction number for group to auto-suggest next
    const groupAuctions = auctions.filter((a) => a.chitGroup?._id === groupId);
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
    (e) => e.chitGroup?._id === formData.chitGroupId && !e.hasWonAuction
  );

  const filteredAuctions = auctions.filter((a) => {
    const custName = a.winningCustomer?.fullName?.toLowerCase() || "";
    const groupName = a.chitGroup?.groupName?.toLowerCase() || "";
    return custName.includes(searchTerm.toLowerCase()) || groupName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Chit Auctions & Bidding</h1>
          <p className="text-sm text-slate-500">Conduct monthly bidding rounds, calculate member dividends, and manage payouts.</p>
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
            <Gavel className="w-4 h-4" /> Conduct Auction
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl mb-6 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by winning customer or group name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        ) : filteredAuctions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No auctions recorded yet. Click <b>+ Conduct Auction</b> to host a round!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Round</th>
                  <th className="px-6 py-3 font-semibold">Chit Group</th>
                  <th className="px-6 py-3 font-semibold">Winner</th>
                  <th className="px-6 py-3 font-semibold">Bid Discount</th>
                  <th className="px-6 py-3 font-semibold">Net Dividend / Member</th>
                  <th className="px-6 py-3 font-semibold">Winning Payout</th>
                  <th className="px-6 py-3 font-semibold">Payout Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAuctions.map((auc) => (
                  <tr key={auc._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      Month #{auc.auctionNumber}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {auc.chitGroup?.groupName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <div>
                          <p className="font-medium text-slate-900">{auc.winningCustomer?.fullName}</p>
                          <p className="text-xs text-slate-400">Tkt #{auc.winningEnrollment?.ticketNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-rose-600 font-semibold">
                      ₹{auc.bidDiscountAmount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">
                      ₹{auc.dividendPerMember?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-bold">
                      ₹{auc.winningPayoutAmount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={auc.payoutStatus}
                        onChange={(e) => handleStatusChange(auc._id, e.target.value)}
                        className="text-xs border border-slate-200 rounded px-2 py-1 font-medium focus:outline-none focus:border-orange-500"
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
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Conduct Chit Auction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Select Chit Group</label>
                <select
                  value={formData.chitGroupId}
                  onChange={(e) => handleGroupSelect(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                >
                  {groups.map((g) => (
                    <option key={g._id} value={g._id}>{g.groupName} (₹{g.totalValue?.toLocaleString()})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Auction Round / Month #</label>
                <input
                  type="number"
                  value={formData.auctionNumber}
                  onChange={(e) => setFormData({ ...formData, auctionNumber: e.target.value })}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Auction Winner (Eligible Members)</label>
                <select
                  value={formData.winningEnrollmentId}
                  onChange={(e) => setFormData({ ...formData, winningEnrollmentId: e.target.value })}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                >
                  {availableEligibleMembers.length === 0 ? (
                    <option value="">No eligible non-prized members left</option>
                  ) : (
                    availableEligibleMembers.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.customer?.fullName} (Ticket #{e.ticketNumber})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Bid Discount Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={formData.bidDiscountAmount}
                  onChange={(e) => setFormData({ ...formData, bidDiscountAmount: e.target.value })}
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">Cancel</button>
                <button type="submit" disabled={submitting || availableEligibleMembers.length === 0} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Finalize Auction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auctions;