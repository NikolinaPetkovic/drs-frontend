import {
  FilePlus2,
  Users,
  UserPlus,
  MailQuestion,
  Settings,
  LogOut,
  Newspaper,
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
  { key: "feed", label: "Objave", icon: <Newspaper size={18} />, path: "/user/friends-posts" },
  { key: "requests", label: "Zahtevi", icon: <MailQuestion size={18} />, path: "/user/requests" },
  { key: "add", label: "Dodaj", icon: <UserPlus size={18} />, path: "/user/add-friends" },
  { key: "friends", label: "Prijatelji", icon: <Users size={18} />, path: "/user/friends" },
  { key: "create-post", label: "Objavi", icon: <FilePlus2 size={18} />, path: "/user/create-post" },
  { key: "my-posts", label: "Moje objave", icon: <Newspaper size={18} />, path: "/user/my-posts" },
  { key: "settings", label: "Podešavanja", icon: <Settings size={18} />, path: "/user/settings" },
  { key: "logout", label: "Odjava", icon: <LogOut size={18} />, path: "/user/logout" }, // 👈 deo tabs
];

export default function UserSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold uppercase mb-6">Korisnik</h1>
      <nav className="flex flex-col gap-4">
        {tabs.map(({ key, label, icon, path }) => {
          const isActive = location.pathname === path;
          const baseStyle = "flex items-center gap-2 text-left w-full transition-colors";

          const activeStyle =
            isActive && key === "logout"
              ? "text-red-500 font-semibold"
              : isActive
              ? "text-blue-400 font-semibold"
              : key === "logout"
              ? "hover:text-red-500"
              : "hover:text-blue-400";

          return (
            <Link key={key} to={path} className={`${baseStyle} ${activeStyle}`}>
              {icon}
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
