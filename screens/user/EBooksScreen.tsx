"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList, EBook } from "../../types/navigation"
import { colors, commonStyles } from "../../styles/theme"
import CustomButton from "../../components/CustomButton"
import CustomInput from "../../components/CustomInput"
import ListItem from "../../components/ListItem"

type Props = NativeStackScreenProps<RootStackParamList, "EBooks">

// Mock data
const mockEBooks: EBook[] = [
  {
    id: "1",
    title: "Digital Marketing Fundamentals",
    authors: "Robert Johnson",
    category: "Business",
    pdfUrl: "https://example.com/ebook1.pdf",
  },
  {
    id: "2",
    title: "Introduction to Artificial Intelligence",
    authors: "Dr. Emily Chen",
    category: "Computer Science",
    pdfUrl: "https://example.com/ebook2.pdf",
  },
  {
    id: "3",
    title: "Modern Web Development",
    authors: "David Wilson",
    category: "Computer Science",
    pdfUrl: "https://example.com/ebook3.pdf",
  },
  {
    id: "4",
    title: "Financial Management Principles",
    authors: "Dr. Sarah Thompson",
    category: "Finance",
    pdfUrl: "https://example.com/ebook4.pdf",
  },
  {
    id: "5",
    title: "Introduction to Psychology",
    authors: "Prof. Michael Brown",
    category: "Psychology",
    pdfUrl: "https://example.com/ebook5.pdf",
  },
]

const EBooksScreen: React.FC<Props> = () => {
  const [ebooks] = useState<EBook[]>(mockEBooks)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredEBooks, setFilteredEBooks] = useState<EBook[]>(ebooks)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredEBooks(ebooks)
    } else {
      const filtered = ebooks.filter(
        (ebook) =>
          ebook.title.toLowerCase().includes(query.toLowerCase()) ||
          ebook.authors.toLowerCase().includes(query.toLowerCase()) ||
          ebook.category.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredEBooks(filtered)
    }
  }

  const handleDownloadPDF = (pdfUrl: string) => {
    // In a real app, this would download the PDF or open it in a PDF viewer
    Linking.openURL(pdfUrl).catch((err) => console.error("Error opening URL:", err))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Books Collection</Text>

      <View style={styles.searchBar}>
        <CustomInput
          placeholder="Search by title, author, or category"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      <ScrollView style={styles.ebooksList}>
        {filteredEBooks.map((ebook) => (
          <ListItem
            key={ebook.id}
            title={ebook.title}
            subtitle={`${ebook.authors} | ${ebook.category}`}
            rightComponent={
              <CustomButton
                title="Download"
                onPress={() => handleDownloadPDF(ebook.pdfUrl)}
                style={styles.downloadButton}
                textStyle={styles.downloadButtonText}
              />
            }
          />
        ))}
        {filteredEBooks.length === 0 && <Text style={styles.noResults}>No e-books found</Text>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.offWhite,
  },
  title: {
    ...commonStyles.title,
    marginBottom: 20,
  },
  searchBar: {
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
  },
  ebooksList: {
    flex: 1,
  },
  downloadButton: {
    height: 40,
    width: 100,
  },
  downloadButtonText: {
    fontSize: 14,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    color: colors.darkGray,
  },
})

export default EBooksScreen

