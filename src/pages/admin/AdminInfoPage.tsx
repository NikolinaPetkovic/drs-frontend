import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminInfoPage() {
  const admin = {
    ime: "Ana",
    prezime: "Marković",
    adresa: "Ulica br. 12",
    grad: "Beograd",
    drzava: "Srbija",
    telefon: "+381 60 123 456",
    email: "ana.admin@example.com",
    korisnickoIme: "admin_ana",
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar/>
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 uppercase text-gray-800">
          Informacije o Administratoru
        </h1>

        <div className="space-y-3 text-gray-700 text-base">
          <p><strong>Ime:</strong> {admin.ime}</p>
          <p><strong>Prezime:</strong> {admin.prezime}</p>
          <p><strong>Adresa:</strong> {admin.adresa}</p>
          <p><strong>Grad:</strong> {admin.grad}</p>
          <p><strong>Država:</strong> {admin.drzava}</p>
          <p><strong>Telefon:</strong> {admin.telefon}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Korisničko ime:</strong> {admin.korisnickoIme}</p>
        </div>
      </main>
    </div>
  );
}
