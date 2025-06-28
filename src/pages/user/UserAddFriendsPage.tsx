import { useState } from "react";
import { Search } from "lucide-react";

type User = {
  id: number;
  username: string;
  fullName: string;
};

export default function UserAddFriendsPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [addedFriends, setAddedFriends] = useState<number[]>([]);

  const mockUsers: User[] = [
    { id: 1, username: "ana123", fullName: "Ana Jovanović" },
    { id: 2, username: "marko22", fullName: "Marko Petrović" },
    { id: 3, username: "ivana_k", fullName: "Ivana Knežević" },
  ];

  const handleSearch = () => {
    const filtered = mockUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  const handleAddFriend = (id: number) => {
    setAddedFriends((prev) => [...prev, id]);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dodaj prijatelja</h1>
      <div className="flex gap-4 mb-8 max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pretraži po imenu ili korisničkom imenu..."
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
        {results.length > 0 ? (
          results.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 bg-white border rounded shadow-sm"
            >
              <div>
                <p className="text-lg font-medium">{user.fullName}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
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
