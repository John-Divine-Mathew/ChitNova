import {
  Building2,
  Bell,
  Lock,
  User,
  ShieldCheck,
  Save,
} from "lucide-react";

export default function Settings() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}

      <div>

        <p className="text-sm font-semibold text-orange-600">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage company, account and system preferences.
        </p>

      </div>


      <div className="mt-6 grid gap-6 lg:grid-cols-[250px_1fr]">

        {/* Settings Menu */}

        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-3">

          <SettingMenu
            icon={<Building2 size={18} />}
            label="Company"
            active
          />

          <SettingMenu
            icon={<User size={18} />}
            label="Profile"
          />

          <SettingMenu
            icon={<Bell size={18} />}
            label="Notifications"
          />

          <SettingMenu
            icon={<Lock size={18} />}
            label="Security"
          />

          <SettingMenu
            icon={<ShieldCheck size={18} />}
            label="Permissions"
          />

        </div>


        {/* Settings Content */}

        <div className="space-y-6">

          {/* Company */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="mb-6">

              <h2 className="font-bold text-slate-900">
                Company Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your ChitNova company information.
              </p>

            </div>


            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Company Name"
                value="ChitNova Financial Services"
              />

              <Input
                label="Registration Number"
                value="CHIT-REG-2026-001"
              />

              <Input
                label="Email Address"
                value="admin@chitnova.com"
              />

              <Input
                label="Phone Number"
                value="+91 98765 43210"
              />

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Company Address
                </label>

                <textarea
                  rows="4"
                  defaultValue="Trichy Main Branch, Tamil Nadu, India"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-orange-500 focus:bg-white"
                />

              </div>

            </div>


            <div className="mt-6 flex justify-end">

              <button className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700">

                <Save size={17} />

                Save Changes

              </button>

            </div>

          </section>


          {/* Security */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <ShieldCheck size={21} />
              </div>

              <div>

                <h2 className="font-bold text-slate-900">
                  Security
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage administrator security settings and access.
                </p>

              </div>

            </div>


            <div className="mt-6 space-y-4">

              <SecurityRow
                title="Two-factor authentication"
                description="Add an additional layer of security to admin accounts."
              />

              <SecurityRow
                title="Login notifications"
                description="Receive notifications when a new login occurs."
              />

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}


function SettingMenu({
  icon,
  label,
  active = false,
}) {
  return (
    <button
      className={`
        mb-1 flex w-full items-center gap-3
        rounded-xl px-3 py-3
        text-sm font-medium
        ${
          active
            ? "bg-orange-50 text-orange-600"
            : "text-slate-600 hover:bg-slate-50"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}


function Input({
  label,
  value,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        defaultValue={value}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-orange-500 focus:bg-white"
      />

    </div>
  );
}


function SecurityRow({
  title,
  description,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

      <div>

        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>

      </div>

      <button className="relative h-6 w-11 rounded-full bg-orange-600">

        <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />

      </button>

    </div>
  );
}