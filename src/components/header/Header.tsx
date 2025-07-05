interface HeaderProps {
  showSearch?: boolean;
  userType: "admin" | "user";
}

export default function Header({ userType }: HeaderProps) {

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <h1 className="text-xl font-bold text-gray-800 uppercase">
        {userType === "admin" ? "Administrator" : "Korisnik"}
      </h1>
    </header>
  );
}
