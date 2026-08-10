
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  ChevronRight,
  CreditCard,
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

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">

          {/* LOGO */}

          <a href="/" className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600 text-lg font-bold text-white shadow-sm">
              C
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                ChitNova
              </h1>

              <p className="text-[11px] font-medium text-slate-500">
                Complete Chit Fund ERP
              </p>
            </div>

          </a>


          {/* DESKTOP NAVIGATION */}

          <nav className="hidden items-center gap-8 lg:flex">

            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-orange-600"
            >
              Features
            </a>

            <a
              href="#platforms"
              className="text-sm font-medium text-slate-600 transition hover:text-orange-600"
            >
              Platforms
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-orange-600"
            >
              How It Works
            </a>

            <a
              href="#security"
              className="text-sm font-medium text-slate-600 transition hover:text-orange-600"
            >
              Security
            </a>

          </nav>


          {/* DESKTOP BUTTONS */}

          <div className="hidden items-center gap-3 sm:flex">

            <button className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
              Login
            </button>

            <button className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700">
              Get Started
            </button>

          </div>


          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>


        {/* MOBILE MENU */}

        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">

            <div className="flex flex-col gap-4">

              <a
                href="#features"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              >
                Features
              </a>

              <a
                href="#platforms"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              >
                Platforms
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              >
                How It Works
              </a>

              <a
                href="#security"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              >
                Security
              </a>

              <button className="mt-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white">
                Login
              </button>

            </div>

          </div>
        )}

      </header>


      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <main>

        <section className="relative overflow-hidden">

          {/* Background decorations */}

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-100/70 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-100/60 blur-3xl" />


          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-28">


            {/* HERO LEFT */}

            <div>

              {/* Badge */}

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">

                <ShieldCheck size={17} />

                Complete Chit Fund Management Platform

              </div>


              {/* Heading */}

              <h2 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">

                Manage your

                <span className="block text-orange-600">
                  Chit Business
                </span>

                smarter.

              </h2>


              {/* Description */}

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">

                ChitNova connects administrators, agents and
                customers through one powerful digital ecosystem
                designed to simplify every part of your chit fund
                business.

              </p>


              {/* BENEFITS */}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                <Benefit text="Admin ERP" />

                <Benefit text="Customer Mobile App" />

                <Benefit text="Agent Mobile App" />

                <Benefit text="Real-time Reports" />

              </div>


              {/* CTA */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <button className="group flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700">

                  Explore ChitNova

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />

                </button>


                <button className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600">

                  Request Demo

                </button>

              </div>


              {/* TRUST */}

              <div className="mt-9 flex items-center gap-3">

                <div className="flex -space-x-2">

                  <Avatar letter="A" />

                  <Avatar letter="M" />

                  <Avatar letter="R" />

                  <Avatar letter="S" />

                </div>

                <div>

                  <div className="flex items-center gap-1">

                    <span className="text-sm font-bold text-slate-900">
                      Built for modern teams
                    </span>

                    <CheckCircle2
                      size={15}
                      className="text-emerald-600"
                    />

                  </div>

                  <p className="text-xs text-slate-500">
                    Manage everything from one platform
                  </p>

                </div>

              </div>

            </div>


            {/* =====================================================
                HERO VISUAL
            ===================================================== */}

            <div className="relative">


              {/* Main Dashboard Preview */}

              <div className="relative rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70">

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">


                  {/* Fake Browser Header */}

                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                    <div className="flex items-center gap-2">

                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />

                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />

                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                    </div>

                    <span className="text-xs font-medium text-slate-400">
                      ChitNova ERP
                    </span>

                    <div className="w-10" />

                  </div>


                  {/* Dashboard */}

                  <div className="grid grid-cols-[65px_1fr] sm:grid-cols-[85px_1fr]">


                    {/* Mini Sidebar */}

                    <div className="border-r border-slate-200 bg-white p-3">

                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600 text-sm font-bold text-white">
                        C
                      </div>

                      <div className="mt-6 space-y-4">

                        <MiniIcon active icon={<BarChart3 size={17} />} />

                        <MiniIcon icon={<Users size={17} />} />

                        <MiniIcon icon={<Wallet size={17} />} />

                        <MiniIcon icon={<Gavel size={17} />} />

                        <MiniIcon icon={<FileText size={17} />} />

                      </div>

                    </div>


                    {/* Dashboard Content */}

                    <div className="p-4 sm:p-6">


                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-[10px] text-slate-500 sm:text-xs">
                            Dashboard
                          </p>

                          <h3 className="mt-1 text-sm font-bold text-slate-900 sm:text-lg">
                            Business Overview
                          </h3>

                        </div>

                        <div className="hidden rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600 sm:block">
                          This Month
                        </div>

                      </div>


                      {/* Stats */}

                      <div className="mt-5 grid grid-cols-2 gap-3">

                        <MiniStat
                          label="Members"
                          value="2,480"
                          growth="+12%"
                        />

                        <MiniStat
                          label="Collections"
                          value="₹24.8L"
                          growth="+8.4%"
                        />

                        <MiniStat
                          label="Pending"
                          value="₹2.4L"
                          growth="32 Due"
                        />

                        <MiniStat
                          label="Active Chits"
                          value="128"
                          growth="+6"
                        />

                      </div>


                      {/* Chart */}

                      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">

                        <div className="flex items-center justify-between">

                          <div>

                            <p className="text-[10px] text-slate-500 sm:text-xs">
                              Collection Overview
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
                              ₹24,80,000
                            </p>

                          </div>

                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-700 sm:text-xs">
                            +12.8%
                          </span>

                        </div>


                        {/* Simple Chart */}

                        <div className="mt-5 flex h-24 items-end gap-1.5 sm:h-32 sm:gap-2">

                          <ChartBar height="35%" />

                          <ChartBar height="48%" />

                          <ChartBar height="42%" />

                          <ChartBar height="65%" />

                          <ChartBar height="58%" />

                          <ChartBar height="75%" />

                          <ChartBar height="68%" />

                          <ChartBar height="90%" />

                          <ChartBar height="82%" />

                          <ChartBar height="100%" />

                        </div>

                      </div>


                      {/* Bottom row */}

                      <div className="mt-4 grid grid-cols-2 gap-3">

                        <div className="rounded-xl border border-slate-200 bg-white p-3">

                          <div className="flex items-center gap-2">

                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                              <Users size={14} />
                            </div>

                            <span className="text-[10px] text-slate-500">
                              Customers
                            </span>

                          </div>

                          <p className="mt-2 text-sm font-bold text-slate-900">
                            2,480
                          </p>

                        </div>


                        <div className="rounded-xl border border-slate-200 bg-white p-3">

                          <div className="flex items-center gap-2">

                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                              <Wallet size={14} />
                            </div>

                            <span className="text-[10px] text-slate-500">
                              Payments
                            </span>

                          </div>

                          <p className="mt-2 text-sm font-bold text-slate-900">
                            18,420
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* FLOATING CUSTOMER CARD */}

              <div className="absolute -left-7 bottom-10 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Users size={21} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-500">
                      Active Customers
                    </p>

                    <p className="text-lg font-bold text-slate-900">
                      2,480+
                    </p>

                  </div>

                </div>

              </div>


              {/* FLOATING PAYMENT CARD */}

              <div className="absolute -right-5 top-12 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={21} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-500">
                      Today's Collection
                    </p>

                    <p className="text-lg font-bold text-slate-900">
                      ₹84,500
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================================================
            TRUST / STATS
        ========================================================= */}

        <section className="border-y border-slate-200 bg-white">

          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 md:grid-cols-4">

            <Stat
              number="2,480+"
              label="Customers"
            />

            <Stat
              number="128+"
              label="Active Chit Groups"
            />

            <Stat
              number="₹24Cr+"
              label="Transactions Managed"
            />

            <Stat
              number="99.9%"
              label="Platform Reliability"
            />

          </div>

        </section>


        {/* =========================================================
            FEATURES
        ========================================================= */}

        <section
          id="features"
          className="bg-white px-5 py-24 sm:px-6"
        >

          <div className="mx-auto max-w-7xl">

            <SectionHeading
              eyebrow="POWERFUL FEATURES"
              title="Everything your chit business needs"
              description="From customer enrollment to collections, auctions and financial reporting, ChitNova brings your entire operation into one connected platform."
            />


            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              <FeatureCard
                icon={<Users size={23} />}
                title="Member Management"
                description="Manage subscribers, KYC details, nominees, documents and complete member profiles."
              />

              <FeatureCard
                icon={<Wallet size={23} />}
                title="Smart Collections"
                description="Track installments, outstanding dues, receipts and collection performance in real time."
              />

              <FeatureCard
                icon={<Gavel size={23} />}
                title="Auction Management"
                description="Schedule auctions, record winners, manage prize amounts and dividend calculations."
              />

              <FeatureCard
                icon={<BarChart3 size={23} />}
                title="Advanced Reports"
                description="Generate collection, financial, member, agent and chit performance reports."
              />

              <FeatureCard
                icon={<FileText size={23} />}
                title="Digital Documents"
                description="Store agreements, receipts, statements, certificates and important documents securely."
              />

              <FeatureCard
                icon={<BellRing size={23} />}
                title="Smart Notifications"
                description="Send payment reminders, auction alerts, announcements and important updates."
              />

            </div>

          </div>

        </section>


        {/* =========================================================
            THREE PLATFORMS
        ========================================================= */}

        <section
          id="platforms"
          className="bg-slate-50 px-5 py-24 sm:px-6"
        >

          <div className="mx-auto max-w-7xl">

            <SectionHeading
              eyebrow="ONE CONNECTED ECOSYSTEM"
              title="Three platforms. One powerful system."
              description="Every role gets the tools they need while all platforms stay connected through the centralized ChitNova API."
            />


            <div className="mt-14 grid gap-6 lg:grid-cols-3">

              <PlatformCard
                number="01"
                icon={<Monitor size={28} />}
                title="Admin ERP"
                description="Complete web-based control center for managing your entire chit fund operation."
                features={[
                  "Chit Group Management",
                  "Member & KYC Management",
                  "Payment Monitoring",
                  "Auction Management",
                  "Reports & Analytics",
                ]}
              />

              <PlatformCard
                number="02"
                icon={<Smartphone size={28} />}
                title="Customer App"
                description="A simple mobile experience for subscribers to manage their chits and payments."
                features={[
                  "My Chits",
                  "Online Payments",
                  "Auction Information",
                  "Digital Passbook",
                  "Support & Notifications",
                ]}
              />

              <PlatformCard
                number="03"
                icon={<UsersRound size={28} />}
                title="Agent App"
                description="A field collection platform designed for agents to manage customers and daily collections."
                features={[
                  "Customer Management",
                  "Daily Collections",
                  "QR Payments",
                  "Lead Management",
                  "Commission Tracking",
                ]}
              />

            </div>

          </div>

        </section>


        {/* =========================================================
            HOW IT WORKS
        ========================================================= */}

        <section
          id="how-it-works"
          className="bg-white px-5 py-24 sm:px-6"
        >

          <div className="mx-auto max-w-7xl">

            <SectionHeading
              eyebrow="HOW IT WORKS"
              title="Everything connected in four steps"
              description="ChitNova creates a simple workflow between administrators, agents and customers."
            />


            <div className="relative mt-16 grid gap-10 md:grid-cols-4">

              <Step
                number="01"
                title="Create Chit"
                text="Admin creates a chit group and defines its contribution, duration and rules."
              />

              <Step
                number="02"
                title="Enroll Members"
                text="Customers are registered, verified and assigned to their respective chit groups."
              />

              <Step
                number="03"
                title="Collect & Auction"
                text="Agents collect installments while administrators manage auctions and dividends."
              />

              <Step
                number="04"
                title="Track & Report"
                text="All activities are synchronized and available through dashboards and reports."
              />

            </div>

          </div>

        </section>


        {/* =========================================================
            SECURITY
        ========================================================= */}

        <section
          id="security"
          className="bg-slate-50 px-5 py-24 sm:px-6"
        >

          <div className="mx-auto max-w-7xl">

            <div className="grid items-center gap-14 lg:grid-cols-2">

              <div>

                <span className="text-sm font-bold uppercase tracking-wider text-orange-600">
                  Security First
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Built for secure financial operations.
                </h2>

                <p className="mt-5 max-w-xl leading-8 text-slate-600">
                  ChitNova is designed with controlled access,
                  secure authentication and centralized data
                  management at its core.
                </p>


                <div className="mt-8 space-y-5">

                  <SecurityItem
                    icon={<ShieldCheck size={20} />}
                    title="Role-Based Access"
                    text="Control access for administrators, agents and customers."
                  />

                  <SecurityItem
                    icon={<LockKeyhole size={20} />}
                    title="Secure Authentication"
                    text="JWT and OTP based authentication for protected access."
                  />

                  <SecurityItem
                    icon={<Wallet size={20} />}
                    title="Payment Protection"
                    text="Track payment activities through secure APIs."
                  />

                </div>

              </div>


              {/* Security Card */}

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Security Status
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-slate-900">
                      Protected
                    </h3>

                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">

                    <ShieldCheck size={28} />

                  </div>

                </div>


                <div className="mt-8 space-y-4">

                  <SecurityStatus
                    label="Authentication"
                  />

                  <SecurityStatus
                    label="API Security"
                  />

                  <SecurityStatus
                    label="Database Access"
                  />

                  <SecurityStatus
                    label="Role Permissions"
                  />

                </div>


                <div className="mt-7 rounded-xl bg-orange-50 p-4">

                  <p className="text-sm font-semibold text-orange-700">
                    ChitNova Security
                  </p>

                  <p className="mt-1 text-xs leading-5 text-orange-600">
                    Your business data should always remain
                    protected and accessible only to authorized users.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================================================
            FINAL CTA
        ========================================================= */}

        <section className="bg-white px-5 py-24 sm:px-6">

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-orange-600 px-7 py-14 text-center shadow-xl shadow-orange-600/20 sm:px-12">

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to modernize your chit business?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-orange-100">
              Bring your administrators, agents and customers
              together with one connected digital platform.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-orange-600 transition hover:bg-orange-50">

                Get Started

                <ArrowRight size={18} />

              </button>

              <button className="rounded-xl border border-orange-400 px-7 py-3.5 font-semibold text-white transition hover:bg-orange-700">

                Contact Us

              </button>

            </div>

          </div>

        </section>

      </main>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">

          <div className="grid gap-10 md:grid-cols-4">


            {/* BRAND */}

            <div className="md:col-span-2">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600 font-bold text-white">
                  C
                </div>

                <div>

                  <h3 className="font-bold text-slate-900">
                    ChitNova
                  </h3>

                  <p className="text-xs text-slate-500">
                    Complete Chit Fund ERP
                  </p>

                </div>

              </div>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
                A connected digital ecosystem for chit fund
                administrators, agents and customers.
              </p>

            </div>


            {/* PLATFORM */}

            <div>

              <h4 className="font-bold text-slate-900">
                Platforms
              </h4>

              <div className="mt-4 space-y-3 text-sm text-slate-600">

                <p className="flex items-center gap-2">
                  <Monitor size={15} />
                  Admin ERP
                </p>

                <p className="flex items-center gap-2">
                  <Smartphone size={15} />
                  Customer App
                </p>

                <p className="flex items-center gap-2">
                  <Smartphone size={15} />
                  Agent App
                </p>

              </div>

            </div>


            {/* COMPANY */}

            <div>

              <h4 className="font-bold text-slate-900">
                Company
              </h4>

              <div className="mt-4 space-y-3 text-sm text-slate-600">

                <p>About ChitNova</p>

                <p>Security</p>

                <p>Contact</p>

              </div>

            </div>

          </div>


          {/* COPYRIGHT */}

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-200 pt-7 text-sm text-slate-500 md:flex-row">

            <p>
              © 2026 ChitNova. All rights reserved.
            </p>

            <p>
              Built by Team ChitNova
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}


