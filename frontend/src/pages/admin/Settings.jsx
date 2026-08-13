import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Building2,
  Bell,
  Lock,
  User,
  ShieldCheck,
  Save,
  Loader2,
  CheckCircle,
} from "lucide-react";

const API_BASE = "http://localhost:5000/api/settings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Company");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [formData, setFormData] = useState({
    companyName: "ChitNova Financial Services",
    registrationNumber: "CHIT-REG-2026-001",
    emailAddress: "admin@chitnova.com",
    phoneNumber: "+91 98765 43210",
    companyAddress: "Trichy Main Branch, Tamil Nadu, India",
    twoFactorAuth: true,
    loginNotifications: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch settings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await axios.put(API_BASE, formData);
      if (res.data.success) {
        setToastMessage("Settings updated successfully!");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-orange-600">Administration</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage company, account and system preferences.
        </p>
      </div>

      {toastMessage && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm font-medium">
          <CheckCircle size={18} className="text-emerald-600" />
          {toastMessage}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[250px_1fr]">
        {/* Settings Navigation Menu */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <SettingMenu
            icon={<Building2 size={18} />}
            label="Company"
            active={activeTab === "Company"}
            onClick={() => setActiveTab("Company")}
          />
          <SettingMenu
            icon={<User size={18} />}
            label="Profile"
            active={activeTab === "Profile"}
            onClick={() => setActiveTab("Profile")}
          />
          <SettingMenu
            icon={<Bell size={18} />}
            label="Notifications"
            active={activeTab === "Notifications"}
            onClick={() => setActiveTab("Notifications")}
          />
          <SettingMenu
            icon={<Lock size={18} />}
            label="Security"
            active={activeTab === "Security"}
            onClick={() => setActiveTab("Security")}
          />
        </div>

        {/* Dynamic Content Panel */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
              <Loader2 className="animate-spin text-orange-600" size={24} />
            </div>
          ) : (
            <form onSubmit={handleSave}>
              {activeTab === "Company" && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6">
                    <h2 className="font-bold text-slate-900">Company Information</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Update your ChitNova company details.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input
                      label="Company Name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                    <Input
                      label="Registration Number"
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    />
                    <Input
                      label="Email Address"
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                    />
                    <Input
                      label="Phone Number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Company Address
                      </label>
                      <textarea
                        rows="4"
                        value={formData.companyAddress}
                        onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-orange-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition"
                    >
                      {saving ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
                      Save Changes
                    </button>
                  </div>
                </section>
              )}

              {activeTab === "Security" && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                      <ShieldCheck size={21} />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900">Security Options</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Manage administrator security settings and access policies.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <SecurityRow
                      title="Two-factor authentication"
                      description="Add an additional layer of security to admin accounts."
                      enabled={formData.twoFactorAuth}
                      onToggle={() => setFormData({ ...formData, twoFactorAuth: !formData.twoFactorAuth })}
                    />
                    <SecurityRow
                      title="Login notifications"
                      description="Receive security emails when a new login occurs."
                      enabled={formData.loginNotifications}
                      onToggle={() => setFormData({ ...formData, loginNotifications: !formData.loginNotifications })}
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition"
                    >
                      {saving ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
                      Save Security Options
                    </button>
                  </div>
                </section>
              )}

              {(activeTab === "Profile" || activeTab === "Notifications") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-slate-500 text-sm">
                  This sub-section is active and configured to default. Adjust your main company or security parameters on the left tabs.
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

function SettingMenu({ icon, label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        mb-1 flex w-full items-center gap-3
        rounded-xl px-3 py-3
        text-sm font-medium transition
        ${active ? "bg-orange-50 text-orange-600" : "text-slate-600 hover:bg-slate-50"}
      `}
    >
      {icon}
      {label}
    </button>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-orange-500 focus:bg-white"
      />
    </div>
  );
}

function SecurityRow({ title, description, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          enabled ? "bg-orange-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
            enabled ? "right-1" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}