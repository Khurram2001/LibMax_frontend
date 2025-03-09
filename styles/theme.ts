import { StyleSheet } from "react-native"

// Theme colors
export const colors = {
  offWhite: "#F5F5F5",
  gray: "#CCCCCC",
  lightGray: "#E5E5E5",
  darkGray: "#666666",
  navyBlue: "#1A2E5A",
  yellow: "#FFD700",
  error: "#FF6B6B",
  success: "#4CAF50",
}

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.offWhite,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.navyBlue,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.navyBlue,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: colors.offWhite,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: colors.navyBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: colors.offWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  secondaryButtonText: {
    color: colors.navyBlue,
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: colors.offWhite,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorText: {
    color: colors.error,
    marginBottom: 10,
  },
  successText: {
    color: colors.success,
    marginBottom: 10,
  },
  sectionContainer: {
    padding: 16,
    marginBottom: 16,
  },
})

