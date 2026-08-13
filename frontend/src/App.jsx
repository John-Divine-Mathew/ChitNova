import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";

// Admin Pages
import Dashboard from "./pages/admin/AdminDashboard"; // or "./pages/admin/Dashboard" depending on your exact filename
import Customers from "./pages/admin/Customers";
import Agents from "./pages/admin/Agents";
import ChitGroups from "./pages/admin/ChitGroups";
import Enrollments from "./pages/admin/Enrollments";
import Collections from "./pages/admin/Collections";
import Auctions from "./pages/admin/Auctions";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          {/* Default Route redirects to Dashboard */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Other Admin Routes */}
          <Route path="customers" element={<Customers />} />
          <Route path="agents" element={<Agents />} />
          <Route path="chit-groups" element={<ChitGroups />} />
          <Route path="enrollments" element={<Enrollments />} />
          <Route path="collections" element={<Collections />} />
          <Route path="auctions" element={<Auctions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}