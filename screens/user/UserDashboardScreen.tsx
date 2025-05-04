"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList, Announcement, Book } from "../../types/navigation"
import { colors, commonStyles } from "../../styles/theme"
import CustomButton from "../../components/CustomButton"
import CustomInput from "../../components/CustomInput"
import CustomModal from "../../components/CustomModal"
import ListItem from "../../components/ListItem"

type Props = NativeStackScreenProps<RootStackParamList, "UserDashboard">

// Mock data
const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Library Hours Extended During Finals",
    content: "The library will be open until midnight during finals week (May 10-17).",
    date: "2023-05-01",
  },
  {
    id: "2",
    title: "New Research Databases Available",
    content: "We have added three new research databases for science and engineering students.",
    date: "2023-04-15",
  },
]

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

const UserDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [announcements] = useState<Announcement[]>(mockAnnouncements)
  const [books] = useState<Book[]>(mockBooks)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isReserveModalVisible, setIsReserveModalVisible] = useState(false)
  const [isAnnouncementModalVisible, setIsAnnouncementModalVisible] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery),
    )

    setSearchResults(results)
  }

  const handleReserveBook = (book: Book) => {
    setSelectedBook(book)
    setIsReserveModalVisible(true)
  }

  const confirmReservation = () => {
    // In a real app, you would send a reservation request to the backend
    setIsReserveModalVisible(false)
    setSelectedBook(null)
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
  }

  const viewAnnouncementDetails = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setIsAnnouncementModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>Book Reservation</Text>
        <View style={styles.searchBar}>
          <CustomInput
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          <CustomButton title="Search" onPress={handleSearch} style={styles.searchButton} />
        </View>

        {isSearching && (
          <View style={styles.searchResults}>
            {searchResults.length > 0 ? (
              <ScrollView style={styles.resultsList}>
                {searchResults.map((book) => (
                  <ListItem
                    key={book.id}
                    title={book.title}
                    subtitle={`${book.authors} | Available: ${book.availableCopies}/${book.totalCopies}`}
                    rightComponent={
                      <CustomButton
                        title="Reserve"
                        onPress={() => handleReserveBook(book)}
                        style={styles.reserveButton}
                        disabled={book.availableCopies === 0}
                      />
                    }
                  />
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noResults}>No books found</Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.announcementsSection}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <ScrollView style={styles.announcementsList}>
          {announcements.map((announcement) => (
            <ListItem
              key={announcement.id}
              title={announcement.title}
              subtitle={announcement.date}
              onPress={() => viewAnnouncementDetails(announcement)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.navigationSection}>
        <Text style={styles.sectionTitle}>Quick Navigation</Text>
        <View style={styles.navigationButtons}>
          <CustomButton
            title="Faculty Research"
            onPress={() => navigation.navigate("FacultyResearch")}
            style={styles.navButton}
          />
          <CustomButton title="E-Books" onPress={() => navigation.navigate("EBooks")} style={styles.navButton} />
          <CustomButton title="About Us" onPress={() => navigation.navigate("AboutUs")} style={styles.navButton} />
        </View>
      </View>

      <CustomButton
        title="Logout"
        onPress={() => navigation.replace("Welcome")}
        type="secondary"
        style={styles.logoutButton}
      />

      {/* Reserve Book Modal */}
      <CustomModal
        visible={isReserveModalVisible}
        title="Reserve Book"
        message={selectedBook ? `Do you want to reserve "${selectedBook.title}"?` : ""}
        onClose={() => setIsReserveModalVisible(false)}
        onConfirm={confirmReservation}
        confirmText="Reserve"
      />

      {/* Announcement Details Modal */}
      <CustomModal
        visible={isAnnouncementModalVisible}
        title={selectedAnnouncement?.title || ""}
        onClose={() => setIsAnnouncementModalVisible(false)}
      >
        <View style={styles.announcementDetails}>
          <Text style={styles.announcementDate}>{selectedAnnouncement?.date}</Text>
          <Text style={styles.announcementContent}>{selectedAnnouncement?.content}</Text>
        </View>
      </CustomModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.offWhite,
  },
  searchSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    ...commonStyles.subtitle,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    height: 50,
  },
  searchButton: {
    width: 100,
    height: 50,
  },
  searchResults: {
    marginTop: 10,
  },
  resultsList: {
    maxHeight: 200,
  },
  reserveButton: {
    width: 80,
    height: 40,
  },
  noResults: {
    textAlign: "center",
    marginTop: 10,
    color: colors.darkGray,
  },
  announcementsSection: {
    marginBottom: 20,
  },
  announcementsList: {
    maxHeight: 200,
  },
  navigationSection: {
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  logoutButton: {
    marginTop: 10,
  },
  announcementDetails: {
    padding: 10,
  },
  announcementDate: {
    color: colors.darkGray,
    marginBottom: 10,
  },
  announcementContent: {
    color: colors.navyBlue,
    lineHeight: 20,
  },
})

export default UserDashboardScreen

