import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/admin/AdminPage.tsx";
import AdminInfoPage from "@/pages/admin/AdminInfoPage";
import CreateUserPage from "@/pages/admin/CreateUserPage";
import BlockedUsersPage from "@/pages/admin/BlockedUsersPage";
import LogoutPage from "@/pages/admin/LogoutPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/admin" element={<AdminDashboard />} />
       <Route path="/admin/info" element={<AdminInfoPage />} />
        <Route path="/admin/create-user" element={<CreateUserPage />} />
        <Route path="/admin/blocked-users" element={<BlockedUsersPage />} />
        <Route path="/admin/logout" element={<LogoutPage />} />
    </Routes>
  );
}
