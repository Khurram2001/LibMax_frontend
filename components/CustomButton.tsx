import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { colors } from "../styles/theme"

interface CustomButtonProps {
  title: string
  onPress: () => void
  type?: "primary" | "secondary"
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = "primary",
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          type === "primary" ? styles.primaryButtonText : styles.secondaryButtonText,
          disabled && styles.disabledButtonText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: colors.navyBlue,
  },
  secondaryButton: {
    backgroundColor: colors.yellow,
  },
  disabledButton: {
    backgroundColor: colors.gray,
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryButtonText: {
    color: colors.offWhite,
  },
  secondaryButtonText: {
    color: colors.navyBlue,
  },
  disabledButtonText: {
    color: colors.darkGray,
  },
})

export default CustomButton

