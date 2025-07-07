import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getCurrentUser } from "@/services/userService";

export default function AdminInfoPage() {
  const [admin, setAdmin] = useState<any>(null);

useEffect(() => {
  const fetchAdmin = async () => {
    try {
      const data = await getCurrentUser(); // koristi backend koji koristi token
      setAdmin(data);
    } catch (err) {
      console.error("Greška prilikom dohvata admina:", err);
    }
  };

  fetchAdmin();
}, []);


  if (!admin) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <p>Učitavanje...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 uppercase text-gray-800">
          Informacije o Administratoru
        </h1>

        <div className="space-y-3 text-gray-700 text-base">
          <p><strong>Ime:</strong> {admin.first_name}</p>
          <p><strong>Prezime:</strong> {admin.last_name}</p>
          <p><strong>Adresa:</strong> {admin.address}</p>
          <p><strong>Grad:</strong> {admin.city}</p>
          <p><strong>Država:</strong> {admin.country}</p>
          <p><strong>Telefon:</strong> {admin.phone}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Korisničko ime:</strong> {admin.username}</p>
        </div>
      </main>
    </div>
  );
}
