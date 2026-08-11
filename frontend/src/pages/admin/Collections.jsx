import {
  Search,
  Download,
  Wallet,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

export default function Collections() {
  const collections = [
    {
      id: "PAY10021",
      customer: "Arun Kumar",
      chit: "CN1001",
      agent: "Prakash Raj",
      amount: "₹10,000",
      date: "11 Aug 2026",
      mode: "UPI",
      status: "Paid",
    },
    {
      id: "PAY10022",
      customer: "Meena Devi",
      chit: "CN1002",
      agent: "Arun Kumar",
      amount: "₹5,000",
      date: "11 Aug 2026",
      mode: "Cash",
      status: "Paid",
    },
    {
      id: "PAY10023",
      customer: "Rahul Kumar",
      chit: "CN1003",
      agent: "Vignesh M",
      amount: "₹20,000",
      date: "11 Aug 2026",
      mode: "UPI",
      status: "Pending",
    },
    {
      id: "PAY10024",
      customer: "Priya S",
      chit: "CN1004",
      agent: "Rahul S",
      amount: "₹2,500",
      date: "10 Aug 2026",
      mode: "Bank",
      status: "Paid",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm font-semibold text-orange-600">
            Finance
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Collections
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor installment payments and collection activity.
          </p>

        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <Download size={18} />
          Export
        </button>

      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Stat
          title="Today's Collection"
          value="₹8.42 L"
          icon={<Wallet size={20} />}
        />

        <Stat
          title="Paid Transactions"
          value="386"
          icon={<CheckCircle2 size={20} />}
        />

        <Stat
          title="Pending"
          value="42"
          icon={<Clock3 size={20} />}
        />

        <Stat
          title="Overdue"
          value="18"
          icon={<AlertCircle size={20} />}
        />

      </div>


      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search payment, customer or chit..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:bg-white"
          />

        </div>

      </div>


      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Payment
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Chit
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Mode
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Status
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {collections.map((payment) => (

                <tr
                  key={payment.id}
                  className="hover:bg-slate-50"
                >

                  <td className="px-6 py-4">

                    <p className="font-semibold text-slate-800">
                      {payment.id}
                    </p>

                    <p className="text-xs text-slate-400">
                      {payment.date}
                    </p>

                  </td>

                  <td className="px-6 py-4">

                    <p className="text-sm font-medium text-slate-700">
                      {payment.customer}
                    </p>

                    <p className="text-xs text-slate-400">
                      Agent: {payment.agent}
                    </p>

                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {payment.chit}
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-slate-800">
                    {payment.amount}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {payment.mode}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={
                        payment.status === "Paid"
                          ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                          : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                      }
                    >
                      {payment.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}


function Stat({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex justify-between">

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