import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { colors } from "../styles/theme"

interface ListItemProps {
  title: string
  subtitle?: string
  rightComponent?: React.ReactNode
  onPress?: () => void
}

const ListItem: React.FC<ListItemProps> = ({ title, subtitle, rightComponent, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={!onPress}>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightComponent && <View style={styles.rightComponentContainer}>{rightComponent}</View>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.offWhite,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.navyBlue,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.darkGray,
  },
  rightComponentContainer: {
    marginLeft: 10,
  },
})

export default ListItem

