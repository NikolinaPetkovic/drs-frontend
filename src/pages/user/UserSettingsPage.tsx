import { useEffect, useState } from "react";
import { getUserById, updateUser } from "@/services/userService";
import type { User } from "@/types/user";

export default function UserSettingsPage() {
  const [form, setForm] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        try {
          const user = await getUserById(userId);
          setForm(user);
        } catch (error) {
          console.error("Greška pri dohvatanju korisnika:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev!, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    if (form && userId) {
      try {
        await updateUser(userId, form);
        alert("Podaci su uspešno sačuvani.");
      } catch (error) {
        alert("Greška pri čuvanju podataka.");
      }
    }
  };

  if (!form) return <p className="p-8">Učitavanje...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Podešavanja</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Ime</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Prezime</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Korisničko ime</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Adresa</label>
            <input
              type="text"
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Grad</label>
            <input
              type="text"
              name="city"
              value={form.city || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Država</label>
            <input
              type="text"
              name="country"
              value={form.country || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Telefon</label>
            <input
              type="text"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sačuvaj promene
        </button>
      </form>
    </div>
  );
}
