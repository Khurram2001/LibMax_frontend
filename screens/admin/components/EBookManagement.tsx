"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { colors, commonStyles } from "../../../styles/theme"
import CustomButton from "../../../components/CustomButton"
import CustomInput from "../../../components/CustomInput"
import CustomModal from "../../../components/CustomModal"
import ListItem from "../../../components/ListItem"
import type { EBook } from "../../../types/navigation"

// Mock data
const mockEBooks: EBook[] = [
  {
    id: "1",
    title: "Digital Marketing Fundamentals",
    authors: "Robert Johnson",
    category: "Business",
    publisher: "Pearson",
    publicationYear: "2021",
    pdfUrl: "https://example.com/ebook1.pdf",
  },
  {
    id: "2",
    title: "Introduction to Artificial Intelligence",
    authors: "Dr. Emily Chen",
    category: "Computer Science",
    publisher: "MIT Press",
    publicationYear: "2020",
    pdfUrl: "https://example.com/ebook2.pdf",
  },
]

const EBookManagement: React.FC = () => {
  const [ebooks, setEbooks] = useState<EBook[]>(mockEBooks)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [selectedEBook, setSelectedEBook] = useState<EBook | null>(null)

  // New ebook form state
  const [newEBook, setNewEBook] = useState<Partial<EBook>>({
    title: "",
    authors: "",
    category: "",
    publisher: "",
    publicationYear: "",
    pdfUrl: "",
  })

  const handleAddEBook = () => {
    // Validate form
    if (!newEBook.title || !newEBook.authors || !newEBook.publisher || !newEBook.publicationYear || !newEBook.pdfUrl) {
      // Show error
      return
    }

    const ebookToAdd: EBook = {
      id: Date.now().toString(), // In a real app, this would come from the backend
      title: newEBook.title || "",
      authors: newEBook.authors || "",
      category: newEBook.category || "",
      publisher: newEBook.publisher || "",
      publicationYear: newEBook.publicationYear || "",
      pdfUrl: newEBook.pdfUrl || "",
    }

    setEbooks([...ebooks, ebookToAdd])
    setIsAddModalVisible(false)

    // Reset form
    setNewEBook({
      title: "",
      authors: "",
      category: "",
      publisher: "",
      publicationYear: "",
      pdfUrl: "",
    })
  }

  const handleDeleteEBook = (ebook: EBook) => {
    setEbooks(ebooks.filter((e) => e.id !== ebook.id))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Books Management</Text>

      <View style={styles.buttonContainer}>
        <CustomButton title="Add E-Book" onPress={() => setIsAddModalVisible(true)} style={styles.actionButton} />
      </View>

      {/* Add E-Book Modal */}
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
            label="Category/Genre"
            placeholder="Enter category or genre"
            value={newEBook.category}
            onChangeText={(text) => setNewEBook({ ...newEBook, category: text })}
          />
          <CustomInput
            label="Publisher"
            placeholder="Enter publisher name"
            value={newEBook.publisher}
            onChangeText={(text) => setNewEBook({ ...newEBook, publisher: text })}
          />
          <CustomInput
            label="Publication Year"
            placeholder="Enter publication year"
            value={newEBook.publicationYear}
            onChangeText={(text) => setNewEBook({ ...newEBook, publicationYear: text })}
            keyboardType="numeric"
          />
          <CustomInput
            label="PDF URL"
            placeholder="Enter PDF URL"
            value={newEBook.pdfUrl}
            onChangeText={(text) => setNewEBook({ ...newEBook, pdfUrl: text })}
          />
        </ScrollView>
      </CustomModal>

      {/* E-Books List */}
      <ScrollView style={styles.ebooksList}>
        <Text style={styles.subtitle}>Current E-Books</Text>
        {ebooks.map((ebook) => (
          <ListItem
            key={ebook.id}
            title={ebook.title}
            subtitle={`${ebook.authors} | ${ebook.category} | ${ebook.publisher} | ${ebook.publicationYear}`}
            rightComponent={
              <CustomButton
                title="Delete"
                onPress={() => handleDeleteEBook(ebook)}
                type="secondary"
                style={styles.deleteButton}
                textStyle={styles.deleteButtonText}
              />
            }
          />
        ))}
        {ebooks.length === 0 && <Text style={styles.noResults}>No e-books available</Text>}
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