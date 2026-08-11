import {
  Plus,
  Search,
  Users,
  IndianRupee,
  CalendarDays,
  MoreVertical,
} from "lucide-react";

export default function ChitGroups() {
  const groups = [
    {
      id: "CN1001",
      name: "ChitNova Gold 5L",
      amount: "₹5,00,000",
      installment: "₹10,000",
      members: "42 / 50",
      duration: "50 Months",
      auction: "18 Aug 2026",
      status: "Active",
    },
    {
      id: "CN1002",
      name: "ChitNova Silver 2L",
      amount: "₹2,00,000",
      installment: "₹5,000",
      members: "36 / 40",
      duration: "40 Months",
      auction: "20 Aug 2026",
      status: "Active",
    },
    {
      id: "CN1003",
      name: "ChitNova Premium 10L",
      amount: "₹10,00,000",
      installment: "₹20,000",
      members: "50 / 50",
      duration: "50 Months",
      auction: "22 Aug 2026",
      status: "Full",
    },
    {
      id: "CN1004",
      name: "ChitNova Starter 1L",
      amount: "₹1,00,000",
      installment: "₹2,500",
      members: "18 / 40",
      duration: "40 Months",
      auction: "25 Aug 2026",
      status: "Active",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-semibold text-orange-600">
            Chit Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Chit Groups
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create and manage chit groups, members and schedules.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-700">
          <Plus size={18} />
          Create Chit Group
        </button>

      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Stat
          title="Total Groups"
          value="36"
          icon={<Users size={20} />}
        />

        <Stat
          title="Active Groups"
          value="31"
          icon={<CalendarDays size={20} />}
        />

        <Stat
          title="Total Chit Value"
          value="₹82.4 Cr"
          icon={<IndianRupee size={20} />}
        />

        <Stat
          title="Subscribers"
          value="1,684"
          icon={<Users size={20} />}
        />

      </div>


      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search chit group..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:bg-white"
          />

        </div>

      </div>


      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Chit Group
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Chit Value
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Installment
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Members
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Duration
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Next Auction
                </th>

                <th className="px-6 py-4"></th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {groups.map((group) => (

                <tr
                  key={group.id}
                  className="hover:bg-slate-50"
                >

                  <td className="px-6 py-4">

                    <p className="font-semibold text-slate-800">
                      {group.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {group.id}
                    </p>

                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                    {group.amount}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {group.installment}
                  </td>

                  <td className="px-6 py-4">

                    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                      {group.members}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {group.duration}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {group.auction}
                  </td>

                  <td className="px-6 py-4">

                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                      <MoreVertical size={18} />
                    </button>

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