import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"

// Screens
import WelcomeScreen from "./screens/WelcomeScreen"
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import AdminDashboardScreen from "./screens/admin/AdminDashboardScreen"
import UserDashboardScreen from "./screens/user/UserDashboardScreen"
import FacultyResearchScreen from "./screens/user/FacultyResearchScreen"
import EBooksScreen from "./screens/user/EBooksScreen"
import AboutUsScreen from "./screens/user/AboutUsScreen"

// Types
import type { RootStackParamList } from "./types/navigation"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#1A2E5A", // Navy blue
            },
            headerTintColor: "#F5F5F5", // Off-white
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Sign Up" }} />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboardScreen}
            options={{ title: "Admin Dashboard", headerLeft: () => null }}
          />
          <Stack.Screen
            name="UserDashboard"
            component={UserDashboardScreen}
            options={{ title: "User Dashboard", headerLeft: () => null }}
          />
          <Stack.Screen
            name="FacultyResearch"
            component={FacultyResearchScreen}
            options={{ title: "Faculty Research Publications" }}
          />
          <Stack.Screen name="EBooks" component={EBooksScreen} options={{ title: "E-Books" }} />
          <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ title: "About Us" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

