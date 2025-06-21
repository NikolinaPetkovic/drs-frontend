import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // zameni ako koristiš drugi port
  withCredentials: true, // ako koristiš cookies/token
});

export default api;
