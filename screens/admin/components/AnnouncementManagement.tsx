"use client";

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { colors, commonStyles } from "../../../styles/theme";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomModal from "../../../components/CustomModal";
import ListItem from "../../../components/ListItem";
import { createAnnouncement, getAllAnnouncements, deleteAnnouncement } from "../../../services/api";

interface Announcement {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
}

const AnnouncementManagement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const loadAnnouncements = async () => {
    try {
      const res = await getAllAnnouncements();
      setAnnouncements(res.announcements);
    } catch (error) {
      console.error("Failed to load announcements", error);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.description) {
      Alert.alert("Validation Error", "Both title and description are required.");
      return;
    }

    try {
      await createAnnouncement(newAnnouncement);
      await loadAnnouncements(); // Refresh list
      setIsAddModalVisible(false);
      setNewAnnouncement({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding announcement:", error);
      Alert.alert("Error", "Could not post announcement.");
    }
  };

  const handleDeleteAnnouncement = async (announcement: Announcement) => {
    try {
      await deleteAnnouncement(announcement._id);
      setAnnouncements((prev) => prev.filter((a) => a._id !== announcement._id));
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Failed to delete announcement.");
    }
  };

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
            label="Description"
            placeholder="Enter announcement description"
            value={newAnnouncement.description}
            onChangeText={(text) => setNewAnnouncement({ ...newAnnouncement, description: text })}
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
            key={announcement._id}
            title={announcement.title}
            subtitle={new Date(announcement.createdAt || "").toLocaleDateString()}
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
  );
};

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
});

export default AnnouncementManagement;
