import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Loader2,
  Search,
  Calendar,
  Layers,
  ArrowDownToLine,
  RefreshCw,
} from "lucide-react";

const API_BASE = "http://localhost:5000/api/reports";

export default function Reports() {
  const [analytics, setAnalytics] = useState({
    totalCollection: 0,
    totalCustomers: 0,
    activeChits: 0,
    totalAuctions: 0,
  });

  const [activeReportTab, setActiveReportTab] = useState("collections");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAnalytics();
    fetchTableData(activeReportTab);
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/analytics`);
      if (res.data.success) {
        setAnalytics(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load report metrics", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (type) => {
    try {
      setTableLoading(true);
      setActiveReportTab(type);
      const res = await axios.get(`${API_BASE}/export/${type}`);
      if (res.data.success) {
        setReportData(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load report data", err);
      setReportData([]);
    } finally {
      setTableLoading(false);
    }
  };

  // Helper function to extract friendly display names from nested populated objects
  const formatCellValue = (key, val) => {
    if (!val && val !== 0) return "-";

    // Handle Object references (Populated mongoose documents)
    if (typeof val === "object") {
      if (val.fullName) return val.fullName; // Customer or Agent Name
      if (val.groupName) return val.groupName; // Chit Group Name
      if (val.name) return val.name;
      if (val.ticketNumber) return `Ticket #${val.ticketNumber}`;
      return "-";
    }

    // Format ISO Dates
    if (key.toLowerCase().includes("date") || key.toLowerCase().includes("at")) {
      const parsedDate = new Date(val);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      }
    }

    // Format Currency Amounts
    if (key.toLowerCase().includes("amount") || key.toLowerCase().includes("paid") || key.toLowerCase().includes("value")) {
      return `₹${Number(val).toLocaleString("en-IN")}`;
    }

    return String(val);
  };

  const downloadCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = Object.keys(data[0])
      .filter((k) => k !== "_id" && k !== "__v" && k !== "password")
      .join(",");

    const rows = data.map((row) =>
      Object.keys(row)
        .filter((k) => k !== "_id" && k !== "__v" && k !== "password")
        .map((k) => `"${formatCellValue(k, row[k]).replace(/"/g, '""')}"`)
        .join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered rows based on search
  const filteredData = reportData.filter((row) =>
    Object.entries(row).some(([k, v]) =>
      formatCellValue(k, v).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-xs font-bold tracking-wider text-orange-600 uppercase">
            Business Analytics
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Reports & Statements</h1>
          <p className="mt-1 text-sm text-slate-500">
            View detailed customer, group, auction, and collection records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              fetchAnalytics();
              fetchTableData(activeReportTab);
            }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 shadow-sm transition"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            onClick={() => downloadCSV(filteredData, `${activeReportTab}_report`)}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 shadow-sm transition"
          >
            <ArrowDownToLine size={18} /> Export Report
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <ReportCard
          title="Total Collection"
          value={loading ? "..." : `₹${analytics.totalCollection.toLocaleString("en-IN")}`}
          subtitle="All-time payments"
          icon={<TrendingUp size={20} />}
        />
        <ReportCard
          title="Registered Customers"
          value={loading ? "..." : analytics.totalCustomers}
          subtitle="Active members"
          icon={<BarChart3 size={20} />}
        />
        <ReportCard
          title="Active Chit Groups"
          value={loading ? "..." : analytics.activeChits}
          subtitle="Running groups"
          icon={<FileText size={20} />}
        />
        <ReportCard
          title="Completed Auctions"
          value={loading ? "..." : analytics.totalAuctions}
          subtitle="Successful rounds"
          icon={<Layers size={20} />}
        />
      </div>

      {/* Report Type Selector Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="border-b border-slate-200 bg-slate-50/50 p-2 flex flex-wrap gap-2">
          {[
            { id: "collections", label: "Collections Report" },
            { id: "customers", label: "Customer Details" },
            { id: "agents", label: "Agent Performance" },
            { id: "chit-groups", label: "Chit Groups" },
            { id: "auctions", label: "Auction Results" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => fetchTableData(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeReportTab === tab.id
                  ? "bg-orange-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="p-4 flex items-center justify-between gap-4 border-b border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={`Search by name or detail...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Interactive Data Table */}
        <div className="overflow-x-auto min-h-[300px]">
          {tableLoading ? (
            <div className="flex flex-col items-center justify-center p-16 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-2" />
              <p className="text-sm font-medium">Loading report records...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="p-16 text-center text-slate-500">
              <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No matching records found</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase font-bold tracking-wider">
                <tr>
                  {Object.keys(filteredData[0])
                    .filter((key) => key !== "_id" && key !== "__v" && key !== "password")
                    .slice(0, 7)
                    .map((header) => (
                      <th key={header} className="px-6 py-3.5">
                        {header.replace(/([A-Z])/g, " $1").trim()}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    {Object.entries(row)
                      .filter(([key]) => key !== "_id" && key !== "__v" && key !== "password")
                      .slice(0, 7)
                      .map(([key, val], cellIdx) => (
                        <td key={cellIdx} className="px-6 py-4 text-slate-700 font-medium whitespace-nowrap">
                          {formatCellValue(key, val)}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}

function ReportCard({ title, value, subtitle, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-emerald-600 font-medium">{subtitle}</p>
    </div>
  );
}