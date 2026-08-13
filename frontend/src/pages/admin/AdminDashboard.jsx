import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, UserCheck, PiggyBank, Gavel, ArrowUpRight, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeAgents: 0,
    activeChits: 0,
    totalAuctions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/dashboard/stats");
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.error("Failed to load dashboard metrics", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Welcome to ChitNova Financial Engine.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard
          title="Total Customers"
          value={loading ? "..." : stats.totalCustomers.toLocaleString()}
          icon={<Users className="w-5 h-5 text-orange-600" />}
        />
        <StatCard
          title="Active Agents"
          value={loading ? "..." : stats.activeAgents.toLocaleString()}
          icon={<UserCheck className="w-5 h-5 text-orange-600" />}
        />
        <StatCard
          title="Active Chit Groups"
          value={loading ? "..." : stats.activeChits.toLocaleString()}
          icon={<PiggyBank className="w-5 h-5 text-orange-600" />}
        />
        <StatCard
          title="Auctions Hosted"
          value={loading ? "..." : stats.totalAuctions.toLocaleString()}
          icon={<Gavel className="w-5 h-5 text-orange-600" />}
        />
      </div>

      {/* Overview Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            System Performance Overview
          </h2>
          <p className="text-sm text-slate-500">
            Navigate using the sidebar to manage Collections, Auctions, Reports, and Settings.
          </p>
        </div>
        {loading && <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
          +12% <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}