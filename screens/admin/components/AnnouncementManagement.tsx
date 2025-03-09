"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { colors, commonStyles } from "../../../styles/theme"
import CustomButton from "../../../components/CustomButton"
import CustomInput from "../../../components/CustomInput"
import CustomModal from "../../../components/CustomModal"
import ListItem from "../../../components/ListItem"
import type { Announcement } from "../../../types/navigation"

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

const AnnouncementManagement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  // New announcement form state
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
  })

  const handleAddAnnouncement = () => {
    // Validate form
    if (!newAnnouncement.title || !newAnnouncement.content) {
      // Show error
      return
    }

    const announcementToAdd: Announcement = {
      id: Date.now().toString(), // In a real app, this would come from the backend
      title: newAnnouncement.title || "",
      content: newAnnouncement.content || "",
      date: newAnnouncement.date || new Date().toISOString().split("T")[0],
    }

    setAnnouncements([announcementToAdd, ...announcements])
    setIsAddModalVisible(false)

    // Reset form
    setNewAnnouncement({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const handleDeleteAnnouncement = (announcement: Announcement) => {
    setAnnouncements(announcements.filter((a) => a.id !== announcement.id))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Announcements</Text>

      <View style={styles.buttonContainer}>
        <CustomButton title="Add Announcement" onPress={() => setIsAddModalVisible(true)} style={styles.actionButton} />
      </View>

      {/* Add Announcement Modal */}
      <CustomModal
        visible={isAddModalVisible}
        title="Add Announcement"
        onClose={() => setIsAddModalVisible(false)}
        onConfirm={handleAddAnnouncement}
        confirmText="Post Announcement"
      >
        <ScrollView style={styles.modalContent}>
          <CustomInput
            label="Title"
            placeholder="Enter announcement title"
            value={newAnnouncement.title}
            onChangeText={(text) => setNewAnnouncement({ ...newAnnouncement, title: text })}
          />
          <CustomInput
            label="Content"
            placeholder="Enter announcement content"
            value={newAnnouncement.content}
            onChangeText={(text) => setNewAnnouncement({ ...newAnnouncement, content: text })}
            multiline
            numberOfLines={4}
            style={styles.contentInput}
          />
        </ScrollView>
      </CustomModal>

      {/* Announcements List */}
      <ScrollView style={styles.announcementsList}>
        <Text style={styles.subtitle}>Current Announcements</Text>
        {announcements.map((announcement) => (
          <ListItem
            key={announcement.id}
            title={announcement.title}
            subtitle={`${announcement.date}`}
            rightComponent={
              <CustomButton
                title="Delete"
                onPress={() => handleDeleteAnnouncement(announcement)}
                type="secondary"
                style={styles.deleteButton}
                textStyle={styles.deleteButtonText}
              />
            }
          />
        ))}
        {announcements.length === 0 && <Text style={styles.noResults}>No announcements available</Text>}
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
  announcementsList: {
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
  contentInput: {
    height: 100,
    textAlignVertical: "top",
  },
})

export default AnnouncementManagement

