import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart3,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Loader2,
  Search,
  Layers,
  ArrowDownToLine,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

const API_BASE = `http://${window.location.hostname}:5000/api/reports`;

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
    fetchTableData("collections");
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/analytics`);
      if (res.data?.success) {
        setAnalytics(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load analytics metrics", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (type) => {
    try {
      setTableLoading(true);
      setActiveReportTab(type);
      const res = await axios.get(`${API_BASE}/export/${type}`);
      const rawData = res.data?.data || res.data || [];
      setReportData(Array.isArray(rawData) ? rawData : []);
    } catch (err) {
      console.error("Failed to load report data", err);
      setReportData([]);
    } finally {
      setTableLoading(false);
    }
  };

  // Safe nested value lookup
  const getNestedVal = (obj, path) => {
    if (!obj) return "-";
    return path.split(".").reduce((acc, part) => acc?.[part], obj) ?? "-";
  };

  // Format Date
  const formatDate = (dateVal) => {
    if (!dateVal || dateVal === "-") return "-";
    const parsed = new Date(dateVal);
    if (isNaN(parsed.getTime())) return String(dateVal);
    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format Currency
  const formatCurrency = (val) => {
    if (val === undefined || val === null || val === "-") return "₹0";
    const num = Number(val);
    return isNaN(num) ? String(val) : `₹${num.toLocaleString("en-IN")}`;
  };

  // Custom Column Maps per Tab
  const getTabColumns = (tab) => {
    switch (tab) {
      case "collections":
        return [
          { key: "receiptNumber", label: "Receipt #" },
          { key: "customer.fullName", label: "Customer" },
          { key: "chitGroup.groupName", label: "Group" },
          { key: "amountPaid", label: "Amount", isCurrency: true },
          { key: "paymentMode", label: "Mode" },
          { key: "collectedBy.fullName", label: "Agent" },
          { key: "collectionDate", label: "Date", isDate: true },
        ];
      case "customers":
        return [
          { key: "fullName", label: "Customer Name" },
          { key: "phoneNumber", label: "Phone" },
          { key: "city", label: "City / Area" },
          { key: "aadhaarNumber", label: "Aadhaar / ID" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Joined Date", isDate: true },
        ];
      case "agents":
        return [
          { key: "fullName", label: "Agent Name" },
          { key: "phoneNumber", label: "Phone" },
          { key: "assignedArea", label: "Assigned Area" },
          { key: "commissionRate", label: "Commission Rate" },
          { key: "totalCollected", label: "Total Collected", isCurrency: true },
        ];
      case "chit-groups":
        return [
          { key: "groupName", label: "Group Name" },
          { key: "totalValue", label: "Total Value", isCurrency: true },
          { key: "monthlyInstallment", label: "Monthly Dues", isCurrency: true },
          { key: "totalMonths", label: "Duration (Months)" },
          { key: "status", label: "Status" },
          { key: "startDate", label: "Start Date", isDate: true },
        ];
      case "auctions":
        return [
          { key: "chitGroup.groupName", label: "Chit Group" },
          { key: "auctionNumber", label: "Auction #" },
          { key: "winner.fullName", label: "Winner" },
          { key: "winningBidAmount", label: "Winning Bid", isCurrency: true },
          { key: "dividendPerMember", label: "Dividend/Member", isCurrency: true },
          { key: "auctionDate", label: "Auction Date", isDate: true },
        ];
      default:
        return [];
    }
  };

  const currentColumns = getTabColumns(activeReportTab);

  // Render values with proper formatting
  const renderValue = (col, row) => {
    const rawVal = getNestedVal(row, col.key);
    if (col.isCurrency) return formatCurrency(rawVal);
    if (col.isDate) return formatDate(rawVal);
    return String(rawVal);
  };

  // Filter Search Results
  const filteredData = reportData.filter((row) =>
    currentColumns.some((col) => {
      const val = renderValue(col, row);
      return val.toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  // Download CSV
  const downloadCSV = () => {
    if (!filteredData || filteredData.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = currentColumns.map((c) => c.label).join(",");
    const rows = filteredData.map((row) =>
      currentColumns
        .map((col) => `"${renderValue(col, row).replace(/"/g, '""')}"`)
        .join(",")
    );

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${activeReportTab}_report_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-100/70 p-3 sm:p-6 lg:p-8 pb-20 sm:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Reports & Statements
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Export and analyze detailed business operations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              fetchAnalytics();
              fetchTableData(activeReportTab);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition active:scale-[0.98]"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            onClick={downloadCSV}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 shadow-sm transition active:scale-[0.98]"
          >
            <ArrowDownToLine size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <ReportCard
          title="Total Collection"
          value={
            loading
              ? "..."
              : `₹${analytics.totalCollection.toLocaleString("en-IN")}`
          }
          subtitle="All-time dues"
          icon={<TrendingUp size={18} className="sm:w-5 sm:h-5" />}
        />
        <ReportCard
          title="Customers"
          value={loading ? "..." : analytics.totalCustomers}
          subtitle="Active members"
          icon={<BarChart3 size={18} className="sm:w-5 sm:h-5" />}
        />
        <ReportCard
          title="Active Chits"
          value={loading ? "..." : analytics.activeChits}
          subtitle="Running groups"
          icon={<FileText size={18} className="sm:w-5 sm:h-5" />}
        />
        <ReportCard
          title="Auctions"
          value={loading ? "..." : analytics.totalAuctions}
          subtitle="Completed rounds"
          icon={<Layers size={18} className="sm:w-5 sm:h-5" />}
        />
      </div>

      {/* Segmented Filter Tabs */}
      <div className="mb-4 overflow-x-auto pb-1 no-scrollbar">
        <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl gap-1">
          {[
            { id: "collections", label: "Collections" },
            { id: "customers", label: "Customers" },
            { id: "agents", label: "Agents" },
            { id: "chit-groups", label: "Chit Groups" },
            { id: "auctions", label: "Auctions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => fetchTableData(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 active:scale-95 ${
                activeReportTab === tab.id
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-5">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={`Search in ${activeReportTab.replace("-", " ")}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm shadow-2xs focus:outline-none focus:border-orange-500 transition"
          />
        </div>
      </div>

      {/* Content Area */}
      {tableLoading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-2" />
          <p className="text-sm font-medium text-slate-600">Loading records...</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="font-semibold text-slate-700">No records found</p>
        </div>
      ) : (
        <>
          {/* 1. Mobile Separate Spaced Cards (< md) */}
          <div className="block md:hidden space-y-3.5">
            {filteredData.map((row, idx) => {
              const primaryCol = currentColumns[0];
              const secondaryCol = currentColumns[1];
              const remainingCols = currentColumns.slice(2);

              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs transition active:bg-slate-50/50"
                >
                  {/* Card Top Title Row */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {primaryCol.label}
                      </span>
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        {renderValue(primaryCol, row)}
                      </span>
                    </div>

                    {secondaryCol && (
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {secondaryCol.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          {renderValue(secondaryCol, row)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Detailed Fields */}
                  <div className="space-y-2">
                    {remainingCols.map((col, cIdx) => {
                      const val = renderValue(col, row);
                      return (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-slate-500 font-medium">
                            {col.label}
                          </span>
                          <span
                            className={`font-semibold text-right truncate max-w-[65%] ${
                              col.isCurrency
                                ? "text-emerald-600 font-bold"
                                : col.key === "status"
                                ? "px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] uppercase font-bold"
                                : "text-slate-800"
                            }`}
                          >
                            {val}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. Desktop Structured Table (≥ md) */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/80 text-slate-600 border-b border-slate-200 text-xs uppercase font-bold tracking-wider">
                  <tr>
                    {currentColumns.map((col) => (
                      <th key={col.key} className="px-6 py-4 whitespace-nowrap">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/80 transition odd:bg-white even:bg-slate-50/30"
                    >
                      {currentColumns.map((col) => {
                        const val = renderValue(col, row);
                        return (
                          <td
                            key={col.key}
                            className={`px-6 py-4 font-medium whitespace-nowrap ${
                              col.isCurrency
                                ? "text-emerald-600 font-bold"
                                : col.key.includes("Number") ||
                                  col.key.includes("receipt")
                                ? "text-orange-600 font-mono font-bold"
                                : "text-slate-700"
                            }`}
                          >
                            {col.key === "status" ? (
                              <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold uppercase">
                                {val}
                              </span>
                            ) : (
                              val
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function ReportCard({ title, value, subtitle, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-2xs flex flex-col justify-between">
      <div className="flex items-center justify-between gap-1">
        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
          {title}
        </p>
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>
      </div>
      <div className="mt-2 sm:mt-3">
        <p className="text-lg sm:text-2xl font-bold text-slate-900 truncate">
          {value}
        </p>
        <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-emerald-600 font-medium truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
}