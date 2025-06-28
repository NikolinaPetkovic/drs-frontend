import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type Post = {
  id: number;
  author: string;
  content: string;
  imageUrl?: string;
};

type User = {
  id: number;
  fullName: string;
  username: string;
  reason?: string;
};

export default function AdminPage() {
  const [activeTab] = useState("main");

  const renderContent = () => {
    switch (activeTab) {
      case "main":
        const pendingPosts: Post[] = [
          {
            id: 1,
            author: "Nikola Nikolić",
            content: "Nova objava ",
            imageUrl: "https://via.placeholder.com/400x200",
          },
          {
            id: 2,
            author: "Ivana Ilić",
            content: "Divan dan",
          },
        ];

        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Odobravanje objava</h1>
            <div className="space-y-6">
              {pendingPosts.map((post) => (
                <div key={post.id} className="p-4 bg-white rounded shadow border">
                  <p className="font-semibold">{post.author}</p>
                  <p className="mb-2">{post.content}</p>
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="Post slika"
                      className="w-full rounded border mb-2"
                    />
                  )}
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                      Odobri
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                      Odbij
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "info":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Informacije o administratoru</h1>
            <div className="space-y-3 text-base">
              <p><strong>Ime:</strong> Aleksandra Petrović</p>
              <p><strong>Email:</strong> admin@sportapp.rs</p>
              <p><strong>Korisničko ime:</strong> admin</p>
              <p><strong>Grad:</strong> Beograd</p>
              <p><strong>Telefon:</strong> +381601112223</p>
            </div>
          </div>
        );

      case "create":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Kreiranje korisnika</h1>
            <form className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Ime"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Prezime"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Korisničko ime"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="password"
                placeholder="Lozinka"
                className="w-full px-4 py-2 border rounded"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Kreiraj korisnika
              </button>
            </form>
          </div>
        );

      case "blocked":
        const blockedUsers: User[] = [
          { id: 1, fullName: "Milan Milić", username: "milan123", reason: "3 odbijene objave" },
          { id: 2, fullName: "Jovana Jović", username: "jovana_", reason: "3 odbijene objave" },
        ];

        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Blokirani korisnici</h1>
            <ul className="space-y-4 max-w-2xl">
              {blockedUsers.map((user) => (
                <li key={user.id} className="p-4 bg-white border rounded shadow flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">{user.fullName}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                    <p className="text-sm text-red-500">{user.reason}</p>
                  </div>
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Odblokiraj
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}
