import api from "./api";

// Tip za pending friend request sa korisničkim informacijama
export type IncomingFriendRequest = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
};

export type Friend = {
  id: number;
  fullName: string;
  username: string;
};

// Dohvatanje svih friend requestova sa korisničkim informacijama
export const getAllFriendRequests = async (): Promise<IncomingFriendRequest[]> => {
  const response = await api.get<IncomingFriendRequest[]>("/friendships/friend-requests");
  return response.data;
};

// Odgovor na zahtev (prihvati ili odbij)
export const respondToFriendRequest = async (requestId: number, accept: boolean) => {
  return api.post(`/friendships/friend-request/${requestId}/respond`, { accept });
};

// Lista prijatelja ulogovanog korisnika
export const getFriends = async (): Promise<Friend[]> => {
  const response = await api.get<Friend[]>("/friendships/friends");
  return response.data;
};
