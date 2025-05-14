// "use client";

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
// import { colors, commonStyles } from "../../../styles/theme";
// import CustomButton from "../../../components/CustomButton";
// import CustomInput from "../../../components/CustomInput";
// import CustomModal from "../../../components/CustomModal";
// import ListItem from "../../../components/ListItem";
// import { addBook, deleteBook, searchBooks } from "../../../services/api";
// import type { Book } from "../../../types/navigation";

// const BookManagement: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);

//   const [newBook, setNewBook] = useState<Partial<Book>>({
//     title: "",
//     authors: "",
//     isbn: "",
//     category: "",
//     publisher: "",
//     publicationYear: "",
//     edition: "",
//     totalCopies: 0,
//     availableCopies: 0,
//     shelfLocation: "",
//   });

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const results = await searchBooks("");
//       setBooks(Array.isArray(results) ? results : []);
//       setFilteredBooks(Array.isArray(results) ? results : []);
//     } catch (err) {
//       console.error("Failed to fetch books", err);
//       setBooks([]);
//       setFilteredBooks([]);
//     }
//   };

//   const handleSearch = async (query: string) => {
//     setSearchQuery(query);
//     try {
//       const results = await searchBooks(query);
//       setFilteredBooks(Array.isArray(results) ? results : []);
//     } catch (err) {
//       console.error("Search failed", err);
//       setFilteredBooks([]);
//     }
//   };

//   const handleAddBook = async () => {
//     if (!newBook.title || !newBook.authors || !newBook.isbn) {
//       Alert.alert("Error", "Title, authors, and ISBN are required.");
//       return;
//     }

//     const bookPayload = {
//       title: newBook.title || "",
//       authors: newBook.authors || "",
//       isbn: newBook.isbn || "",
//       category: newBook.category || "",
//       publisher: newBook.publisher || "",
//       publicationYear: newBook.publicationYear || "",
//       edition: newBook.edition || "",
//       totalCopies: newBook.totalCopies || 0,
//       availableCopies: newBook.availableCopies || 0,
//       shelfLocation: newBook.shelfLocation || "",
//     };

//     try {
//       await addBook(bookPayload);
//       setIsAddModalVisible(false);
//       setNewBook({
//         title: "",
//         authors: "",
//         isbn: "",
//         category: "",
//         publisher: "",
//         publicationYear: "",
//         edition: "",
//         totalCopies: 0,
//         availableCopies: 0,
//         shelfLocation: "",
//       });
//       fetchBooks();
//     } catch (error) {
//       Alert.alert("Error", "Failed to add book.");
//       console.error("Add Book Error:", error);
//     }
//   };

//   const handleDeleteBook = async (isbn: string) => {
//     try {
//       await deleteBook(isbn);
//       fetchBooks();
//     } catch (error) {
//       Alert.alert("Error", "Failed to delete book.");
//       console.error("Delete Book Error:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Book Management</Text>

//       <View style={styles.buttonContainer}>
//         <CustomButton
//           title="Add Book"
//           onPress={() => setIsAddModalVisible(true)}
//           style={styles.actionButton}
//         />
//         <CustomButton
//           title="Delete Book"
//           onPress={() => setIsDeleteModalVisible(true)}
//           type="secondary"
//           style={styles.actionButton}
//         />
//       </View>

//       {isDeleteModalVisible && (
//         <View style={styles.searchSection}>
//           <CustomInput
//             placeholder="Search by title, author, or ISBN"
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//           <ScrollView style={styles.bookList}>
//             {(filteredBooks || []).map((book) => (
//               <ListItem
//                 key={book.isbn}
//                 title={book.title}
//                 subtitle={`${book.authors} | ISBN: ${book.isbn}`}
//                 rightComponent={
//                   <CustomButton
//                     title="Delete"
//                     onPress={() => handleDeleteBook(book.isbn)}
//                     type="secondary"
//                     style={styles.deleteButton}
//                     textStyle={styles.deleteButtonText}
//                   />
//                 }
//               />
//             ))}
//             {filteredBooks.length === 0 && searchQuery !== "" && (
//               <Text style={styles.noResults}>No books found</Text>
//             )}
//           </ScrollView>
//         </View>
//       )}

