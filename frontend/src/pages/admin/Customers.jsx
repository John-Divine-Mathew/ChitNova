import { useMemo, useState } from "react";
import {
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
  Users,
  X,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const [customers, setCustomers] = useState([
    {
      id: "CUS001",
      name: "Arun Kumar",
      phone: "+91 98765 43210",
      email: "arun@example.com",
      chitGroup: "CN-1001",
      kyc: "Verified",
      payment: "Paid",
      joined: "12 Jan 2026",
    },
    {
      id: "CUS002",
      name: "Priya S",
      phone: "+91 98765 12345",
      email: "priya@example.com",
      chitGroup: "CN-1005",
      kyc: "Verified",
      payment: "Pending",
      joined: "18 Jan 2026",
    },
    {
      id: "CUS003",
      name: "Rajesh M",
      phone: "+91 98765 99887",
      email: "rajesh@example.com",
      chitGroup: "CN-1008",
      kyc: "Pending",
      payment: "Paid",
      joined: "02 Feb 2026",
    },
    {
      id: "CUS004",
      name: "Divya R",
      phone: "+91 98432 77665",
      email: "divya@example.com",
      chitGroup: "CN-1012",
      kyc: "Verified",
      payment: "Paid",
      joined: "15 Feb 2026",
    },
    {
      id: "CUS005",
      name: "Suresh Kumar",
      phone: "+91 97910 33445",
      email: "suresh@example.com",
      chitGroup: "CN-1020",
      kyc: "Rejected",
      payment: "Pending",
      joined: "20 Feb 2026",
    },
    {
      id: "CUS006",
      name: "Meena Devi",
      phone: "+91 98840 22119",
      email: "meena@example.com",
      chitGroup: "CN-1001",
      kyc: "Verified",
      payment: "Paid",
      joined: "03 Mar 2026",
    },
  ]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.id.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search) ||
        customer.chitGroup.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        customer.kyc === status ||
        customer.payment === status;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, status]);

  const addCustomer = (newCustomer) => {
    setCustomers((previous) => [
      {
        ...newCustomer,
        id: `CUS${String(previous.length + 1).padStart(3, "0")}`,
        kyc: "Pending",
        payment: "Pending",
        joined: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      },
      ...previous,
    ]);

    setShowAddCustomer(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Users size={21} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                Customer Management
              </p>

              <h1 className="text-2xl font-bold text-slate-900">
                Customers
              </h1>
            </div>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Manage customers, KYC verification, chit membership and
            payment status.
          </p>
        </div>

        <button
          onClick={() => setShowAddCustomer(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
        >
          <Plus size={18} />

          Add Customer
        </button>

      </div>


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Customers"
          value="2,480"
          icon={<Users size={20} />}
        />

        <SummaryCard
          title="KYC Verified"
          value="2,214"
          icon={<CheckCircle2 size={20} />}
          success
        />

        <SummaryCard
          title="KYC Pending"
          value="184"
          icon={<Clock3 size={20} />}
          warning
        />

        <SummaryCard
          title="Payment Pending"
          value="82"
          icon={<AlertCircle size={20} />}
          danger
        />

      </div>


      {/* =========================================
          TABLE CARD
      ========================================= */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">

        {/* Toolbar */}

        <div className="border-b border-slate-200 p-4 sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative w-full lg:max-w-md">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer, ID, phone or chit group..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />

            </div>


            {/* Filter */}

            <div className="flex items-center gap-2">

              <Filter
                size={17}
                className="text-slate-400"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 outline-none focus:border-orange-500"
              >
                <option value="All">All Status</option>
                <option value="Verified">KYC Verified</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Paid">Payment Paid</option>
              </select>

            </div>

          </div>

        </div>


        {/* Desktop Table */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <TableHeading>
                  Customer
                </TableHeading>

                <TableHeading>
                  Contact
                </TableHeading>

                <TableHeading>
                  Chit Group
                </TableHeading>

                <TableHeading>
                  KYC
                </TableHeading>

                <TableHeading>
                  Payment
                </TableHeading>

                <TableHeading>
                  Joined
                </TableHeading>

                <TableHeading>
                  Action
                </TableHeading>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {filteredCustomers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                />
              ))}

            </tbody>

          </table>


          {filteredCustomers.length === 0 && (
            <EmptyState />
          )}

        </div>


        {/* Mobile Cards */}

        <div className="divide-y divide-slate-100 md:hidden">

          {filteredCustomers.map((customer) => (
            <MobileCustomerCard
              key={customer.id}
              customer={customer}
            />
          ))}

          {filteredCustomers.length === 0 && (
            <EmptyState />
          )}

        </div>


        {/* Footer */}

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredCustomers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {customers.length}
            </span>{" "}
            customers
          </p>

          <div className="flex gap-2">

            <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-400">
              Previous
            </button>

            <button className="rounded-lg bg-orange-600 px-3 py-2 text-xs font-semibold text-white">
              1
            </button>

            <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
              2
            </button>

            <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
              Next
            </button>

          </div>

        </div>

      </div>


      {/* =========================================
          ADD CUSTOMER MODAL
      ========================================= */}

      {showAddCustomer && (
        <AddCustomerModal
          onClose={() => setShowAddCustomer(false)}
          onSave={addCustomer}
        />
      )}

    </div>
  );
}


/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
  title,
  value,
  icon,
  success,
  warning,
  danger,
}) {
  let iconClass = "bg-orange-50 text-orange-600";

  if (success) {
    iconClass = "bg-emerald-50 text-emerald-600";
  }

  if (warning) {
    iconClass = "bg-amber-50 text-amber-600";
  }

  if (danger) {
    iconClass = "bg-rose-50 text-rose-600";
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
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


/* ============================================================
   TABLE HEADING
============================================================ */

function TableHeading({ children }) {
  return (
    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}


/* ============================================================
   CUSTOMER ROW
============================================================ */

function CustomerRow({ customer }) {
  return (
    <tr className="transition hover:bg-slate-50">

      {/* Customer */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
            {customer.name.charAt(0)}
          </div>

          <div>

            <p className="text-sm font-semibold text-slate-900">
              {customer.name}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {customer.id}
            </p>

          </div>

        </div>

      </td>


      {/* Contact */}

      <td className="px-5 py-4">

        <p className="text-sm text-slate-700">
          {customer.phone}
        </p>

        <p className="mt-0.5 text-xs text-slate-400">
          {customer.email}
        </p>

      </td>


      {/* Chit */}

      <td className="px-5 py-4">

        <span className="rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
          {customer.chitGroup}
        </span>

      </td>


      {/* KYC */}

      <td className="px-5 py-4">
        <StatusBadge status={customer.kyc} />
      </td>


      {/* Payment */}

      <td className="px-5 py-4">
        <StatusBadge status={customer.payment} />
      </td>


      {/* Joined */}

      <td className="px-5 py-4 text-sm text-slate-500">
        {customer.joined}
      </td>


      {/* Action */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-1">

          <button className="rounded-lg p-2 text-slate-400 hover:bg-orange-50 hover:text-orange-600">
            <Eye size={17} />
          </button>

          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <MoreHorizontal size={17} />
          </button>

        </div>

      </td>

    </tr>
  );
}


/* ============================================================
   MOBILE CUSTOMER CARD
============================================================ */

function MobileCustomerCard({ customer }) {
  return (
    <div className="p-5">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
            {customer.name.charAt(0)}
          </div>

          <div>

            <p className="font-semibold text-slate-900">
              {customer.name}
            </p>

            <p className="text-xs text-slate-400">
              {customer.id}
            </p>

          </div>

        </div>

        <button className="rounded-lg p-2 text-slate-400">
          <MoreHorizontal size={18} />
        </button>

      </div>


      <div className="mt-4 grid grid-cols-2 gap-3">

        <InfoItem
          label="Phone"
          value={customer.phone}
        />

        <InfoItem
          label="Chit Group"
          value={customer.chitGroup}
        />

        <div>

          <p className="text-[11px] text-slate-400">
            KYC
          </p>

          <div className="mt-1">
            <StatusBadge status={customer.kyc} />
          </div>

        </div>

        <div>

          <p className="text-[11px] text-slate-400">
            Payment
          </p>

          <div className="mt-1">
            <StatusBadge status={customer.payment} />
          </div>

        </div>

      </div>


      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-orange-600">
        <Eye size={16} />
        View Customer
      </button>

    </div>
  );
}


/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({ label, value }) {
  return (
    <div>

      <p className="text-[11px] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-700">
        {value}
      </p>

    </div>
  );
}


/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status }) {

  let className =
    "bg-slate-100 text-slate-600";

  if (status === "Verified" || status === "Paid") {
    className = "bg-emerald-100 text-emerald-700";
  }

  if (status === "Pending") {
    className = "bg-amber-100 text-amber-700";
  }

  if (status === "Rejected") {
    className = "bg-rose-100 text-rose-700";
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}
    >
      {status}
    </span>
  );
}


/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState() {
  return (
    <div className="px-5 py-16 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Users size={22} />
      </div>

      <p className="mt-4 font-semibold text-slate-700">
        No customers found
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Try changing your search or filter.
      </p>

    </div>
  );
}


/* ============================================================
   ADD CUSTOMER MODAL
============================================================ */

function AddCustomerModal({
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    chitGroup: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.chitGroup) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-5">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                <UserPlus size={18} />
              </div>

              <h2 className="font-bold text-slate-900">
                Add Customer
              </h2>

            </div>

            <p className="mt-1 text-xs text-slate-500">
              Create a new customer record.
            </p>

          </div>


          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>

        </div>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-5"
        >

          <FormInput
            label="Customer Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />

          <FormInput
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            required
          />

          <FormInput
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="customer@example.com"
          />

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Chit Group
            </label>

            <select
              name="chitGroup"
              value={form.chitGroup}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >

              <option value="">
                Select chit group
              </option>

              <option value="CN-1001">
                CN-1001 — ₹10 Lakh
              </option>

              <option value="CN-1005">
                CN-1005 — ₹5 Lakh
              </option>

              <option value="CN-1008">
                CN-1008 — ₹8 Lakh
              </option>

              <option value="CN-1012">
                CN-1012 — ₹12 Lakh
              </option>

              <option value="CN-1020">
                CN-1020 — ₹15 Lakh
              </option>

            </select>

          </div>


          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Add Customer
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


/* ============================================================
   FORM INPUT
============================================================ */

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-rose-500">
            *
          </span>
        )}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />

    </div>
  );
}