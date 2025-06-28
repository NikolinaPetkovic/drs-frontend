import api from "./api";
import type { LoginResponse } from "@/types/auth";

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", { username, password });

  return response.data;
};

export const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

