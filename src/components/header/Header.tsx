import { Search } from "lucide-react";

interface HeaderProps {
  showSearch?: boolean;
  userType: "admin" | "user";
}

export default function Header({ showSearch = false, userType }: HeaderProps) {

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <h1 className="text-xl font-bold text-gray-800 uppercase">
        {userType === "admin" ? "Administrator" : "Korisnik"}
      </h1>

      {showSearch && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={"Pretraga korisnika..."}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Search size={18} />
          </button>
        </div>
      )}
    </header>
  );
}
