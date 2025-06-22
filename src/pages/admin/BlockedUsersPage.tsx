import AdminSidebar from "@/components/admin/AdminSidebar";

export default function BlockedUsersPage() {
  const blockedUsers = [
    {
      id: 1,
      name: "Petar Petrović",
      email: "petar@example.com",
      username: "petar123",
      reason: "Više od 3 odbijene objave",
    },
    {
      id: 2,
      name: "Mina Marković",
      email: "mina@example.com",
      username: "mina321",
      reason: "Spam objave, 4 odbijene",
    },
  ];

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
                  <td className="px-6 py-4">{user.name}</td>
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
