import { useState, useEffect } from "react";
import {
  getFriends,
  deleteFriend,
  type Friend,
} from "@/services/friendService";

export default function UserFriendsListPage() {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getFriends();
        setFriends(data);
      } catch (error) {
        console.error("Greška pri dohvatanju prijatelja:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleDelete = async (friendId: number) => {
    try {
      await deleteFriend(friendId);
      setFriends((prev) => prev.filter((f) => f.id !== friendId));
    } catch (error) {
      console.error("Greška pri brisanju prijatelja:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Prijatelji</h1>

      {friends.length > 0 ? (
        <ul className="space-y-4 max-w-2xl">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="p-4 bg-white border rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium">{friend.fullName}</p>
                <p className="text-sm text-gray-500">@{friend.username}</p>
              </div>

              <button
                onClick={() => handleDelete(friend.id)}
                className="ml-4 px-4 py-1 border text-sm rounded-md hover:bg-red-100 border-red-500 text-red-500"
              >
                Obriši
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-base">Trenutno nemate nijednog prijatelja.</p>
      )}
    </div>
  );
}
