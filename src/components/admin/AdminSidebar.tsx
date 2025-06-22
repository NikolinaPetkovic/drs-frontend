import {
  LayoutDashboard,
  User,
  UserPlus,
  Ban,
  LogOut,
} from "lucide-react";
import type { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarTab {
  key: string;
  label: string;
  icon: JSX.Element;
  path: string;
}

const tabs: SidebarTab[] = [
  { key: "main", label: "Glavno", icon: <LayoutDashboard size={18} />, path: "/admin" },
  { key: "info", label: "Informacije o adminu", icon: <User size={18} />, path: "/admin/info" },
  { key: "create", label: "Kreiranje korisnika", icon: <UserPlus size={18} />, path: "/admin/create-user" },
  { key: "blocked", label: "Blokirani korisnici", icon: <Ban size={18} />, path: "/admin/blocked-users" },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold uppercase mb-6">Administrator</h1>
      <nav className="flex flex-col gap-4">
        {tabs.map(({ key, label, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={key}
              to={path}
              className={`flex items-center gap-2 text-left w-full transition-colors ${
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
              }`}
            >
              {icon}
              {label}
            </Link>
          );
        })}

        <Link
          to="/admin/logout"
          className="flex items-center gap-2 text-left w-full hover:text-red-500 transition-colors"
        >
          <LogOut size={18} />
          Odjava
        </Link>
      </nav>
    </aside>
  );
}
