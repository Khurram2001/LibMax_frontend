"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList, ResearchPaper } from "../../types/navigation"
import { colors, commonStyles } from "../../styles/theme"
import CustomButton from "../../components/CustomButton"
import ListItem from "../../components/ListItem"

type Props = NativeStackScreenProps<RootStackParamList, "FacultyResearch">

// Mock data
const mockResearchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "Machine Learning Applications in Healthcare",
    authors: "Dr. Sarah Johnson",
    year: "2022",
    pdfUrl: "https://example.com/research1.pdf",
  },
  {
    id: "2",
    title: "Sustainable Energy Solutions for Urban Areas",
    authors: "Prof. Michael Chen, Dr. Lisa Wong",
    year: "2021",
    pdfUrl: "https://example.com/research2.pdf",
  },
  {
    id: "3",
    title: "Advancements in Quantum Computing",
    authors: "Dr. Robert Miller",
    year: "2023",
    pdfUrl: "https://example.com/research3.pdf",
  },
  {
    id: "4",
    title: "Climate Change Impact on Coastal Ecosystems",
    authors: "Prof. Emily Davis, Dr. James Wilson",
    year: "2022",
    pdfUrl: "https://example.com/research4.pdf",
  },
]

const FacultyResearchScreen: React.FC<Props> = () => {
  const [researchPapers] = useState<ResearchPaper[]>(mockResearchPapers)

  const handleDownloadPDF = (pdfUrl: string) => {
    // In a real app, this would download the PDF or open it in a PDF viewer
    Linking.openURL(pdfUrl).catch((err) => console.error("Error opening URL:", err))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faculty Research Publications</Text>

      <ScrollView style={styles.papersList}>
        {researchPapers.map((paper) => (
          <ListItem
            key={paper.id}
            title={paper.title}
            subtitle={`${paper.authors} | ${paper.year}`}
            rightComponent={
              paper.pdfUrl ? (
                <CustomButton
                  title="Download"
                  onPress={() => handleDownloadPDF(paper.pdfUrl || "")}
                  style={styles.downloadButton}
                  textStyle={styles.downloadButtonText}
                />
              ) : null
            }
          />
        ))}
        {researchPapers.length === 0 && <Text style={styles.noResults}>No research papers available</Text>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.offWhite,
  },
  title: {
    ...commonStyles.title,
    marginBottom: 20,
  },
  papersList: {
    flex: 1,
  },
  downloadButton: {
    height: 40,
    width: 100,
  },
  downloadButtonText: {
    fontSize: 14,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    color: colors.darkGray,
  },
})

export default FacultyResearchScreen

