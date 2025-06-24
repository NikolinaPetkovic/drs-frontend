import { useEffect, useState } from "react";
import { getBlockedUsers } from "@/services/userService";
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { BlockedUser } from "@/types/user"; // ✅ import tipa

export default function BlockedUsersPage() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]); // ✅ precizan tip

  useEffect(() => {
    const fetchBlocked = async () => {
      try {
        const data = await getBlockedUsers();
        setBlockedUsers(data); // ✅ sad zna tačan tip
      } catch (err) {
        console.error("Greška pri dohvatanju blokiranih korisnika:", err);
      }
    };

    fetchBlocked();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 uppercase text-gray-800">
          Blokirani korisnici
        </h1>
        <p className="text-gray-600 mb-6">
          Lista korisnika koji su automatski blokirani zbog odbijenih objava.
        </p>

        <div className="bg-white shadow rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Ime</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Korisničko ime</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Razlog</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Akcija</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blockedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                       {user.first_name} {user.last_name}
                 </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.reason}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline">
                      Odblokiraj
                    </button>
                  </td>
                </tr>
              ))}
              {blockedUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-gray-500 italic">
                    Nema blokiranih korisnika.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
