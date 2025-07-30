import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("adminToken");

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (err) {
      console.error("Gagal parse adminToken dari localStorage", err);
    }
  }

  return config;
});

export default api;
