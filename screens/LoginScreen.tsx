"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../types/navigation"
import { colors, commonStyles } from "../styles/theme"
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import { login } from "../services/api"

type Props = NativeStackScreenProps<RootStackParamList, "Login">

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userType } = route.params
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(student\.)?uow\.edu\.pk$/
    if (!email) {
      setEmailError("Email is required")
      return false
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required")
      return false
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return false
    }
    setPasswordError("")
    return true
  }

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (!isEmailValid || !isPasswordValid) return

    setLoading(true)
    try {
      const response = await login({ email, password })

      if (response.success) {
        Alert.alert("Success", response.message)
        if (userType === "admin") {
          navigation.replace("AdminDashboard")
        } else {
          navigation.replace("UserDashboard")
        }
      } else {
        Alert.alert("Login Failed", response.message || "Invalid credentials")
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Something went wrong. Please try again."
      Alert.alert("Error", message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{userType === "admin" ? "Admin Login" : "User Login"}</Text>

        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={passwordError}
        />

        <CustomButton
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          disabled={loading}
          style={styles.loginButton}
        />

        {loading && <ActivityIndicator size="small" color={colors.navyBlue} style={{ marginTop: 10 }} />}

        {userType === "user" && (
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.offWhite,
    justifyContent: "center",
  },
  title: {
    ...commonStyles.title,
    marginBottom: 30,
    textAlign: "center",
  },
  loginButton: {
    marginTop: 10,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: colors.darkGray,
  },
  signupLink: {
    color: colors.navyBlue,
    fontWeight: "bold",
    marginLeft: 5,
  },
})

export default LoginScreen
