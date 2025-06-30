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
