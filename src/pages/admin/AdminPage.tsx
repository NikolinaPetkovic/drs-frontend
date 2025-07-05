import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  getPendingPosts,
  approvePost,
  rejectPost,
  type Post,
} from "@/services/postService";
import { socket } from "@/utils/socket";

type User = {
  id: number;
  fullName: string;
  username: string;
  reason?: string;
};

export default function AdminPage() {
  const [activeTab] = useState("main");
  const [pendingPosts, setPendingPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPendingPosts();
        setPendingPosts(data);
      } catch (err) {
        console.error("Greška pri dohvatanju objava:", err);
      }
    };

    fetchPosts();

    // WebSocket setup
    socket.connect();

    socket.on("new_post_pending", (data) => {
      console.log("Nova objava stigla preko WebSocket-a:", data);

      setPendingPosts((prev) => [
        ...prev,
        {
          id: data.id,
          text: data.text,
          image: null, // ako backend ne šalje sliku
          created_at: data.created_at,
          user_id: data.user_id,
          status: "pending", // ili data.status ako ga backend šalje
          user: {
            id: data.user_id,
            first_name: "Nepoznato", // opcionalno zameni stvarnim podacima ako ih backend šalje
            last_name: "",
          },
        },
      ]);
    });

    return () => {
      socket.off("new_post_pending");
      socket.disconnect();
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "main":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Odobravanje objava</h1>
            <div className="space-y-6">
              {pendingPosts.map((post) => (
                <div key={post.id} className="p-4 bg-white rounded shadow border">
                  <p className="font-semibold">
                    {post.user
                      ? `${post.user.first_name} ${post.user.last_name}`
                      : "Nepoznat korisnik"}
                  </p>
                  <p className="mb-2">{post.text}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post slika"
                      className="w-full rounded border mb-2"
                    />
                  )}
                  <div className="flex gap-3">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={async () => {
                        try {
                          await approvePost(post.id);
                          setPendingPosts((prev) =>
                            prev.filter((p) => p.id !== post.id)
                          );
                        } catch (err) {
                          console.error("Greška pri odobravanju objave:", err);
                        }
                      }}
                    >
                      Odobri
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={async () => {
                        try {
                          await rejectPost(post.id);
                          setPendingPosts((prev) =>
                            prev.filter((p) => p.id !== post.id)
                          );
                        } catch (err) {
                          console.error("Greška pri odbijanju objave:", err);
                        }
                      }}
                    >
                      Odbij
                    </button>
                  </div>
                </div>
              ))}
              {pendingPosts.length === 0 && (
                <p className="text-gray-500 italic">Nema objava za odobravanje.</p>
              )}
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
              <input type="text" placeholder="Ime" className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Prezime" className="w-full px-4 py-2 border rounded" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Korisničko ime" className="w-full px-4 py-2 border rounded" />
              <input type="password" placeholder="Lozinka" className="w-full px-4 py-2 border rounded" />
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