//       {/* Add Book Modal */}
//       <CustomModal
//         visible={isAddModalVisible}
//         title="Add New Book"
//         onClose={() => setIsAddModalVisible(false)}
//         onConfirm={handleAddBook}
//         confirmText="Add Book"
//       >
//         <ScrollView style={styles.modalContent}>
//           <CustomInput
//             label="Title"
//             placeholder="Enter book title"
//             value={newBook.title}
//             onChangeText={(text) => setNewBook({ ...newBook, title: text })}
//           />
//           <CustomInput
//             label="Author(s)"
//             placeholder="Enter author names"
//             value={newBook.authors}
//             onChangeText={(text) => setNewBook({ ...newBook, authors: text })}
//           />
//           <CustomInput
//             label="ISBN"
//             placeholder="Enter ISBN"
//             value={newBook.isbn}
//             onChangeText={(text) => setNewBook({ ...newBook, isbn: text })}
//           />
//           <CustomInput
//             label="Category/Genre"
//             placeholder="Enter category or genre"
//             value={newBook.category}
//             onChangeText={(text) => setNewBook({ ...newBook, category: text })}
//           />
//           <CustomInput
//             label="Publisher"
//             placeholder="Enter publisher"
//             value={newBook.publisher}
//             onChangeText={(text) => setNewBook({ ...newBook, publisher: text })}
//           />
//           <CustomInput
//             label="Publication Year"
//             placeholder="Enter publication year"
//             value={newBook.publicationYear}
//             onChangeText={(text) => setNewBook({ ...newBook, publicationYear: text })}
//             keyboardType="numeric"
//           />
//           <CustomInput
//             label="Edition"
//             placeholder="Enter edition"
//             value={newBook.edition}
//             onChangeText={(text) => setNewBook({ ...newBook, edition: text })}
//           />
//           <CustomInput
//             label="Total Copies"
//             placeholder="Enter total copies"
//             value={newBook.totalCopies?.toString()}
//             onChangeText={(text) => setNewBook({ ...newBook, totalCopies: parseInt(text) || 0 })}
//             keyboardType="numeric"
//           />
//           <CustomInput
//             label="Available Copies"
//             placeholder="Enter available copies"
//             value={newBook.availableCopies?.toString()}
//             onChangeText={(text) => setNewBook({ ...newBook, availableCopies: parseInt(text) || 0 })}
//             keyboardType="numeric"
//           />
//           <CustomInput
//             label="Shelf Location"
//             placeholder="Enter shelf location"
//             value={newBook.shelfLocation}
//             onChangeText={(text) => setNewBook({ ...newBook, shelfLocation: text })}
//           />
//         </ScrollView>
//       </CustomModal>

//       <ScrollView style={styles.bookList}>
//         <Text style={styles.subtitle}>Current Books</Text>
//         {books.map((book) => (
//           <ListItem
//             key={book.isbn}
//             title={book.title}
//             subtitle={`${book.authors} | Available: ${book.availableCopies}/${book.totalCopies}`}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   title: {
//     ...commonStyles.title,
//     marginBottom: 20,
//   },
//   subtitle: {
//     ...commonStyles.subtitle,
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   actionButton: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   searchSection: {
//     marginBottom: 20,
//   },
//   bookList: {
//     flex: 1,
//   },
//   deleteButton: {
//     height: 30,
//     width: 80,
//     backgroundColor: colors.error,
//   },
//   deleteButtonText: {
//     fontSize: 12,
//   },
//   noResults: {
//     textAlign: "center",
//     marginTop: 20,
//     color: colors.darkGray,
//   },
//   modalContent: {
//     maxHeight: 400,
//   },
// });

// export default BookManagement;

"use client";

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { colors, commonStyles } from "../../../styles/theme";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomModal from "../../../components/CustomModal";
import ListItem from "../../../components/ListItem";
import { addBook, deleteBook, getBooks } from "../../../services/api";
import type { Book } from "../../../types/navigation";

const BookManagement: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newBook, setNewBook] = useState<Omit<Book, "_id">>({
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
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const data = await getBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch books", err);
      Alert.alert("Error", "Failed to fetch books");
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async () => {
    if (
      !newBook.title ||
      !newBook.authors ||
      !newBook.isbn ||
      !newBook.category ||
      !newBook.publisher ||
      !newBook.publicationYear ||
      !newBook.totalCopies ||
      !newBook.availableCopies ||
      !newBook.shelfLocation
    ) {
      Alert.alert("Error", "All fields are required except Edition.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await addBook(newBook);

      if (response.success) {
        Alert.alert("Success", "Book added successfully");
        setIsAddModalVisible(false);
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
        });
        await fetchBooks();
      } else {
        Alert.alert("Error", response.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Add Book Error:", error);
      Alert.alert("Error", "Failed to add book.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await deleteBook(id);
      if (response.success) {
        Alert.alert("Success", "Book deleted successfully");
        await fetchBooks();
      } else {
        Alert.alert("Error", response.message || "Failed to delete book");
      }
    } catch (error) {
      console.error("Delete Book Error:", error);
      Alert.alert("Error", "Failed to delete book.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Management</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Add Book"
          onPress={() => setIsAddModalVisible(true)}
          style={styles.actionButton}
          disabled={isLoading}
        />
      </View>

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
            label="Edition (Optional)"
            placeholder="Enter edition"
            value={newBook.edition}
            onChangeText={(text) => setNewBook({ ...newBook, edition: text })}
          />
          <CustomInput
            label="Total Copies"
            placeholder="Enter total copies"
            value={newBook.totalCopies?.toString()}
            onChangeText={(text) =>
              setNewBook({ ...newBook, totalCopies: parseInt(text) || 0 })
            }
            keyboardType="numeric"
          />
          <CustomInput
            label="Available Copies"
            placeholder="Enter available copies"
            value={newBook.availableCopies?.toString()}
            onChangeText={(text) =>
              setNewBook({ ...newBook, availableCopies: parseInt(text) || 0 })
            }
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

      <Text style={styles.subtitle}>Current Books</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.navyBlue} style={styles.loader} />
      ) : (
        <ScrollView style={styles.bookList}>
          {books.length > 0 ? (
            books.map((book) => (
              <ListItem
                key={book._id}
                title={book.title}
                subtitle={book.authors}
                rightComponent={
                  <CustomButton
                    title="Delete"
                    onPress={() => handleDeleteBook(book._id)}
                    type="secondary"
                    style={styles.deleteButton}
                    textStyle={styles.deleteButtonText}
                    disabled={isLoading}
                  />
                }
              />
            ))
          ) : (
            <Text style={styles.noResults}>No books available</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  loader: {
    marginVertical: 20,
  },
});

export default BookManagement;
