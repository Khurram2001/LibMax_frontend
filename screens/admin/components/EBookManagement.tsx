// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
// import * as DocumentPicker from "expo-document-picker"
// import { colors, commonStyles } from "../../../styles/theme"
// import CustomButton from "../../../components/CustomButton"
// import CustomInput from "../../../components/CustomInput"
// import CustomModal from "../../../components/CustomModal"
// import ListItem from "../../../components/ListItem"
// import type { EBook } from "../../../types/navigation"
// import { createEbook, getAllEbooks, deleteEbook } from "../../../services/api"

// const EBookManagement: React.FC = () => {
//   const [ebooks, setEbooks] = useState<EBook[]>([])
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false)

//   const [newEBook, setNewEBook] = useState<{
//     title: string
//     authors: string
//     category: string
//     file: File | null
//   }>({
//     title: "",
//     authors: "",
//     category: "",
//     file: null,
//   })

//   const loadEbooks = async () => {
//     try {
//       const data = await getAllEbooks()
//       setEbooks(data)
//     } catch (error) {
//       Alert.alert("Error", "Failed to load e-books")
//     }
//   }

//   useEffect(() => {
//     loadEbooks()
//   }, [])

//   const handlePickPDF = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "application/pdf",
//       copyToCacheDirectory: true,
//     })

//     if (result.assets && result.assets.length > 0 && !result.canceled) {
//       const fileAsset = result.assets[0]
//       const file: File = {
//         uri: fileAsset.uri,
//         name: fileAsset.name,
//         type: "application/pdf",
//       } as any
//       setNewEBook({ ...newEBook, file })
//     }
//   }

//   const handleAddEBook = async () => {
//     if (!newEBook.title || !newEBook.authors || !newEBook.category || !newEBook.file) {
//       Alert.alert("Error", "Please fill all required fields and upload a PDF.")
//       return
//     }

//     try {
//       await createEbook({
//         title: newEBook.title,
//         authors: newEBook.authors,
//         category: newEBook.category,
//         file: newEBook.file,
//       })
//       setIsAddModalVisible(false)
//       setNewEBook({
//         title: "",
//         authors: "",
//         category: "",
//         file: null,
//       })
//       await loadEbooks()
//     } catch (error) {
//       Alert.alert("Error", "Failed to add e-book")
//     }
//   }

//   const handleDeleteEBook = async (id: string) => {
//     try {
//       await deleteEbook(id)
//       await loadEbooks()
//     } catch (error) {
//       Alert.alert("Error", "Failed to delete e-book")
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>E-Books Management</Text>

//       <View style={styles.buttonContainer}>
//         <CustomButton title="Add E-Book" onPress={() => setIsAddModalVisible(true)} style={styles.actionButton} />
//       </View>

//       <CustomModal
//         visible={isAddModalVisible}
//         title="Add E-Book"
//         onClose={() => setIsAddModalVisible(false)}
//         onConfirm={handleAddEBook}
//         confirmText="Add E-Book"
//       >
//         <ScrollView style={styles.modalContent}>
//           <CustomInput
//             label="Title"
//             placeholder="Enter e-book title"
//             value={newEBook.title}
//             onChangeText={(text) => setNewEBook({ ...newEBook, title: text })}
//           />
//           <CustomInput
//             label="Author(s)"
//             placeholder="Enter author names"
//             value={newEBook.authors}
//             onChangeText={(text) => setNewEBook({ ...newEBook, authors: text })}
//           />
//           <CustomInput
//             label="Category"
//             placeholder="Enter category or genre"
//             value={newEBook.category}
//             onChangeText={(text) => setNewEBook({ ...newEBook, category: text })}
//           />
//           <CustomButton
//             title={newEBook.file ? `PDF Selected: ${newEBook.file.name}` : "Select PDF File"}
//             onPress={handlePickPDF}
//             style={{ marginTop: 10 }}
//           />
//         </ScrollView>
//       </CustomModal>

//       <ScrollView style={styles.ebooksList}>
//   <Text style={styles.subtitle}>Current E-Books</Text>

//   {Array.isArray(ebooks) ? (
//     ebooks.length > 0 ? (
//       ebooks.map((ebook) => (
//         <ListItem
//           key={ebook.id}
//           title={ebook.title}
//           subtitle={`${ebook.authors} | ${ebook.category}`}
//           rightComponent={
//             <CustomButton
//               title="Delete"
//               onPress={() => handleDeleteEBook(ebook.id)}
//               type="secondary"
//               style={styles.deleteButton}
//               textStyle={styles.deleteButtonText}
//             />
//           }
//         />
//       ))
//     ) : (
//       <Text style={styles.noResults}>No e-books available</Text>
//     )
//   ) : (
//     <Text style={styles.noResults}>Loading e-books...</Text>
//   )}
// </ScrollView>

//     </View>
//   )
// }

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
//   ebooksList: {
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
// })

// export default EBookManagement

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { colors, commonStyles } from "../../../styles/theme"
import CustomButton from "../../../components/CustomButton"
import CustomInput from "../../../components/CustomInput"
import CustomModal from "../../../components/CustomModal"
import ListItem from "../../../components/ListItem"
import { createEbook, getAllEbooks, deleteEbook } from "../../../services/api"

