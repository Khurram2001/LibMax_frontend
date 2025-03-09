"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../types/navigation"
import { colors } from "../../styles/theme"
import CustomButton from "../../components/CustomButton"
import BookManagement from "./components/BookManagement"
import ResearchManagement from "./components/ResearchManagement"
import EBookManagement from "./components/EBookManagement"
import AnnouncementManagement from "./components/AnnouncementManagement"
import NotificationsSection from "./components/NotificationsSection"

type Props = NativeStackScreenProps<RootStackParamList, "AdminDashboard">

const AdminDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<"books" | "research" | "ebooks" | "announcements" | "notifications">(
    "books",
  )

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "books" && styles.activeTab]}
            onPress={() => setActiveTab("books")}
          >
            <Text style={[styles.tabText, activeTab === "books" && styles.activeTabText]}>Books</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "research" && styles.activeTab]}
            onPress={() => setActiveTab("research")}
          >
            <Text style={[styles.tabText, activeTab === "research" && styles.activeTabText]}>Research</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "ebooks" && styles.activeTab]}
            onPress={() => setActiveTab("ebooks")}
          >
            <Text style={[styles.tabText, activeTab === "ebooks" && styles.activeTabText]}>E-Books</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "announcements" && styles.activeTab]}
            onPress={() => setActiveTab("announcements")}
          >
            <Text style={[styles.tabText, activeTab === "announcements" && styles.activeTabText]}>Announcements</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "notifications" && styles.activeTab]}
            onPress={() => setActiveTab("notifications")}
          >
            <Text style={[styles.tabText, activeTab === "notifications" && styles.activeTabText]}>Notifications</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === "books" && <BookManagement />}
        {activeTab === "research" && <ResearchManagement />}
        {activeTab === "ebooks" && <EBookManagement />}
        {activeTab === "announcements" && <AnnouncementManagement />}
        {activeTab === "notifications" && <NotificationsSection />}
      </ScrollView>

      <CustomButton
        title="Logout"
        onPress={() => navigation.replace("Welcome")}
        type="secondary"
        style={styles.logoutButton}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  tabContainer: {
    backgroundColor: colors.navyBlue,
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: colors.yellow,
  },
  tabText: {
    color: colors.offWhite,
    fontWeight: "bold",
  },
  activeTabText: {
    color: colors.navyBlue,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  logoutButton: {
    margin: 16,
  },
})

export default AdminDashboardScreen

