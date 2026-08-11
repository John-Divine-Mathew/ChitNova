import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function Reports() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm font-semibold text-orange-600">
            Analytics
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Reports
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View business performance and generate reports.
          </p>

        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-700">
          <Download size={18} />
          Export Report
        </button>

      </div>


      {/* Summary */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <ReportCard
          title="Total Collection"
          value="₹24.8 L"
          icon={<TrendingUp size={20} />}
        />

        <ReportCard
          title="New Customers"
          value="184"
          icon={<BarChart3 size={20} />}
        />

        <ReportCard
          title="Active Chits"
          value="36"
          icon={<FileText size={20} />}
        />

        <ReportCard
          title="Growth"
          value="+12.8%"
          icon={<TrendingUp size={20} />}
        />

      </div>


      {/* Report Types */}

      <div className="mt-6">

        <h2 className="text-lg font-bold text-slate-900">
          Available Reports
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Generate reports for different business modules.
        </p>

      </div>


      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        <ReportItem
          title="Collection Report"
          description="Daily, monthly and yearly collection details."
        />

        <ReportItem
          title="Customer Report"
          description="Customer registration and account information."
        />

        <ReportItem
          title="Agent Performance"
          description="Agent collection and target performance."
        />

        <ReportItem
          title="Chit Group Report"
          description="Group members, installments and auction details."
        />

        <ReportItem
          title="Auction Report"
          description="Auction results and dividend information."
        />

        <ReportItem
          title="Outstanding Report"
          description="Pending installments and overdue accounts."
        />

      </div>

    </main>
  );
}


function ReportCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-2xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}


function ReportItem({ title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <FileSpreadsheet size={21} />
        </div>

        <div className="flex-1">

          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            {description}
          </p>

          <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700">
            <Download size={16} />
            Generate Report
          </button>

        </div>

      </div>

    </div>
  );
}