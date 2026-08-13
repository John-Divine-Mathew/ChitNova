import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  PiggyBank,
  Gavel,
  TrendingUp,
  ArrowUpRight,
  Receipt,
  Plus,
  CheckCircle2,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeChits: 0,
    totalAuctions: 0,
    totalCollection: 0,
    recentCollections: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/reports/analytics");
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold tracking-wider text-orange-600 uppercase">
            Overview
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Admin Control Center
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time operations summary for ChitNova.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/collections"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 transition"
          >
            <Receipt size={16} /> Collect Payment
          </Link>
          <Link
            to="/admin/auctions"
            className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition"
          >
            <Plus size={16} /> New Auction
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Collections"
          value={loading ? "..." : `₹${Number(stats.totalCollection).toLocaleString("en-IN")}`}
          trend="+12.4%"
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          title="Total Customers"
          value={loading ? "..." : stats.totalCustomers}
          trend="Active Members"
          icon={<Users size={20} />}
        />
        <StatCard
          title="Active Chit Groups"
          value={loading ? "..." : stats.activeChits}
          trend="Running Pools"
          icon={<PiggyBank size={20} />}
        />
        <StatCard
          title="Total Auctions"
          value={loading ? "..." : stats.totalAuctions}
          trend="Completed"
          icon={<Gavel size={20} />}
        />
      </div>

      {/* Recent Activity Table & Navigation Cards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900">Recent Collections</h2>
              <p className="text-xs text-slate-500 mt-0.5">Latest payment transactions</p>
            </div>
            <Link
              to="/admin/reports"
              className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              View Reports <ChevronRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center p-8 text-slate-400">
                <Loader2 className="animate-spin text-orange-600" size={24} />
              </div>
            ) : stats.recentCollections.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400">
                No recent collection records found.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Chit Group</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recentCollections.map((col) => (
                    <tr key={col._id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-3 font-medium text-slate-800">
                        {col.customer?.fullName || "Member"}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {col.chitGroup?.groupName || "Group"}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        ₹{Number(col.amountPaid).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 size={12} /> Received
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Module Navigation */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Quick Modules</h2>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">Direct admin access</p>

          <div className="space-y-2">
            <QuickLink title="Customers Master" desc="KYC & details" to="/admin/customers" />
            <QuickLink title="Agents Performance" desc="Targets & tracking" to="/admin/agents" />
            <QuickLink title="Chit Schemes" desc="Groups & duration" to="/admin/chit-groups" />
            <QuickLink title="Reports & Export" desc="CSV & data logs" to="/admin/reports" />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, trend, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <div className="mt-2 flex items-center text-xs font-semibold text-emerald-600">
        <ArrowUpRight size={14} className="mr-0.5" /> {trend}
      </div>
    </div>
  );
}

function QuickLink({ title, desc, to }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 hover:bg-orange-50/50 hover:border-orange-200 transition group"
    >
      <div>
        <p className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition">
          {title}
        </p>
        <p className="text-[11px] text-slate-500">{desc}</p>
      </div>
      <ChevronRight size={16} className="text-slate-400 group-hover:text-orange-600" />
    </Link>
  );
}