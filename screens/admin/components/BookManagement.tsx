"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { colors, commonStyles } from "../../../styles/theme"
import CustomButton from "../../../components/CustomButton"
import CustomInput from "../../../components/CustomInput"
import CustomModal from "../../../components/CustomModal"
import ListItem from "../../../components/ListItem"
import type { Book } from "../../../types/navigation"

// Mock data
const mockBooks: Book[] = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    authors: "John Smith",
    isbn: "978-3-16-148410-0",
    category: "Computer Science",
    publisher: "Academic Press",
    publicationYear: "2020",
    edition: "3rd",
    totalCopies: 5,
    availableCopies: 3,
    shelfLocation: "CS-101",
  },
  {
    id: "2",
    title: "Advanced Mathematics for Engineers",
    authors: "Jane Doe",
    isbn: "978-1-23-456789-0",
    category: "Mathematics",
    publisher: "University Press",
    publicationYear: "2019",
    edition: "2nd",
    totalCopies: 8,
    availableCopies: 5,
    shelfLocation: "MATH-202",
  },
]

const BookManagement: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  // New book form state
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: "",
    authors: "",
    isbn: "",
    category: "",
    publisher: "",
    publicationYear: "",
    edition: "",
    totalCopies: 0,
    availableCopies: 0,
    shelfLocation: "",
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredBooks(books)
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.authors.toLowerCase().includes(query.toLowerCase()) ||
          book.isbn.includes(query),
      )
      setFilteredBooks(filtered)
    }
  }

  const handleAddBook = () => {
    // Validate form
    if (!newBook.title || !newBook.authors || !newBook.isbn) {
      // Show error
      return
    }

    const bookToAdd: Book = {
      id: Date.now().toString(), // In a real app, this would come from the backend
      title: newBook.title || "",
      authors: newBook.authors || "",
      isbn: newBook.isbn || "",
      category: newBook.category || "",
      publisher: newBook.publisher || "",
      publicationYear: newBook.publicationYear || "",
      edition: newBook.edition || "",
      totalCopies: newBook.totalCopies || 0,
      availableCopies: newBook.availableCopies || 0,
      shelfLocation: newBook.shelfLocation || "",
    }

    const updatedBooks = [...books, bookToAdd]
    setBooks(updatedBooks)
    setFilteredBooks(updatedBooks)
    setIsAddModalVisible(false)

    // Reset form
    setNewBook({
      title: "",
      authors: "",
      isbn: "",
      category: "",
      publisher: "",
      publicationYear: "",
      edition: "",
      totalCopies: 0,
      availableCopies: 0,
      shelfLocation: "",
    })
  }

  const handleDeleteBook = () => {
    if (selectedBook) {
      const updatedBooks = books.filter((book) => book.id !== selectedBook.id)
      setBooks(updatedBooks)
      setFilteredBooks(updatedBooks)
      setIsDeleteModalVisible(false)
      setSelectedBook(null)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Management</Text>

      <View style={styles.buttonContainer}>
        <CustomButton title="Add Book" onPress={() => setIsAddModalVisible(true)} style={styles.actionButton} />
        <CustomButton
          title="Delete Book"
          onPress={() => setIsDeleteModalVisible(true)}
          type="secondary"
          style={styles.actionButton}
        />
      </View>

      {/* Delete Book Section */}
      {isDeleteModalVisible && (
        <View style={styles.searchSection}>
          <CustomInput placeholder="Search by title, author, or ISBN" value={searchQuery} onChangeText={handleSearch} />

          <ScrollView style={styles.bookList}>
            {filteredBooks.map((book) => (
              <ListItem
                key={book.id}
                title={book.title}
                subtitle={`${book.authors} | ISBN: ${book.isbn}`}
                rightComponent={
                  <CustomButton
                    title="Delete"
                    onPress={() => {
                      setSelectedBook(book)
                      handleDeleteBook()
                    }}
                    type="secondary"
                    style={styles.deleteButton}
                    textStyle={styles.deleteButtonText}
                  />
                }
              />
            ))}
            {filteredBooks.length === 0 && searchQuery !== "" && <Text style={styles.noResults}>No books found</Text>}
          </ScrollView>
        </View>
      )}

      {/* Add Book Modal */}
      <CustomModal
        visible={isAddModalVisible}
        title="Add New Book"
        onClose={() => setIsAddModalVisible(false)}
        onConfirm={handleAddBook}
        confirmText="Add Book"
      >
        <ScrollView style={styles.modalContent}>
          <CustomInput
            label="Title"
            placeholder="Enter book title"
            value={newBook.title}
            onChangeText={(text) => setNewBook({ ...newBook, title: text })}
          />
          <CustomInput
            label="Author(s)"
            placeholder="Enter author names"
            value={newBook.authors}
            onChangeText={(text) => setNewBook({ ...newBook, authors: text })}
          />
          <CustomInput
            label="ISBN"
            placeholder="Enter ISBN"
            value={newBook.isbn}
            onChangeText={(text) => setNewBook({ ...newBook, isbn: text })}
          />
          <CustomInput
            label="Category/Genre"
            placeholder="Enter category or genre"
            value={newBook.category}
            onChangeText={(text) => setNewBook({ ...newBook, category: text })}
          />
          <CustomInput
            label="Publisher"
            placeholder="Enter publisher"
            value={newBook.publisher}
            onChangeText={(text) => setNewBook({ ...newBook, publisher: text })}
          />
          <CustomInput
            label="Publication Year"
            placeholder="Enter publication year"
            value={newBook.publicationYear}
            onChangeText={(text) => setNewBook({ ...newBook, publicationYear: text })}
            keyboardType="numeric"
          />
          <CustomInput
            label="Edition"
            placeholder="Enter edition"
            value={newBook.edition}
            onChangeText={(text) => setNewBook({ ...newBook, edition: text })}
          />
          <CustomInput
            label="Total Copies"
            placeholder="Enter total copies"
            value={newBook.totalCopies?.toString()}
            onChangeText={(text) => setNewBook({ ...newBook, totalCopies: Number.parseInt(text) || 0 })}
            keyboardType="numeric"
          />
          <CustomInput
            label="Available Copies"
            placeholder="Enter available copies"
            value={newBook.availableCopies?.toString()}
            onChangeText={(text) => setNewBook({ ...newBook, availableCopies: Number.parseInt(text) || 0 })}
            keyboardType="numeric"
          />
          <CustomInput
            label="Shelf Location"
            placeholder="Enter shelf location"
            value={newBook.shelfLocation}
            onChangeText={(text) => setNewBook({ ...newBook, shelfLocation: text })}
          />
        </ScrollView>
      </CustomModal>

      {/* Book List */}
      <ScrollView style={styles.bookList}>
        <Text style={styles.subtitle}>Current Books</Text>
        {books.map((book) => (
          <ListItem
            key={book.id}
            title={book.title}
            subtitle={`${book.authors} | Available: ${book.availableCopies}/${book.totalCopies}`}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...commonStyles.title,
    marginBottom: 20,
  },
  subtitle: {
    ...commonStyles.subtitle,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  searchSection: {
    marginBottom: 20,
  },
  bookList: {
    flex: 1,
  },
  deleteButton: {
    height: 30,
    width: 80,
    backgroundColor: colors.error,
  },
  deleteButtonText: {
    fontSize: 12,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    color: colors.darkGray,
  },
  modalContent: {
    maxHeight: 400,
  },
})

export default BookManagement

