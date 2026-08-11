import {
  Search,
  Plus,
  MoreVertical,
  Phone,
  MapPin,
  TrendingUp,
  Users,
  Wallet,
  Target,
} from "lucide-react";

export default function Agents() {
  const agents = [
    {
      id: "AGT001",
      name: "Arun Kumar",
      phone: "+91 98765 43210",
      branch: "Trichy Main",
      customers: 86,
      collection: "₹4.82 L",
      target: "92%",
      status: "Active",
    },
    {
      id: "AGT002",
      name: "Prakash Raj",
      phone: "+91 98765 12345",
      branch: "Thanjavur",
      customers: 72,
      collection: "₹3.94 L",
      target: "84%",
      status: "Active",
    },
    {
      id: "AGT003",
      name: "Vignesh M",
      phone: "+91 91234 56789",
      branch: "Srirangam",
      customers: 64,
      collection: "₹3.21 L",
      target: "76%",
      status: "Active",
    },
    {
      id: "AGT004",
      name: "Rahul S",
      phone: "+91 99887 66554",
      branch: "Woraiyur",
      customers: 48,
      collection: "₹2.76 L",
      target: "68%",
      status: "Inactive",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-semibold text-orange-600">
            Agent Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Agents
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage field agents, collections and performance.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700">
          <Plus size={18} />
          Add Agent
        </button>

      </div>


      {/* Stats */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Agents"
          value="124"
          icon={<Users size={20} />}
        />

        <StatCard
          title="Active Agents"
          value="118"
          icon={<TrendingUp size={20} />}
        />

        <StatCard
          title="Monthly Collection"
          value="₹18.6 L"
          icon={<Wallet size={20} />}
        />

        <StatCard
          title="Target Achievement"
          value="86%"
          icon={<Target size={20} />}
        />

      </div>


      {/* Search */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search agent..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:bg-white"
          />

        </div>

      </div>


      {/* Table */}

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  Agent
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  Branch
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  Customers
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  Collection
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  Target
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4"></th>
              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {agents.map((agent) => (

                <tr
                  key={agent.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600">
                        {agent.name.charAt(0)}
                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">
                          {agent.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {agent.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin size={15} />
                      {agent.branch}
                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {agent.customers}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                    {agent.collection}
                  </td>

                  <td className="px-6 py-4">

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {agent.target}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={
                        agent.status === "Active"
                          ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                          : "rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700"
                      }
                    >
                      {agent.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
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


function StatCard({ title, value, icon }) {
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