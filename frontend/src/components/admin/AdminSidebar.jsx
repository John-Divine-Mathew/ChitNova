import { NavLink } from "react-router-dom";

import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Gavel,
  LayoutDashboard,
  LogOut,
  Settings,
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
          SIDEBAR
      ========================================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen
          border-r border-slate-200
          bg-white
          transition-all duration-300

          ${collapsed ? "w-20" : "w-64"}

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* =========================================
            LOGO
        ========================================= */}

        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-3">

            {/* Logo Icon */}

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-600 font-bold text-white">
              C
            </div>

            {/* Logo Text */}

            {!collapsed && (
              <div>
                <p className="font-bold text-slate-900">
                  ChitNova
                </p>

                <p className="text-[10px] font-medium text-slate-500">
                  ADMIN ERP
                </p>
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

        {/* =========================================
            NAVIGATION
        ========================================= */}

        <nav className="h-[calc(100vh-130px)] overflow-y-auto px-3 py-5">

          {/* MAIN MENU */}

          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Main Menu
            </p>
          )}

          <div className="space-y-1">

            {/* Dashboard */}

            <NavItem
              icon={<LayoutDashboard size={19} />}
              label="Dashboard"
              to="/admin/dashboard"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />

            {/* Customers */}

            <NavItem
              icon={<Users size={19} />}
              label="Customers"
              to="/admin/customers"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />

            {/* Agents */}

            <NavItem
              icon={<UserRoundCog size={19} />}
              label="Agents"
              to="/admin/agents"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />

            {/* Chit Groups */}

            <NavItem
              icon={<ClipboardList size={19} />}
              label="Chit Groups"
              to="/admin/chit-groups"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />

            {/* Collections */}

            <NavItem
              icon={<Wallet size={19} />}
              label="Collections"
              to="/admin/collections"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />

            {/* Auctions */}

            <NavItem
              icon={<Gavel size={19} />}
              label="Auctions"
              to="/admin/auctions"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />
          </div>

          {/* =========================================
              MANAGEMENT
          ========================================= */}

          {!collapsed && (
            <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Management
            </p>
          )}

          <div className="space-y-1">

            {/* Reports */}

            <NavItem
              icon={<BarChart3 size={19} />}
              label="Reports"
              to="/admin/reports"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />

            {/* Documents */}

            <NavItem
              icon={<FileText size={19} />}
              label="Documents"
              to="/admin/documents"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />

            {/* Notifications */}

            <NavItem
              icon={<Bell size={19} />}
              label="Notifications"
              to="/admin/notifications"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />

            {/* Settings */}

            <NavItem
              icon={<Settings size={19} />}
              label="Settings"
              to="/admin/settings"
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />
          </div>
        </nav>

        {/* =========================================
            BOTTOM SECTION
        ========================================= */}

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-3">

          {/* Logout */}

          <button
            type="button"
            className="
              flex w-full items-center gap-3
              rounded-xl px-3 py-3
              text-sm font-medium
              text-slate-600
              transition
              hover:bg-rose-50
              hover:text-rose-600
            "
          >
            <LogOut size={19} />

            {!collapsed && (
              <span>
                Logout
              </span>
            )}
          </button>

          {/* Collapse Button */}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="
              mt-1 hidden w-full
              items-center justify-center
              rounded-lg py-2
              text-slate-400
              hover:bg-slate-50
              hover:text-slate-700
              lg:flex
            "
          >
            {collapsed ? (
              <ChevronRight size={17} />
            ) : (
              <ChevronLeft size={17} />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}


/* =========================================
   NAVIGATION ITEM
========================================= */

function NavItem({
  icon,
  label,
  to,
  collapsed = false,
  onClick,
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={({ isActive }) => `
        group flex w-full items-center gap-3
        rounded-xl px-3 py-3
        text-sm font-medium
        transition-all duration-200

        ${
          isActive
            ? "bg-orange-50 text-orange-600"
            : "text-slate-600 hover:bg-slate-50 hover:text-orange-600"
        }

        ${collapsed ? "justify-center" : ""}
      `}
    >
      {/* Icon */}

      <span className="shrink-0">
        {icon}
      </span>

      {/* Label */}

      {!collapsed && (
        <span className="truncate">
          {label}
        </span>
      )}
    </NavLink>
  );
}