import axios from "axios";

const SERVER_BASE_URL = "http://localhost:8000/api/v1"; // Make sure your backend is running

const api = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUp = async (data: { fullName: string; email: string; password: string }) => {
  try {
    const response = await api.post("/users/signup", data);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

export default api;
