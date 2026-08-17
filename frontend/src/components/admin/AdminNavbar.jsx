import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  UserCircle,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const getStoredAdmin = () => {
  try {
    const rawAdmin = localStorage.getItem("adminUser");

    if (!rawAdmin) {
      return {
        name: "Admin User",
        email: "admin@chitnova.com",
        role: "Administrator",
      };
    }

    const parsedAdmin = JSON.parse(rawAdmin);

    return {
      name: parsedAdmin?.name || "Admin User",
      email: parsedAdmin?.email || "admin@chitnova.com",
      role: parsedAdmin?.role || "Administrator",
    };
  } catch (error) {
    return {
      name: "Admin User",
      email: "admin@chitnova.com",
      role: "Administrator",
    };
  }
};

export default function AdminNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(getStoredAdmin);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    const syncAdmin = () => setAdmin(getStoredAdmin());
    syncAdmin();
    window.addEventListener("storage", syncAdmin);
    return () => window.removeEventListener("storage", syncAdmin);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      const target = event.target;
      const profileButton = document.querySelector('[aria-label="Admin profile menu"]');
      const profileMenu = document.querySelector('[data-admin-profile-menu="true"]');

      if (
        profileButton &&
        profileMenu &&
        !profileButton.contains(target) &&
        !profileMenu.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setMenuOpen(false);
    setConfirmLogout(false);
    navigate("/admin/login");
  };

  const handleLogoutRequest = () => {
    setMenuOpen(false);
    setConfirmLogout(true);
  };

  const initials = admin.name?.trim()?.charAt(0)?.toUpperCase() || "A";

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-3 sm:px-5 lg:px-6">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={onMenuClick}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 lg:hidden"
              type="button"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div className="hidden min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex md:max-w-md lg:max-w-lg">
              <Search size={17} className="text-slate-400 shrink-0" />
              <input
                placeholder="Search customers, agents..."
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-orange-50 hover:text-orange-600"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-orange-600 ring-2 ring-white" />
            </button>

            <div className="hidden h-7 w-px bg-slate-200 sm:block" />

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-1.5 py-1.5 transition hover:border-slate-300 hover:bg-slate-50"
                aria-label="Admin profile menu"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700 shadow-sm">
                  {initials}
                </div>

                <div className="hidden min-w-0 text-left sm:block">
                  <p className="truncate text-sm font-semibold text-slate-900">{admin.name}</p>
                  <p className="truncate text-[11px] text-slate-500">{admin.email}</p>
                </div>

                <ChevronDown size={16} className="hidden text-slate-400 sm:block" />
                <UserCircle size={17} className="block text-slate-400 sm:hidden" />
              </button>

              {menuOpen && (
                <div
                  data-admin-profile-menu="true"
                  className="absolute right-0 top-full z-40 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-100"
                >
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{admin.name}</p>
                        <p className="truncate text-xs text-slate-500">{admin.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-1.5">
                    <Link
                      to="/admin/settings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Settings size={16} />
                      Profile / Settings
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogoutRequest}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {confirmLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-[2px]">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <ShieldCheck size={22} />
              </div>
              <button
                type="button"
                onClick={() => setConfirmLogout(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close logout confirmation"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600">
                Confirm sign out
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">
                Are you sure you want to log out?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your current admin session will end, and you will be redirected to the login screen.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfirmLogout(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogoutConfirm}
                className="rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}