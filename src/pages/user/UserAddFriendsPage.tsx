import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  getAvailableUsers,
  sendFriendRequest,
  getBlockedUsers,
} from "@/services/userService";
import type { User } from "@/types/user";
import { getToken } from "@/services/authService";

export default function UserAddFriendsPage() {
  const [query, setQuery] = useState("");
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [addedFriends, setAddedFriends] = useState<number[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  //const [blockedUserIds, setBlockedUserIds] = useState<number[]>([]);
//promena
  // Učitaj ID ulogovanog korisnika iz JWT tokena
  useEffect(() => {
    const fetchCurrentUser = () => {
      try {
        const token = getToken();
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(payload.sub || payload.id);
      } catch (err) {
        console.error("Greška pri čitanju tokena:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  // Učitaj dostupne korisnike + blokirane korisnike
  useEffect(() => {
    if (currentUserId === null) return;

    const fetchUsers = async () => {
      try {
        const [users, blocked] = await Promise.all([
          getAvailableUsers(currentUserId),
          getBlockedUsers(),
        ]);

        const blockedIds = blocked.map((user) => user.id);
        //setBlockedUserIds(blockedIds);

        const visibleUsers = users.filter(
          (user) => !blockedIds.includes(user.id)
        );

        setOriginalUsers(visibleUsers);
        setFilteredUsers(visibleUsers); // inicijalni prikaz
      } catch (error) {
        console.error("Greška pri dohvatanju korisnika:", error);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  // Pretraga lokalno po imenu, prezimenu, username, email, adresi, gradu
  const handleSearch = () => {
    const q = query.trim().toLowerCase();

    if (!q) {
      setFilteredUsers(originalUsers);
      return;
    }

    const filtered = originalUsers.filter((user) =>
      [
        user.first_name,
        user.last_name,
        user.username,
        user.email,
        user.address,
        user.city,
      ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );

    setFilteredUsers(filtered);
  };

  // Slanje zahteva za prijateljstvo
  const handleAddFriend = async (id: number) => {
    try {
      await sendFriendRequest(id);
      setAddedFriends((prev) => [...prev, id]);
    } catch (error) {
      console.error("Greška pri slanju zahteva:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dodaj prijatelja</h1>

      <div className="flex gap-4 mb-8 max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pretraži"
          className="flex-1 px-4 py-3 text-base border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 text-base bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <Search size={20} />
          Pretraži
        </button>
      </div>

      <div className="max-w-2xl space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 bg-white border rounded shadow-sm"
            >
              <div>
                <p className="text-lg font-medium">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">
                  {user.address}, {user.city}, {user.country}
                </p>
              </div>
              <button
                onClick={() => handleAddFriend(user.id)}
                disabled={addedFriends.includes(user.id)}
                className={`px-5 py-2 text-base rounded text-white ${
                  addedFriends.includes(user.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {addedFriends.includes(user.id) ? "Poslato" : "Dodaj"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-base">Nema rezultata za prikaz.</p>
        )}
      </div>
    </div>
  );
}
