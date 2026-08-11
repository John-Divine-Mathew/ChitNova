import {
  Users,
  WalletCards,
  Gavel,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="mb-7">

        <p className="text-sm font-semibold text-orange-600">
          ChitNova Admin ERP
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor your chit fund operations from one place.
        </p>

      </div>


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Total Customers"
          value="2,480"
          icon={<Users size={21} />}
        />

        <DashboardCard
          title="Total Collection"
          value="₹24.8 L"
          icon={<WalletCards size={21} />}
        />

        <DashboardCard
          title="Active Chit Groups"
          value="36"
          icon={<Gavel size={21} />}
        />

        <DashboardCard
          title="Monthly Growth"
          value="12.8%"
          icon={<TrendingUp size={21} />}
          success
        />

      </div>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="mt-6 grid gap-6 xl:grid-cols-3">

        {/* Collection Overview */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-bold text-slate-900">
                Collection Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monthly collection performance
              </p>

            </div>

            <button className="flex items-center gap-1 text-sm font-semibold text-orange-600">
              View Report
              <ArrowUpRight size={16} />
            </button>

          </div>


          {/* Simple chart area */}

          <div className="mt-8 flex h-64 items-end gap-3">

            {[45, 60, 50, 72, 65, 82, 70, 90, 76, 88, 94, 82].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center justify-end gap-2"
                >

                  <div
                    className="w-full rounded-t-lg bg-orange-500 transition hover:bg-orange-600"
                    style={{
                      height: `${height}%`,
                    }}
                  />

                  <span className="text-[10px] text-slate-400">
                    {index + 1}
                  </span>

                </div>
              )
            )}

          </div>

        </div>


        {/* Today's Activity */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="font-bold text-slate-900">
            Today's Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest system activity
          </p>


          <div className="mt-6 space-y-5">

            <Activity
              title="New customer registered"
              description="Arun Kumar joined CN-1001"
              time="10 min ago"
            />

            <Activity
              title="Payment received"
              description="₹25,000 installment collected"
              time="28 min ago"
            />

            <Activity
              title="KYC verified"
              description="Customer CUS002 verified"
              time="1 hour ago"
            />

            <Activity
              title="Auction completed"
              description="Chit Group CN-1005"
              time="2 hours ago"
            />

          </div>

        </div>

      </div>

    </main>
  );
}


/* =========================================
   DASHBOARD CARD
========================================= */

function DashboardCard({
  title,
  value,
  icon,
  success = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div
          className={
            success
              ? "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
              : "flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600"
          }
        >
          {icon}
        </div>

      </div>

      <p className="mt-4 text-2xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}


/* =========================================
   ACTIVITY
========================================= */

function Activity({
  title,
  description,
  time,
}) {
  return (
    <div className="flex gap-3">

      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />

      <div className="min-w-0">

        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>

        <p className="mt-1 text-[11px] text-slate-400">
          {time}
        </p>

      </div>

    </div>
  );
}