import React from "react";
import { ArrowRight, ShieldCheck, Users, Wallet } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* Navbar */}
      <nav className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20">
              C
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                ChitNova
              </h1>

              <p className="text-xs font-medium text-slate-500">
                Smart Chit Fund Management
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">
              Dashboard
            </a>

            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">
              Members
            </a>

            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">
              Reports
            </a>
          </div>

          <button className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-600/20 transition hover:bg-orange-700">
            Get Started
          </button>

        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">

          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-800 shadow-sm">
              <ShieldCheck size={18} className="text-orange-600" />
              Secure • Simple • Smart
            </div>

            <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
              Welcome to{" "}
              <span className="block text-orange-600">
                ChitNova
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 font-normal">
              A modern platform designed to simplify chit fund management, member tracking, payments, auctions, and financial reports.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <button className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-600/25 transition hover:bg-orange-700">
                Explore ChitNova
                <ArrowRight size={18} />
              </button>

              <button className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900">
                View Dashboard
              </button>

            </div>

          </div>

          {/* Feature Cards */}
          <div className="mt-20 grid gap-8 md:grid-cols-3">

            <FeatureCard
              icon={<Users size={24} />}
              title="Member Management"
              description="Manage members, groups, contributions, and participation seamlessly from one central hub."
            />

            <FeatureCard
              icon={<Wallet size={24} />}
              title="Payment Tracking"
              description="Track monthly collections, pending payments, and financial transactions with accuracy."
            />

            <FeatureCard
              icon={<ShieldCheck size={24} />}
              title="Secure Management"
              description="Keep important chit fund information organized, transparent, and fully protected."
            />

          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8 text-center text-sm font-medium text-slate-500">
        © 2026 ChitNova. Built with ❤️ by Team ChitNova.
      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md hover:border-slate-300">

      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 border border-orange-100">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-relaxed text-slate-600 text-sm">
        {description}
      </p>

    </div>
  );
}

export default App;