// Interface to match the backend model structure
interface EBookData {
  _id: string;
  title: string;
  authors: string;
  category: string;
  pdfUrl: string;
}

const EBookManagement: React.FC = () => {
  const [ebooks, setEbooks] = useState<EBookData[]>([])
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [newEBook, setNewEBook] = useState<{
    title: string
    authors: string
    category: string
    file: any | null
  }>({
    title: "",
    authors: "",
    category: "",
    file: null,
  })

  const loadEbooks = async () => {
    setIsLoading(true)
    try {
      const data = await getAllEbooks()
      setEbooks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error loading ebooks:", error)
      Alert.alert("Error", "Failed to load e-books")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadEbooks()
  }, [])

  const handlePickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      })
      console.log("DocumentPicker result:", result) // Log the result for debugging
      if (result.assets && result.assets.length > 0 && !result.canceled) {
        // @ts-ignore
        const fileAsset = result?.output[0]
        setNewEBook({ 
          ...newEBook, 
          file: fileAsset
          // file: {
          //   uri: fileAsset.uri,
          //   name: fileAsset.name || 'document.pdf',
          //   type: 'application/pdf'
          // }
        })
      }
    } catch (error) {
      console.error("Error picking document:", error)
      Alert.alert("Error", "Failed to select document")
    }
  }

  const handleAddEBook = async () => {
  if (!newEBook.title || !newEBook.authors || !newEBook.category || !newEBook.file) {
    Alert.alert("Error", "Please fill all required fields and upload a PDF.");
    return;
  }

  setIsLoading(true);
  try {
    console.log("Adding e-book:", newEBook); // Log the new e-book data for debugging
    const response = await createEbook({
      title: newEBook.title,
      authors: newEBook.authors,
      category: newEBook.category,
      file: newEBook.file,
    });
    console.log("E-book creation response:", response); // Log the response for debugging
    // The backend returns success: true for successful operations
    if (response && response.success) {
      Alert.alert("Success", "E-book added successfully");
      setIsAddModalVisible(false);
      setNewEBook({
        title: "",
        authors: "",
        category: "",
        file: null,
      });
      await loadEbooks(); // Refresh the list
    } else {
      Alert.alert("Error", response?.message || "Failed to add e-book");
    }
  } catch (error) {
    console.error("Error adding ebook:", error);
    Alert.alert("Error", "Failed to add e-book. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleDeleteEBook = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await deleteEbook(id)
      if (response.success) {
        Alert.alert("Success", "E-book deleted successfully")
        await loadEbooks()
      } else {
        Alert.alert("Error", response.message || "Failed to delete e-book")
      }
    } catch (error) {
      console.error("Error deleting ebook:", error)
      Alert.alert("Error", "Failed to delete e-book")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Books Management</Text>

      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Add E-Book" 
          onPress={() => setIsAddModalVisible(true)} 
          style={styles.actionButton} 
          disabled={isLoading}
        />
      </View>

      <CustomModal
        visible={isAddModalVisible}
        title="Add E-Book"
        onClose={() => setIsAddModalVisible(false)}
        onConfirm={handleAddEBook}
        confirmText="Add E-Book"
      >
        <ScrollView style={styles.modalContent}>
          <CustomInput
            label="Title"
            placeholder="Enter e-book title"
            value={newEBook.title}
            onChangeText={(text) => setNewEBook({ ...newEBook, title: text })}
          />
          <CustomInput
            label="Author(s)"
            placeholder="Enter author names"
            value={newEBook.authors}
            onChangeText={(text) => setNewEBook({ ...newEBook, authors: text })}
          />
          <CustomInput
            label="Category"
            placeholder="Enter category or genre"
            value={newEBook.category}
            onChangeText={(text) => setNewEBook({ ...newEBook, category: text })}
          />
          <CustomButton
            title={newEBook.file ? `PDF Selected: ${newEBook.file.name}` : "Select PDF File"}
            onPress={handlePickPDF}
            style={{ marginTop: 10 }}
            disabled={isLoading}
          />
        </ScrollView>
      </CustomModal>

      <ScrollView style={styles.ebooksList}>
        <Text style={styles.subtitle}>Current E-Books</Text>

        {isLoading ? (
          <Text style={styles.noResults}>Loading e-books...</Text>
        ) : Array.isArray(ebooks) && ebooks.length > 0 ? (
          ebooks.map((ebook) => (
            <ListItem
              key={ebook._id}
              title={ebook.title}
              subtitle={`${ebook.authors} | ${ebook.category}`}
              rightComponent={
                <CustomButton
                  title="Delete"
                  onPress={() => handleDeleteEBook(ebook._id)}
                  type="secondary"
                  style={styles.deleteButton}
                  textStyle={styles.deleteButtonText}
                  disabled={isLoading}
                />
              }
            />
          ))
        ) : (
          <Text style={styles.noResults}>No e-books available</Text>
        )}
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
  ebooksList: {
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

export default EBookManagement