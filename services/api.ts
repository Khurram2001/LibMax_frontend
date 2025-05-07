import axios from "axios";

const SERVER_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===================== Auth =====================
export const signUp = async (data: { userName: string; email: string; password: string }) => {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data;
  } catch (error: any) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// ===================== Announcements =====================
export const createAnnouncement = async (data: { title: string; description: string }) => {
  const response = await api.post("/auth/announcements", data); // ✅ fixed path
  return response.data;
};

export const getAllAnnouncements = async () => {
  const response = await api.get("/auth/announcements"); // ✅ fixed path
  return response.data;
};

export const deleteAnnouncement = async (id: string) => {
  const response = await api.delete(`/auth/announcements/${id}`); // ✅ fixed path
  return response.data;
};

export default api;
