import api from "./api";

export type FriendRequest = {
  id: number;
  user1_id: number;
  user2_id: number;
  status: string;
  created_at: string;
};

export type Friend = {
  id: number;
  fullName: string;
  username: string;
};

export const getAllFriendRequests = async (): Promise<FriendRequest[]> => {
  const response = await api.get<{ friendship: FriendRequest }[]>("/friendships");
  return response.data.map((item) => item.friendship);
};


export const respondToFriendRequest = async (requestId: number, accept: boolean) => {
  return api.post(`/friendships/friend-request/${requestId}/respond`, { accept });

};

export const getFriends = async (): Promise<Friend[]> => {
  const response = await api.get<Friend[]>("/friendships/friends");
  return response.data;
};
