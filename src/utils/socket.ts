import { io } from "socket.io-client";

// Backend server URL (po potrebi iz .env fajla)
export const socket = io("http://localhost:5000");  // ako backend ide na 5000
