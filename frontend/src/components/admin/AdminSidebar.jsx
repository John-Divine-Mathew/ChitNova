import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Gavel,
  LayoutDashboard,
  Settings,
  UserPlus,
  Users,
  UserRoundCog,
  Wallet,
  X,
} from "lucide-react";

export default function AdminSidebar({
  collapsed = false,
  setCollapsed,
  mobileOpen = false,
  setMobileOpen,
}) {
  return (
    <>
      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
        />
      )}

      {/* =========================================
          SIDEBAR (FLOATING COLLAPSIBLE)
      ========================================= */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen
          border-r border-slate-200 bg-white
          transition-all duration-300 ease-in-out shadow-sm

          ${collapsed ? "w-20" : "w-64"}

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* LOGO */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-600 font-bold text-white shadow-sm">
              C
            </div>
            {!collapsed && (
              <div className="truncate">
                <p className="font-bold text-slate-900 leading-tight">ChitNova</p>
                <p className="text-[10px] font-medium text-slate-500">ADMIN ERP</p>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="h-[calc(100vh-130px)] overflow-y-auto px-3 py-5 space-y-6">
          {/* MAIN MENU */}
          <div>
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Main Menu
              </p>
            )}
            <div className="space-y-1">
              <NavItem
                icon={<LayoutDashboard size={19} />}
                label="Dashboard"
                to="/admin/dashboard"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
              <NavItem
                icon={<Users size={19} />}
                label="Customers"
                to="/admin/customers"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
              <NavItem
                icon={<UserRoundCog size={19} />}
                label="Agents"
                to="/admin/agents"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
              <NavItem
                icon={<ClipboardList size={19} />}
                label="Chit Groups"
                to="/admin/chit-groups"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
              {/* ENROLLMENTS LINK */}
              <NavItem
                icon={<UserPlus size={19} />}
                label="Enrollments"
                to="/admin/enrollments"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
              <NavItem
                icon={<Wallet size={19} />}
                label="Collections"
                to="/admin/collections"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
              <NavItem
                icon={<Gavel size={19} />}
                label="Auctions"
                to="/admin/auctions"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </div>

          {/* MANAGEMENT */}
          <div>
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Management
              </p>
            )}
            <div className="space-y-1">
              <NavItem
                icon={<BarChart3 size={19} />}
                label="Reports"
                to="/admin/reports"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
             {/*<NavItem
                icon={<FileText size={19} />}
                label="Documents"
                to="/admin/documents"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
              <NavItem
                icon={<Bell size={19} />}
                label="Notifications"
                to="/admin/notifications"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />*/}
              <NavItem
                icon={<Settings size={19} />}
                label="Settings"
                to="/admin/settings"
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </nav>

        {/* BOTTOM SECTION */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-3">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden w-full items-center justify-center rounded-lg py-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:flex"
          >
            {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon, label, to, collapsed = false, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={({ isActive }) => `
        group flex w-full items-center gap-3
        rounded-xl px-3 py-2.5
        text-sm font-medium
        transition-all duration-200

        ${
          isActive
            ? "bg-orange-50 text-orange-600 font-semibold"
            : "text-slate-600 hover:bg-slate-50 hover:text-orange-600"
        }

        ${collapsed ? "justify-center px-0" : ""}
      `}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}