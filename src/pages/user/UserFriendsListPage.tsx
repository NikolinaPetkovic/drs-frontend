import { useState } from "react";

type Friend = {
  id: number;
  fullName: string;
  username: string;
};

export default function UserFriendsListPage() {
  const [friends] = useState<Friend[]>([
    { id: 1, fullName: "Ana Jovanović", username: "ana123" },
    { id: 2, fullName: "Marko Petrović", username: "marko22" },
    { id: 3, fullName: "Ivana Knežević", username: "ivana_k" },
  ]);

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
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-base">Trenutno nemate nijednog prijatelja.</p>
      )}
    </div>
  );
}
