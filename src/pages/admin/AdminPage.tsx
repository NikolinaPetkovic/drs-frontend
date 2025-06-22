import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPage() {
  const [activeTab] = useState("main");

  const renderContent = () => {
    switch (activeTab) {
      case "main":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Odobravanje objava</h1>
            <p className="text-gray-700">
              Ovde idu objave koje čekaju odobravanje od strane administratora.
            </p>
          </div>
        );
      case "info":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Informacije o administratoru</h1>
            <p className="text-gray-700">
              Ovdje će biti prikazane informacije o nalogu administratora.
            </p>
          </div>
        );
      case "create":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Kreiranje korisnika</h1>
            <p className="text-gray-700">Forma za dodavanje novog korisnika.</p>
          </div>
        );
      case "blocked":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Blokirani korisnici</h1>
            <p className="text-gray-700">
              Lista korisnika koji su automatski blokirani zbog odbijenih objava.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">{renderContent()}</main>
    </div>
  );
}
