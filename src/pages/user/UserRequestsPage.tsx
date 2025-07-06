import { useEffect, useState } from "react";
import { getAllFriendRequests, respondToFriendRequest } from "@/services/friendService";

type Request = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
};

export default function UserRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllFriendRequests();
        setRequests(data);
      } catch (err) {
        console.error("Greška pri dohvaćanju zahteva:", err);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id: number) => {
    try {
      await respondToFriendRequest(id, true);
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error("Greška pri prihvatanju:", err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await respondToFriendRequest(id, false);
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error("Greška pri odbijanju:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Zahtevi za prijateljstvo</h1>

      {requests.length > 0 ? (
        <ul className="space-y-4 max-w-2xl">
          {requests.map((req) => (
            <li key={req.id} className="p-4 bg-white border rounded shadow-sm flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">{req.first_name} {req.last_name}</p>
                <p className="text-sm text-gray-500">@{req.username}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleAccept(req.id)} className="px-4 py-2 text-base bg-green-500 text-white rounded hover:bg-green-600">Prihvati</button>
                <button onClick={() => handleReject(req.id)} className="px-4 py-2 text-base bg-red-500 text-white rounded hover:bg-red-600">Odbij</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-base">Trenutno nemate zahteva.</p>
      )}
    </div>
  );
}
