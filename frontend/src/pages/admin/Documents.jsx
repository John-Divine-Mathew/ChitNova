import {
  Search,
  Upload,
  FileText,
  Eye,
  Download,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function Documents() {
  const documents = [
    {
      name: "Arun Kumar - KYC",
      type: "KYC Document",
      customer: "Arun Kumar",
      date: "11 Aug 2026",
      status: "Verified",
    },
    {
      name: "Meena Devi - Chit Agreement",
      type: "Agreement",
      customer: "Meena Devi",
      date: "10 Aug 2026",
      status: "Pending",
    },
    {
      name: "Rahul Kumar - Bank Proof",
      type: "Bank Document",
      customer: "Rahul Kumar",
      date: "09 Aug 2026",
      status: "Verified",
    },
    {
      name: "Priya S - Address Proof",
      type: "Address Proof",
      customer: "Priya S",
      date: "08 Aug 2026",
      status: "Verified",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm font-semibold text-orange-600">
            Document Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Documents
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage customer KYC, agreements and supporting documents.
          </p>

        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-700">
          <Upload size={18} />
          Upload Document
        </button>

      </div>


      {/* Stats */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <Stat
          title="Total Documents"
          value="4,824"
          icon={<FileText size={20} />}
        />

        <Stat
          title="Verified"
          value="4,516"
          icon={<CheckCircle2 size={20} />}
        />

        <Stat
          title="Pending Verification"
          value="308"
          icon={<Clock3 size={20} />}
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
            placeholder="Search documents..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:bg-white"
          />

        </div>

      </div>


      {/* Documents */}

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Document
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {documents.map((document, index) => (

                <tr
                  key={index}
                  className="hover:bg-slate-50"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                        <FileText size={19} />
                      </div>

                      <span className="text-sm font-semibold text-slate-800">
                        {document.name}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {document.type}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {document.customer}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {document.date}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={
                        document.status === "Verified"
                          ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                          : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                      }
                    >
                      {document.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-orange-600">
                        <Eye size={17} />
                      </button>

                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-orange-600">
                        <Download size={17} />
                      </button>

                    </div>

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