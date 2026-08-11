import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password.");
      return;
    }

    // Temporary frontend login.
    // Backend authentication will be connected later.

    navigate("/admin/dashboard");
  };


  return (
    <div className="min-h-screen bg-slate-50">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =================================
            BRAND SECTION
        ================================= */}

        <div className="hidden bg-orange-600 lg:flex">

          <div className="flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-bold text-orange-600">
                C
              </div>

              <div>

                <h1 className="text-xl font-bold text-white">
                  ChitNova
                </h1>

                <p className="text-sm text-orange-100">
                  Chit Fund ERP
                </p>

              </div>

            </div>


            {/* Content */}

            <div className="max-w-xl">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">

                <ShieldCheck size={30} />

              </div>


              <h2 className="text-4xl font-bold leading-tight text-white xl:text-5xl">

                Manage your entire chit fund business from one place.

              </h2>


              <p className="mt-6 text-lg leading-8 text-orange-100">

                Manage customers, agents, collections,
                auctions, documents and reports from
                the ChitNova Admin ERP.

              </p>


              <div className="mt-8 space-y-4">

                <Feature text="Customer & KYC Management" />

                <Feature text="Collection & Payment Monitoring" />

                <Feature text="Auction Management" />

                <Feature text="Reports & Analytics" />

              </div>

            </div>


            <p className="text-sm text-orange-100">
              © 2026 ChitNova. Admin ERP
            </p>

          </div>

        </div>


        {/* =================================
            LOGIN
        ================================= */}

        <div className="flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <div className="mb-10 flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600 font-bold text-white">
                C
              </div>

              <div>

                <h1 className="font-bold text-slate-900">
                  ChitNova
                </h1>

                <p className="text-xs text-slate-500">
                  Admin ERP
                </p>

              </div>

            </div>


            <div>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">

                <LockKeyhole size={22} />

              </div>


              <h2 className="text-3xl font-bold text-slate-900">
                Welcome back
              </h2>


              <p className="mt-2 text-slate-500">
                Sign in to access ChitNova Admin ERP.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Admin Email
                </label>


                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />


                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@chitnova.com"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                </div>

              </div>


              {/* Password */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>


                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />


                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-11 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>


              {/* Login */}

              <button
                type="submit"
                className="mt-7 w-full rounded-xl bg-orange-600 py-3.5 text-sm font-bold text-white hover:bg-orange-700"
              >
                Sign in to Admin ERP
              </button>


              {/* Security */}

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">

                <ShieldCheck
                  size={15}
                  className="text-emerald-600"
                />

                Secure administrator access

              </div>

            </form>


            <p className="mt-6 text-center text-xs text-slate-400">
              ChitNova Admin ERP • Team ChitNova
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


function Feature({ text }) {

  return (
    <div className="flex items-center gap-3">

      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white">
        ✓
      </div>

      <span className="text-sm text-orange-50">
        {text}
      </span>

    </div>
  );
}