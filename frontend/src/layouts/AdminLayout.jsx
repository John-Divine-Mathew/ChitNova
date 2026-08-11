import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}

      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Area */}

      <div
        className={`
          min-h-screen transition-all duration-300
          ${collapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >

        {/* Navbar */}

        <AdminNavbar
          onMenuClick={() => setMobileOpen(true)}
        />

        {/* Page Content */}

        <Outlet />

      </div>

    </div>
  );
}