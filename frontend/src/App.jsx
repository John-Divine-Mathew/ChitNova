import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Customers from "./pages/admin/Customers";

import AdminLayout from "./layouts/AdminLayout";
import Agents from "./pages/admin/Agents";
import ChitGroups from "./pages/admin/ChitGroups";
import Collections from "./pages/admin/Collections";
import Reports from "./pages/admin/Reports";
import Documents from "./pages/admin/Documents";
import Settings from "./pages/admin/Settings";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================
            PUBLIC WEBSITE
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================
            ADMIN LOGIN
        ================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =================================
            ADMIN ERP LAYOUT
        ================================= */}

        <Route element={<AdminLayout />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/customers"
            element={<Customers />}
          />
          <Route
           path="/admin/agents"
          element={<Agents />}
          />

          <Route
          path="/admin/chit-groups"
          element={<ChitGroups />}
        />

          <Route
           path="/admin/collections"
          element={<Collections />}
          />

          <Route
           path="/admin/reports"
           element={<Reports />}
          />

          <Route
           path="/admin/documents"
           element={<Documents />}
          />

          <Route
          path="/admin/settings"
          element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}