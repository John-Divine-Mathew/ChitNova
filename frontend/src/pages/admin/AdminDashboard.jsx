import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  UserCheck,
  PiggyBank,
  Gavel,
  ArrowUpRight,
  Loader2,
  RefreshCw,
  TrendingUp,
  Receipt,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

// Safe API Host Resolution for both Mobile & Laptop browsers
const getApiBaseUrl = () => {
  const envApiUrl =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    (typeof process !== "undefined" && process.env?.REACT_APP_API_URL);

  if (envApiUrl) return envApiUrl;

  const hostname = window.location.hostname || "localhost";
  return `http://${hostname}:5000`;
};

const API_BASE_URL = getApiBaseUrl();

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeAgents: 0,
    activeChits: 0,
    totalAuctions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_BASE_URL}/api/dashboard/stats`);
      if (res.data?.success) {
        setStats(res.data.data);
      } else if (res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics", err);
      setError("Unable to sync dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-slate-50 min-h-screen">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Welcome to ChitNova Financial Engine
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="w-full sm:w-auto justify-center items-center flex gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 px-3.5 py-2 rounded-lg font-medium text-xs sm:text-sm transition shadow-sm active:bg-slate-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Error Alert (If API fails) */}
      {error && (
        <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-rose-700 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchStats}
            className="font-semibold underline hover:text-rose-900 ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
        <StatCard
          title="Total Customers"
          value={loading ? "..." : (stats.totalCustomers || 0).toLocaleString()}
          icon={<Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />}
          trend="+8.4%"
        />
        <StatCard
          title="Active Agents"
          value={loading ? "..." : (stats.activeAgents || 0).toLocaleString()}
          icon={<UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />}
          trend="+3.2%"
        />
        <StatCard
          title="Active Chits"
          value={loading ? "..." : (stats.activeChits || 0).toLocaleString()}
          icon={<PiggyBank className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />}
          trend="+12%"
        />
        <StatCard
          title="Auctions Hosted"
          value={loading ? "..." : (stats.totalAuctions || 0).toLocaleString()}
          icon={<Gavel className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />}
          trend="+5.1%"
        />
      </div>

    

      {/* System Performance & Info Overview */}
      <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              System Operational Status
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Engine synced. Use sidebar navigation to access detailed Customer, Agent, and Chit Group modules.
          </p>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-xs text-orange-600 shrink-0">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Syncing...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm flex flex-col justify-between">
      {/* Top row: Title and Icon */}
      <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
        <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight truncate">
          {title}
        </span>
        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>

      {/* Bottom row: Numeric Value and Trend */}
      <div className="flex items-baseline justify-between gap-1 mt-auto">
        <span className="text-base sm:text-2xl font-bold text-slate-900 truncate">
          {value}
        </span>
        {trend && (
          <span className="text-[9px] sm:text-xs font-semibold text-emerald-600 flex items-center gap-0.5 shrink-0">
            {trend} <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </span>
        )}
      </div>
    </div>
  );
}