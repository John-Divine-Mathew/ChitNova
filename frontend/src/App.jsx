import { ArrowRight, ShieldCheck, Users, Wallet } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
              C
            </div>

            <div>
              <h1 className="text-xl font-bold">
                ChitNova
              </h1>

              <p className="text-xs text-slate-400">
                Smart Chit Fund Management
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm text-slate-300 hover:text-white">
              Dashboard
            </a>

            <a href="#" className="text-sm text-slate-300 hover:text-white">
              Members
            </a>

            <a href="#" className="text-sm text-slate-300 hover:text-white">
              Reports
            </a>
          </div>

          <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500">
            Get Started
          </button>

        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              <ShieldCheck size={17} />
              Secure • Simple • Smart
            </div>

            <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
              Welcome to
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                ChitNova
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              A modern platform designed to simplify chit fund
              management, member tracking, payments, auctions,
              and financial reports.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-500">
                Explore ChitNova
                <ArrowRight size={18} />
              </button>

              <button className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold transition hover:bg-white/10">
                View Dashboard
              </button>

            </div>

          </div>

          {/* Feature Cards */}
          <div className="mt-20 grid gap-6 md:grid-cols-3">

            <FeatureCard
              icon={<Users size={24} />}
              title="Member Management"
              description="Manage members, groups, contributions and participation from one place."
            />

            <FeatureCard
              icon={<Wallet size={24} />}
              title="Payment Tracking"
              description="Track collections, pending payments and financial transactions easily."
            />

            <FeatureCard
              icon={<ShieldCheck size={24} />}
              title="Secure Management"
              description="Keep important chit fund information organized and protected."
            />

          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 ChitNova. Built with ❤️ by Team ChitNova.
      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10">

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default App;