/* =============================================================
   BENEFIT
============================================================= */

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-2">

      <CheckCircle2
        size={17}
        className="text-emerald-600"
      />

      <span className="text-sm font-medium text-slate-700">
        {text}
      </span>

    </div>
  );
}


/* =============================================================
   AVATAR
============================================================= */

function Avatar({ letter }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-orange-100 text-xs font-bold text-orange-700">
      {letter}
    </div>
  );
}


/* =============================================================
   MINI SIDEBAR ICON
============================================================= */

function MiniIcon({ icon, active = false }) {
  return (
    <div
      className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg ${
        active
          ? "bg-orange-50 text-orange-600"
          : "text-slate-400"
      }`}
    >
      {icon}
    </div>
  );
}


/* =============================================================
   MINI DASHBOARD STAT
============================================================= */

function MiniStat({ label, value, growth }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">

      <p className="text-[9px] text-slate-500 sm:text-xs">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
        {value}
      </p>

      <p className="mt-1 text-[8px] font-semibold text-emerald-600 sm:text-[10px]">
        {growth}
      </p>

    </div>
  );
}


/* =============================================================
   CHART BAR
============================================================= */

function ChartBar({ height }) {
  return (
    <div
      className="flex-1 rounded-t-md bg-orange-500 transition hover:bg-orange-600"
      style={{ height }}
    />
  );
}


/* =============================================================
   STAT
============================================================= */

function Stat({ number, label }) {
  return (
    <div className="px-4 py-7 text-center">

      <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
        {number}
      </p>

      <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
        {label}
      </p>

    </div>
  );
}


/* =============================================================
   SECTION HEADING
============================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">

      <span className="text-sm font-bold uppercase tracking-wider text-orange-600">
        {eyebrow}
      </span>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>

      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>

    </div>
  );
}


/* =============================================================
   FEATURE CARD
============================================================= */

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/60">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">

        {icon}

      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>

      <button className="mt-5 flex items-center gap-1 text-sm font-semibold text-orange-600">

        Learn more

        <ChevronRight size={15} />

      </button>

    </div>
  );
}


/* =============================================================
   PLATFORM CARD
============================================================= */

function PlatformCard({
  number,
  icon,
  title,
  description,
  features,
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
          {icon}
        </div>

        <span className="text-4xl font-bold text-slate-100">
          {number}
        </span>

      </div>


      <h3 className="mt-7 text-2xl font-bold text-slate-900">
        {title}
      </h3>


      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>


      <div className="mt-6 space-y-3">

        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-sm text-slate-600"
          >

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


/* =============================================================
   HOW IT WORKS STEP
============================================================= */

function Step({
  number,
  title,
  text,
}) {
  return (
    <div className="relative text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600 text-lg font-bold text-white shadow-lg shadow-orange-600/20">
        {number}
      </div>

      <h3 className="mt-5 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>

    </div>
  );
}


/* =============================================================
   SECURITY ITEM
============================================================= */

function SecurityItem({
  icon,
  title,
  text,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
        {icon}
      </div>

      <div>

        <h3 className="font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {text}
        </p>

      </div>

    </div>
  );
}


/* =============================================================
   SECURITY STATUS
============================================================= */

function SecurityStatus({ label }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="flex items-center gap-2">

        <span className="h-2 w-2 rounded-full bg-emerald-500" />

        <span className="text-xs font-semibold text-emerald-700">
          Protected
        </span>

      </div>

    </div>
  );
}
