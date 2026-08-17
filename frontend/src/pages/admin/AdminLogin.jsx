import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // Dynamic API URL for Laptop & Mobile connections
      const backendUrl = `http://${window.location.hostname}:5000/api/auth/login`;

      const res = await axios.post(backendUrl, formData);
      const adminData = res?.data?.data || {};

      if (res?.data?.success || adminData?.token) {
        const token = adminData?.token || res?.data?.token;
        const storedAdmin = {
          name: adminData?.name || "Admin User",
          email: adminData?.email || formData.email,
          role: adminData?.role || "Administrator",
        };

        if (token) {
          localStorage.setItem("adminToken", token);
        }

        localStorage.setItem("adminUser", JSON.stringify(storedAdmin));

        navigate("/admin/dashboard");
      } else {
        setErrorMsg(res?.data?.message || "Login failed. Invalid credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to connect to server. Ensure backend is running.";

      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-sm text-slate-500 mt-1">ChitNova Financial Engine</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              placeholder="admin@chitnova.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition shadow-md text-sm mt-2 flex justify-center items-center gap-2"
          >
            {loading ? "Authenticating..." : "Sign In to ERP"}
          </button>
        </form>
      </div>
    </div>
  );
}