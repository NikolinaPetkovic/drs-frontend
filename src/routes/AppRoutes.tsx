import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/admin/AdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
