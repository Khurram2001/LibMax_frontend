"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { colors, commonStyles } from "../../../styles/theme"
import ListItem from "../../../components/ListItem"
import CustomButton from "../../../components/CustomButton"

// Mock notifications
const mockNotifications = [
  {
    id: "1",
    title: "Book Reservation",
    message: 'John Doe has reserved "Introduction to Computer Science"',
    date: "2023-05-05 14:30",
    isRead: false,
  },
  {
    id: "2",
    title: "Book Reservation",
    message: 'Jane Smith has reserved "Advanced Mathematics for Engineers"',
    date: "2023-05-04 10:15",
    isRead: true,
  },
  {
    id: "3",
    title: "Book Return Overdue",
    message: 'Michael Johnson is late returning "Database Systems"',
    date: "2023-05-03 09:45",
    isRead: false,
  },
]

const NotificationsSection: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications)

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      {notifications.length > 0 && (
        <CustomButton title="Mark All as Read" onPress={markAllAsRead} type="secondary" style={styles.markAllButton} />
      )}

      <ScrollView style={styles.notificationsList}>
        {notifications.map((notification) => (
          <ListItem
            key={notification.id}
            title={notification.title}
            subtitle={`${notification.message}\n${notification.date}`}
            rightComponent={
              <View style={styles.actionButtons}>
                {!notification.isRead && (
                  <CustomButton
                    title="Read"
                    onPress={() => markAsRead(notification.id)}
                    style={[styles.actionButton, styles.readButton]}
                    textStyle={styles.actionButtonText}
                  />
                )}
                <CustomButton
                  title="Delete"
                  onPress={() => deleteNotification(notification.id)}
                  type="secondary"
                  style={[styles.actionButton, styles.deleteButton]}
                  textStyle={styles.actionButtonText}
                />
              </View>
            }
          />
        ))}
        {notifications.length === 0 && <Text style={styles.noResults}>No notifications available</Text>}
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
  notificationsList: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    height: 30,
    width: 70,
    marginVertical: 2,
  },
  actionButtonText: {
    fontSize: 12,
  },
  readButton: {
    backgroundColor: colors.navyBlue,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    color: colors.darkGray,
  },
  markAllButton: {
    marginBottom: 20,
  },
})

export default NotificationsSection

