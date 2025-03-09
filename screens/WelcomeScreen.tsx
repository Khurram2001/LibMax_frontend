import type React from "react"
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../types/navigation"
import { colors } from "../styles/theme"
import CustomButton from "../components/CustomButton"

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: "https://placeholder.svg?height=800&width=400&text=Library+Background" }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={{ uri: "https://placeholder.svg?height=150&width=150&text=LibMax+Logo" }}
            style={styles.logo}
          />
          <Text style={styles.title}>LibMax</Text>
          <Text style={styles.subtitle}>University Library Management System</Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Login as User"
              onPress={() => navigation.navigate("Login", { userType: "user" })}
              style={styles.button}
            />
            <CustomButton
              title="Login as Admin"
              onPress={() => navigation.navigate("Login", { userType: "admin" })}
              type="secondary"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.offWhite,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.offWhite,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  button: {
    marginVertical: 10,
  },
})

export default WelcomeScreen

