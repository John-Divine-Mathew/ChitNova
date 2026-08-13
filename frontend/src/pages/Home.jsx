import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  ChevronRight,
  FileText,
  Gavel,
  LockKeyhole,
  Menu,
  Monitor,
  ShieldCheck,
  Smartphone,
  Users,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

/* =====================================================================
   PROJECT THEME TOKENS
   Canvas        bg-slate-50
   Cards         bg-white / border-slate-200
   Primary       bg-orange-600 hover:bg-orange-700
   Soft accent   bg-orange-50 / text-orange-600 / border-orange-100
   Headings      text-slate-900
   Muted text    text-slate-600 / text-slate-500
   Status        emerald (success) / amber (pending) / rose (error)
===================================================================== */

const TEAM_IMG =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&auto=format&fit=crop";
const CHART_IMG =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop";
const GOLD_BARS_IMG =
  "https://images.unsplash.com/photo-1610375461369-d613b564f4c4?w=1400&q=80&auto=format&fit=crop";

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono-tab { font-family: 'IBM Plex Mono', monospace; font-variant-numeric: tabular-nums; }
      `}</style>

      {/* =================================================================
          NAVBAR
      ================================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-base font-bold text-white shadow-sm shadow-orange-600/30">
              C
            </div>
            <div className="leading-tight">
              <h1 className="text-[17px] font-bold tracking-tight text-slate-900">ChitNova</h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Chit Fund ERP
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {["Features", "Platforms", "How It Works", "Security"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {label}
                <span className="absolute inset-x-4 -bottom-0.5 h-[2px] scale-x-0 rounded-full bg-orange-600 transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              to="/admin/login"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Login
            </Link>
            <div className="mx-1 h-6 w-px bg-slate-200" />
            <button className="group flex items-center gap-1.5 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-600/25 transition hover:bg-orange-700 hover:shadow-md hover:shadow-orange-600/25">
              Get Started
              <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
            </button>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg lg:hidden">
            <div className="flex flex-col gap-1">
              {[
                { label: "Features", icon: <BarChart3 size={17} /> },
                { label: "Platforms", icon: <Monitor size={17} /> },
                { label: "How It Works", icon: <ShieldCheck size={17} /> },
                { label: "Security", icon: <LockKeyhole size={17} /> },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  <span className="text-slate-400">{icon}</span>
                  {label}
                </a>
              ))}
              <div className="mt-3 flex gap-2 border-t border-slate-100 pt-4">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenu(false)}
                  className="flex-1 rounded-lg border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700"
                >
                  Login
                </Link>
                <button className="flex-1 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ===============================================================
            HERO — full viewport
        =============================================================== */}
        <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-slate-50">
          <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-orange-100/60 opacity-70 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-amber-100/60 opacity-70 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-14">
            {/* LEFT */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                <ShieldCheck size={15} />
                Complete Chit Fund Management Platform
              </div>

              <h2 className="font-display max-w-2xl text-5xl font-medium leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.5rem]">
                The ledger for
                <span className="block text-orange-600">every chit,</span>
                every member.
              </h2>

              <p className="mt-7 max-w-lg text-lg leading-8 text-slate-600">
                ChitNova connects administrators, agents and subscribers on one
                system — collections, auctions and payouts, tracked to the rupee,
                visible to everyone who needs to see them.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Admin ERP", "Customer app", "Agent app", "Live reporting"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={17} className="text-orange-600" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button className="group flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700">
                  Explore ChitNova
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>
                <button className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600">
                  Request a demo
                </button>
              </div>

              <div className="mt-10 flex items-center gap-3 border-t border-slate-200 pt-6">
                <div className="flex -space-x-2">
                  {["A", "M", "R", "S"].map((l) => (
                    <div
                      key={l}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-orange-600 text-xs font-bold text-white"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <p className="text-xs font-medium text-slate-500">
                  Trusted by 128+ active chit groups managing ₹24Cr+ in transactions
                </p>
              </div>
            </div>

            {/* RIGHT — signature: digital passbook stack */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <div className="absolute -inset-6 rounded-[2rem] bg-orange-100/50 opacity-70 blur-2xl" />

              {/* back card */}
              <div
                className="absolute -right-5 top-8 h-full w-full rotate-3 rounded-3xl border border-slate-200 bg-white shadow-xl"
                aria-hidden="true"
              />

              {/* passbook card */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-center justify-between bg-slate-900 px-6 py-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                      Digital Passbook
                    </p>
                    <p className="font-mono-tab mt-1 text-lg font-semibold text-white">
                      CN-2026-04812
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                    ✓
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Chit Value
                  </p>
                  <p className="font-mono-tab mt-1 text-3xl font-semibold text-slate-900">
                    ₹5,00,000
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <PassbookStat label="Instalment" value="₹10,000" />
                    <PassbookStat label="Paid" value="14/20" />
                    <PassbookStat label="Next due" value="Sep 05" />
                  </div>

                  <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[70%] rounded-full bg-orange-600" />
                  </div>
                  <p className="mt-2 text-right text-[11px] font-semibold text-slate-500">70% complete</p>

                  <div className="mt-5 flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50 p-3">
                    <div className="flex items-center gap-2">
                      <Gavel size={16} className="text-amber-700" />
                      <span className="text-xs font-semibold text-amber-700">
                        Auction #14 scheduled
                      </span>
                    </div>
                    <ChevronRight size={15} className="text-amber-700" />
                  </div>
                </div>
              </div>

              {/* floating collection badge */}
              <div className="absolute -left-8 bottom-6 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:block">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  Today's collection
                </p>
                <p className="font-mono-tab mt-1 text-xl font-bold text-slate-900">₹84,500</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            TRUST / LEDGER STATS
        =============================================================== */}
        <section className="border-y border-slate-200 bg-slate-900">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            <LedgerStat number="2,480+" label="Customers" />
            <LedgerStat number="128+" label="Active chit groups" />
            <LedgerStat number="₹24Cr+" label="Transactions managed" />
            <LedgerStat number="99.9%" label="Platform uptime" />
          </div>
        </section>

        {/* ===============================================================
            FEATURES
        =============================================================== */}
        <section id="features" className="bg-white px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Platform"
              title="Everything your chit business needs"
              description="From enrollment to auctions and financial reporting, ChitNova brings your entire operation onto one connected ledger."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard icon={<Users size={22} />} title="Member management" description="Subscriber profiles, KYC documents, nominees and group assignments in one record." />
              <FeatureCard icon={<Wallet size={22} />} title="Smart collections" description="Track instalments, outstanding dues and receipts as payments happen." />
              <FeatureCard icon={<Gavel size={22} />} title="Auction management" description="Schedule auctions, record winning bids and calculate dividends automatically." />
              <FeatureCard icon={<BarChart3 size={22} />} title="Advanced reporting" description="Collection, financial, member and agent performance, on demand." />
              <FeatureCard icon={<FileText size={22} />} title="Digital documents" description="Agreements, receipts and statements stored securely against every member." />
              <FeatureCard icon={<BellRing size={22} />} title="Smart notifications" description="Payment reminders, auction alerts and announcements, sent automatically." />
            </div>
          </div>
        </section>

        {/* ===============================================================
            PHOTO BAND — full width
        =============================================================== */}
        <section className="relative h-[420px] w-full overflow-hidden">
          <img src={TEAM_IMG} alt="Chit fund operations team reviewing collections" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/92 via-slate-900/55 to-slate-900/15" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
              <div className="max-w-lg">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-300">
                  Built for real teams
                </span>
                <h3 className="font-display mt-3 text-3xl font-medium text-white sm:text-4xl">
                  One system, run by admins, agents and members together.
                </h3>
                <p className="mt-4 leading-7 text-white/80">
                  Every collection an agent logs in the field appears on the admin
                  dashboard and the member's passbook in real time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            THREE PLATFORMS
        =============================================================== */}
        <section id="platforms" className="bg-slate-50 px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="One connected ecosystem"
              title="Three platforms. One ledger."
              description="Every role gets the tools it needs, all synchronized through the ChitNova API."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <PlatformCard
                icon={<Monitor size={26} />}
                title="Admin ERP"
                description="Complete web-based control center for running the entire chit fund operation."
                features={["Chit group management", "Member & KYC management", "Payment monitoring", "Auction management", "Reports & analytics"]}
              />
              <PlatformCard
                icon={<Smartphone size={26} />}
                title="Customer app"
                description="A simple mobile experience for subscribers to manage their chits and payments."
                features={["My chits", "Online payments", "Auction information", "Digital passbook", "Support & notifications"]}
              />
              <PlatformCard
                icon={<UsersRound size={26} />}
                title="Agent app"
                description="A field collection tool built for agents managing customers and daily collections."
                features={["Customer management", "Daily collections", "QR payments", "Lead management", "Commission tracking"]}
              />
            </div>
          </div>
        </section>

        {/* ===============================================================
            HOW IT WORKS
        =============================================================== */}
        <section id="how-it-works" className="bg-white px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="How it works"
              title="Everything connected in four steps"
              description="ChitNova creates one simple workflow between administrators, agents and customers."
            />

            <div className="relative mt-16 grid gap-10 md:grid-cols-4">
              <Step number="01" title="Create chit" text="Admin creates a chit group and defines its contribution, duration and rules." />
              <Step number="02" title="Enroll members" text="Customers are registered, verified and assigned to their chit group." />
              <Step number="03" title="Collect & auction" text="Agents collect instalments while admins manage auctions and dividends." />
              <Step number="04" title="Track & report" text="Every activity syncs to dashboards and reports, automatically." />
            </div>
          </div>
        </section>

        {/* ===============================================================
            SECURITY
        =============================================================== */}
        <section id="security" className="bg-slate-50 px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-orange-600">
                  Security first
                </span>
                <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
                  Built for secure financial operations.
                </h2>
                <p className="mt-5 max-w-xl leading-8 text-slate-600">
                  ChitNova is designed with controlled access, secure
                  authentication and centralized data management at its core.
                </p>

                <div className="mt-8 space-y-5">
                  <SecurityItem icon={<ShieldCheck size={19} />} title="Role-based access" text="Separate, scoped permissions for administrators, agents and customers." />
                  <SecurityItem icon={<LockKeyhole size={19} />} title="Secure authentication" text="JWT and OTP-based sign-in on every platform." />
                  <SecurityItem icon={<Wallet size={19} />} title="Payment protection" text="Every transaction is tracked through audited, secure APIs." />
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <img src={CHART_IMG} alt="Financial reporting dashboard on a laptop" className="h-56 w-full object-cover" />
                <div className="p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Security status</p>
                      <h3 className="mt-1 text-2xl font-bold text-slate-900">Protected</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <ShieldCheck size={24} />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <SecurityStatus label="Authentication" status="success" />
                    <SecurityStatus label="API security" status="success" />
                    <SecurityStatus label="Database access" status="pending" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            AUCTION QUOTE STRIP
        =============================================================== */}
        <section className="relative overflow-hidden py-20">
          <img src={GOLD_BARS_IMG} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/88" />
          <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Gavel size={30} className="mx-auto text-orange-400" />
            <p className="font-display mt-6 text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              "Auctions used to take us a full day to reconcile. Now the
              dividend is calculated the moment the hammer falls."
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-white/60">
              Foreman, registered chit fund company
            </p>
          </div>
        </section>

        {/* ===============================================================
            FINAL CTA
        =============================================================== */}
        <section className="bg-white px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-orange-600 px-7 py-14 text-center shadow-xl shadow-orange-600/20 sm:px-12">
            <h2 className="font-display text-3xl font-medium text-white md:text-4xl">
              Ready to modernize your chit business?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-orange-100">
              Bring your administrators, agents and customers together on one
              connected ledger.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-orange-600 transition hover:bg-orange-50">
                Get started
                <ArrowRight size={18} />
              </button>
              <button className="rounded-xl border border-orange-400 px-7 py-3.5 font-semibold text-white transition hover:bg-orange-700">
                Contact us
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =================================================================
          FOOTER
      ================================================================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 font-bold text-white">
                  C
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">ChitNova</h3>
                  <p className="text-xs text-slate-500">Complete Chit Fund ERP</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
                A connected digital ecosystem for chit fund administrators, agents
                and customers.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900">Platforms</h4>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2"><Monitor size={15} /> Admin ERP</p>
                <p className="flex items-center gap-2"><Smartphone size={15} /> Customer app</p>
                <p className="flex items-center gap-2"><Smartphone size={15} /> Agent app</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900">Company</h4>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>About ChitNova</p>
                <p>Security</p>
                <p>Contact</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-200 pt-7 text-sm text-slate-500 md:flex-row">
            <p>© 2026 ChitNova. All rights reserved.</p>
            <p>Built by Team ChitNova</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =====================================================================
   SUBCOMPONENTS
===================================================================== */

function PassbookStat({ label, value }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="font-mono-tab mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function LedgerStat({ number, label }) {
  return (
    <div className="px-4 py-8 text-center">
      <p className="font-mono-tab text-2xl font-semibold text-white sm:text-3xl">{number}</p>
      <p className="mt-1 text-xs font-medium text-white/50">{label}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
        {eyebrow}
      </span>
      <h2 className="font-display mt-3 text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
      <button className="mt-5 flex items-center gap-1 text-sm font-semibold text-orange-600">
        Learn more
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

function PlatformCard({ icon, title, description, features }) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
        {icon}
      </div>
      <h3 className="mt-7 text-2xl font-bold text-slate-900">{title}</h3>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
            {feature}
          </div>
        ))}
      </div>
      <button className="mt-7 flex items-center gap-2 text-sm font-bold text-orange-600">
        Explore platform
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="relative text-center">
      <div className="font-mono-tab mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600 text-base font-semibold text-white shadow-lg shadow-orange-600/20">
        {number}
      </div>
      <h3 className="mt-5 font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function SecurityItem({ icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function SecurityStatus({ label, status = "success" }) {
  const styles = {
    success: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    error: "bg-rose-100 text-rose-700",
  };
  const dot = {
    success: "bg-emerald-500",
    pending: "bg-amber-500",
    error: "bg-rose-500",
  };
  const text = {
    success: "Protected",
    pending: "Reviewing",
    error: "Attention",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${styles[status]}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
        <span className="text-xs font-semibold">{text[status]}</span>
      </div>
    </div>
  );
}