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
  
  export interface Book {
    id?: string; // optional
  _id: string;
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
}
  
  export type ResearchPaper = {
    id: string
    title: string
    authors: string
    year: string
    subject: string
    callNumber: string // corresponds to Diss#/CallNo
    accessionNumber: string
    language: string
    pages: number
    publisher: string
    doi: string
    volumeIssue: string // e.g., "Vol. 10, Issue 3"
    journalName: string
    paperType: string // e.g., "Journal", "Thesis", etc.
    impactFactor?: number
    sdg?: string // e.g., "SDG 9 - Industry, Innovation and Infrastructure"
    category: string
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
  
  