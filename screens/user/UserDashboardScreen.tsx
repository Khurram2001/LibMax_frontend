"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList, Announcement, Book } from "../../types/navigation"
import { colors, commonStyles } from "../../styles/theme"
import CustomButton from "../../components/CustomButton"
import CustomInput from "../../components/CustomInput"
import CustomModal from "../../components/CustomModal"
import ListItem from "../../components/ListItem"
import { getAllAnnouncements, searchBooks, reserveBook } from "../../services/api"

type Props = NativeStackScreenProps<RootStackParamList, "UserDashboard">

const UserDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isReserveModalVisible, setIsReserveModalVisible] = useState(false)
  const [isAnnouncementModalVisible, setIsAnnouncementModalVisible] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  // Hardcoded userId for testing, ideally should come from auth context or secure storage
  const userId = "user_id_here" // 🔁 <-- Replace with actual user ID logic

  useEffect(() => {
    loadAnnouncements()
  }, [])

  const loadAnnouncements = async () => {
    try {
      const response = await getAllAnnouncements()
      const mappedAnnouncements: Announcement[] = response.announcements.map((a: any) => ({
        id: a._id,
        title: a.title,
        content: a.description,
        date: new Date(a.createdAt).toLocaleDateString(),
      }))
      setAnnouncements(mappedAnnouncements)
    } catch (error) {
      console.error("Failed to load announcements", error)
      Alert.alert("Error", "Unable to load announcements. Please try again later.")
    }
  }

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    try {
      const results: Book[] = await searchBooks(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error("Search failed:", error)
      Alert.alert("Search Error", "Unable to fetch books. Please try again.")
      setSearchResults([])
    }
  }

  const handleReserveBook = (book: Book) => {
    setSelectedBook(book)
    setIsReserveModalVisible(true)
  }

  const confirmReservation = async () => {
    if (!selectedBook) return

    try {
      const response = await reserveBook({ bookTitle: selectedBook.title, userId })
      if (response.success) {
        Alert.alert("Success", response.message)
        // Refresh the search results
        handleSearch()
      } else {
        Alert.alert("Error", response.message || "Reservation failed.")
      }
    } catch (error) {
      console.error("Reservation failed:", error)
      Alert.alert("Error", "Reservation failed. Please try again.")
    }

    setIsReserveModalVisible(false)
    setSelectedBook(null)
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
            placeholder="Search by title, author, or category"
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
                    key={book._id || book.id}
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
          <CustomButton title="Faculty Research" onPress={() => navigation.navigate("FacultyResearch")} style={styles.navButton} />
          <CustomButton title="E-Books" onPress={() => navigation.navigate("EBooks")} style={styles.navButton} />
          <CustomButton title="About Us" onPress={() => navigation.navigate("AboutUs")} style={styles.navButton} />
        </View>
      </View>

      <CustomButton title="Logout" onPress={() => navigation.replace("Welcome")} type="secondary" style={styles.logoutButton} />

      <CustomModal
        visible={isReserveModalVisible}
        title="Reserve Book"
        message={selectedBook ? `Do you want to reserve "${selectedBook.title}"?` : ""}
        onClose={() => setIsReserveModalVisible(false)}
        onConfirm={confirmReservation}
        confirmText="Reserve"
      />

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
  container: { flex: 1, padding: 16, backgroundColor: colors.offWhite },
  searchSection: { marginBottom: 20 },
  sectionTitle: { ...commonStyles.subtitle, marginBottom: 10 },
  searchBar: { flexDirection: "row", alignItems: "center", width: "72%" },
  searchInput: { flex: 1, marginRight: 10, height: 50 },
  searchButton: { width: 100, height: 50 },
  searchResults: { marginTop: 10 },
  resultsList: { maxHeight: 200 },
  reserveButton: { width: 80, height: 40 },
  noResults: { textAlign: "center", marginTop: 10, color: colors.darkGray },
  announcementsSection: { marginBottom: 20 },
  announcementsList: { maxHeight: 200 },
  navigationSection: { marginBottom: 20 },
  navigationButtons: { flexDirection: "row", justifyContent: "space-between" },
  navButton: { padding: 10, flex: 1, marginHorizontal: 5 },
  logoutButton: { marginTop: 10 },
  announcementDetails: { padding: 10 },
  announcementDate: { color: colors.darkGray, marginBottom: 10 },
  announcementContent: { color: colors.navyBlue, lineHeight: 20 },
})

export default UserDashboardScreen
