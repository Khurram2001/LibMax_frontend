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
  const response = await api.post("/auth/announcement", data); // ✅ fixed path
  return response.data;
};

export const getAllAnnouncements = async () => {
  const response = await api.get("/auth/show-announcement"); // ✅ fixed path
  return response.data;
};

export const deleteAnnouncement = async (id: string) => {
  const response = await api.delete(`/auth/del-announcement/${id}`); // ✅ fixed path
  return response.data;
};

// ===================== E-Books =====================

// Add E-Book (with PDF upload)
export const createEbook = async (data: { title: string; authors: string; category: string; file: any }) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("authors", data.authors);
  formData.append("category", data.category);
  console.log("Form Data:", data.file); // Log the form data for debugging
  if (data.file) {
    console.log("File Data:", data.file); // Log the file data for debugging
    formData.append("pdf", data.file);
  }

  const response = await api.post("/auth/ebook", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return response.data;
};

// Get all E-Books
export const getAllEbooks = async () => {
  const response = await api.get("/auth/get-all-e-books");
  // Handle the specific response structure from the backend
  return response.data.success ? response.data.message : [];
};

// Delete E-Book
export const deleteEbook = async (id: string) => {
  // Match the parameter name with what the backend expects
  const response = await api.delete(`/auth/del-ebook/${id}`);
  return response.data;
};

// ===================== Books =====================
export const addBook = async (data: {
  title: string;
  authors: string;
  isbn: string;
  category: string;
  publisher: string;
  publicationYear: string;
  edition?: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
}) => {
  const response = await api.post("/auth/add-book", data);
  return response.data;
};

export const getBooks = async () => {
  const response = await api.get("/auth/get-books");
  return response.data.success ? response.data.message : [];
};

export const deleteBook = async (id: string) => {
  const response = await api.delete(`/auth/del-book/${id}`);
  return response.data;
};

export const reserveBook = async (data: { bookTitle: string; userId: string }) => {
  const response = await api.post("/auth/reserve-book", data);
  return response.data;
};

export const searchBooks = async (query: string) => {
  const response = await api.get(`/auth/search-books?query=${encodeURIComponent(query)}`);
  return response.data.success ? response.data.books : [];
};

// ===================== Faculty Research Papers =====================

// Add Research Paper (with PDF upload)
export const createResearchPaper = async (data: {
  title: string;
  authors: string;
  year: string;
  subject: string;
  callNumber: string;
  accessionNumber: string;
  language: string;
  pages: number;
  publisher: string;
  doi: string;
  volumeIssue: string;
  journalName: string;
  paperType: string;
  impactFactor: number;
  sdg: string;
  category: string;
  file: any;
}) => {
  const formData = new FormData();
  
  // Add all form fields
  formData.append("title", data.title);
  formData.append("authors", data.authors);
  formData.append("year", data.year);
  formData.append("subject", data.subject);
  formData.append("callNumber", data.callNumber);
  formData.append("accessionNumber", data.accessionNumber);
  formData.append("language", data.language);
  formData.append("pages", data.pages.toString());
  formData.append("publisher", data.publisher);
  formData.append("doi", data.doi);
  formData.append("volumeIssue", data.volumeIssue);
  formData.append("journalName", data.journalName);
  formData.append("paperType", data.paperType);
  formData.append("impactFactor", data.impactFactor.toString());
  formData.append("sdg", data.sdg);
  formData.append("category", data.category);
  // Add PDF file exactly as in the createEbook function
  console.log("Form Data:", data.file); // Log the form data for debugging
  if (data.file) {
    console.log("File Data:", data.file); // Log the file data for debugging
    formData.append("pdf", data.file);
  }

  const response = await api.post("/auth/research-paper", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return response.data;
};

// Get all Research Papers
export const getResearchPapers = async () => {
  const response = await api.get("/auth/get-research-papers");
  return response.data.success ? response.data.data : [];
};

// Delete Research Paper
export const deleteResearchPaper = async (paperId: string) => {
  const response = await api.delete(`/auth/del-paper/${paperId}`);
  return response.data;
};

export default api;
