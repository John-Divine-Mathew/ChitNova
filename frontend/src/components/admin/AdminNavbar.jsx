import {
  Bell,
  Menu,
  Search,
  UserCircle,
} from "lucide-react";

export default function AdminNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

      <div className="flex h-16 items-center justify-between px-4 sm:px-6">

        {/* Left */}

        <div className="flex items-center gap-3">

          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={21} />
          </button>


          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">

            <Search
              size={17}
              className="text-slate-400"
            />

            <input
              placeholder="Search customers, agents..."
              className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

          </div>

        </div>


        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-4">

          <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-orange-50 hover:text-orange-600">

            <Bell size={20} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-600" />

          </button>


          <div className="hidden h-7 w-px bg-slate-200 sm:block" />


          <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
              A
            </div>

            <div className="hidden text-left sm:block">

              <p className="text-sm font-semibold text-slate-900">
                Admin
              </p>

              <p className="text-[11px] text-slate-500">
                Administrator
              </p>

            </div>

            <UserCircle
              size={17}
              className="hidden text-slate-400 sm:block"
            />

          </button>

        </div>

      </div>

    </header>
  );
}