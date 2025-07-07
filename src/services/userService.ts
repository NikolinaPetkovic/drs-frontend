import api from "./api";
import type { User } from "@/types/user";
import type { BlockedUser } from "@/types/user";

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<{ user: User }>(`/users/${id}`);
  return response.data.user;
};

export const createUser = async (userData: any) => {
  const response = await api.post("/users/", userData);
  return response.data;
};

export const getBlockedUsers = async (): Promise<BlockedUser[]> => {
  const response = await api.get<BlockedUser[]>("/users/blocked");
  return response.data;
};

export const unblockUser = async (id: number): Promise<void> => {
  await api.post(`/users/unblock/${id}`);
};


export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  const response = await api.put<{ user: User }>(`/users/${id}`, data);
  return response.data.user;
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<{ user: User }[]>("/users/");
  return response.data.map((item) => item.user);
};

export const searchUsers = async (query: string, userId: number): Promise<User[]> => {
  const response = await api.get<User[]>(`/users/search?q=${query}&user_id=${userId}`);
  return response.data;
};


export const sendFriendRequest = async (receiverId: number): Promise<void> => {
  await api.post(`/users/friend-request/${receiverId}`);
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

//
export const getAvailableUsers = async (userId: number): Promise<User[]> => {
  const response = await api.get<User[]>(`/users/available/${userId}`);
  return response.data;
};
