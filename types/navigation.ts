export type RootStackParamList = {
    Welcome: undefined
    Login: { userType: "user" | "admin" }
    SignUp: undefined
    AdminDashboard: undefined
    UserDashboard: undefined
    FacultyResearch: undefined
    EBooks: undefined
    AboutUs: undefined
  }
  
  export type Book = {
    id: string
    title: string
    authors: string
    isbn: string
    category: string
    publisher: string
    publicationYear: string
    edition: string
    totalCopies: number
    availableCopies: number
    shelfLocation: string
  }
  
  export type ResearchPaper = {
    id: string
    title: string
    sub_title: string
    authors: string
    year: string
    pdfUrl?: string
  }
  
  export type EBook = {
    id: string
  title: string
  authors: string
  category: string
  publisher: string
  publicationYear: string
  pdfUrl: string
  }
  
  export type Announcement = {
    id: string
    title: string
    content: string
    date: string
  }
  
  