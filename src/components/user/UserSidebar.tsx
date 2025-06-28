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
  { key: "create-post", label: "Objavi", icon: <FilePlus2 size={18} />, path: "/user/create-post" },
  { key: "requests", label: "Zahtevi", icon: <MailQuestion size={18} />, path: "/user/requests" },
  { key: "add", label: "Dodaj", icon: <UserPlus size={18} />, path: "/user/add-friends" },
  { key: "feed", label: "Objave", icon: <Newspaper size={18} />, path: "/user/friends-posts" },
  { key: "friends", label: "Prijatelji", icon: <Users size={18} />, path: "/user/friends" },
  { key: "settings", label: "Podešavanja", icon: <Settings size={18} />, path: "/user/settings" },
];

export default function UserSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold uppercase mb-6">Korisnik</h1>
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
          to="/user/logout"
          className="flex items-center gap-2 text-left w-full hover:text-red-500 transition-colors"
        >
          <LogOut size={18} />
          Odjava
        </Link>
      </nav>
    </aside>
  );
}
