import axios from "axios";
import { getToken } from "./authService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Dodavanje tokena ako postoji
api.interceptors.request.use((config) => {
  const token = getToken();

  // Osiguraj da headers objekat postoji
  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
