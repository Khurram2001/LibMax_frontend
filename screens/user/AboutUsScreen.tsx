import type React from "react"
import { View, Text, StyleSheet, ScrollView, Image } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../types/navigation"
import { colors } from "../../styles/theme"

type Props = NativeStackScreenProps<RootStackParamList, "AboutUs">

const AboutUsScreen: React.FC<Props> = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://placeholder.svg?height=150&width=150&text=University+Logo" }}
          style={styles.logo}
        />
        <Text style={styles.title}>LibMax</Text>
        <Text style={styles.subtitle}>University Library Management System</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Our Library</Text>
        <Text style={styles.sectionText}>
          The University Library is a state-of-the-art facility designed to support the academic and research needs of
          our students, faculty, and staff. Our collection includes over 500,000 physical books, thousands of e-books,
          and access to numerous research databases.
        </Text>
        <Text style={styles.sectionText}>
          Our mission is to provide a welcoming environment that encourages learning, discovery, and intellectual
          growth. We are committed to offering high-quality resources and services to support the university's
          educational goals.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meet Our Librarian</Text>
        <View style={styles.librarianContainer}>
          <Image
            source={{ uri: "https://placeholder.svg?height=100&width=100&text=Librarian" }}
            style={styles.librarianImage}
          />
          <View style={styles.librarianInfo}>
            <Text style={styles.librarianName}>Dr. Emily Johnson</Text>
            <Text style={styles.librarianTitle}>Head Librarian</Text>
            <Text style={styles.librarianBio}>
              Dr. Johnson has been our head librarian for over 10 years. She holds a Ph.D. in Library Science and is
              dedicated to making our library a center for academic excellence.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Library Rules</Text>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleNumber}>1.</Text>
          <Text style={styles.ruleText}>Maintain silence in reading areas.</Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleNumber}>2.</Text>
          <Text style={styles.ruleText}>Books can be borrowed for up to 14 days.</Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleNumber}>3.</Text>
          <Text style={styles.ruleText}>Late returns will incur a fine of $0.50 per day.</Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleNumber}>4.</Text>
          <Text style={styles.ruleText}>Food and drinks are not allowed in the library.</Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleNumber}>5.</Text>
          <Text style={styles.ruleText}>Students can reserve up to 5 books at a time.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.contactInfo}>Email: library@university.edu</Text>
        <Text style={styles.contactInfo}>Phone: (555) 123-4567</Text>
        <Text style={styles.contactInfo}>Address: 123 University Ave, College Town, CT 12345</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 LibMax - University Library Management System</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.navyBlue,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.offWhite,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.offWhite,
    textAlign: "center",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.navyBlue,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: colors.darkGray,
    lineHeight: 24,
    marginBottom: 10,
  },
  librarianContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  librarianImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  librarianInfo: {
    flex: 1,
  },
  librarianName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.navyBlue,
    marginBottom: 5,
  },
  librarianTitle: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 5,
  },
  librarianBio: {
    fontSize: 14,
    color: colors.darkGray,
    lineHeight: 20,
  },
  ruleItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  ruleNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.navyBlue,
    width: 25,
  },
  ruleText: {
    fontSize: 16,
    color: colors.darkGray,
    flex: 1,
  },
  contactInfo: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 10,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: "center",
  },
})

export default AboutUsScreen

