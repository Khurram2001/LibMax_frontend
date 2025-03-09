"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { colors, commonStyles } from "../../../styles/theme"
import CustomButton from "../../../components/CustomButton"
import CustomInput from "../../../components/CustomInput"
import CustomModal from "../../../components/CustomModal"
import ListItem from "../../../components/ListItem"
import type { ResearchPaper } from "../../../types/navigation"

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
]

const ResearchManagement: React.FC = () => {
  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>(mockResearchPapers)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null)

  // New research paper form state
  const [newPaper, setNewPaper] = useState<Partial<ResearchPaper>>({
    title: "",
    authors: "",
    year: "",
    pdfUrl: "",
  })

  const handleAddPaper = () => {
    // Validate form
    if (!newPaper.title || !newPaper.authors || !newPaper.year) {
      // Show error
      return
    }

    const paperToAdd: ResearchPaper = {
      id: Date.now().toString(), // In a real app, this would come from the backend
      title: newPaper.title || "",
      authors: newPaper.authors || "",
      year: newPaper.year || "",
      pdfUrl: newPaper.pdfUrl,
    }

    setResearchPapers([...researchPapers, paperToAdd])
    setIsAddModalVisible(false)

    // Reset form
    setNewPaper({
      title: "",
      authors: "",
      year: "",
      pdfUrl: "",
    })
  }

  const handleDeletePaper = (paper: ResearchPaper) => {
    setResearchPapers(researchPapers.filter((p) => p.id !== paper.id))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faculty Research Publications</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Add Research Paper"
          onPress={() => setIsAddModalVisible(true)}
          style={styles.actionButton}
        />
      </View>

      {/* Add Research Paper Modal */}
      <CustomModal
        visible={isAddModalVisible}
        title="Add Research Paper"
        onClose={() => setIsAddModalVisible(false)}
        onConfirm={handleAddPaper}
        confirmText="Add Paper"
      >
        <ScrollView style={styles.modalContent}>
          <CustomInput
            label="Title"
            placeholder="Enter research paper title"
            value={newPaper.title}
            onChangeText={(text) => setNewPaper({ ...newPaper, title: text })}
          />
          <CustomInput
            label="Author(s)"
            placeholder="Enter author names"
            value={newPaper.authors}
            onChangeText={(text) => setNewPaper({ ...newPaper, authors: text })}
          />
          <CustomInput
            label="Year of Publication"
            placeholder="Enter publication year"
            value={newPaper.year}
            onChangeText={(text) => setNewPaper({ ...newPaper, year: text })}
            keyboardType="numeric"
          />
          <CustomInput
            label="PDF URL (Optional)"
            placeholder="Enter PDF URL"
            value={newPaper.pdfUrl}
            onChangeText={(text) => setNewPaper({ ...newPaper, pdfUrl: text })}
          />
        </ScrollView>
      </CustomModal>

      {/* Research Papers List */}
      <ScrollView style={styles.papersList}>
        <Text style={styles.subtitle}>Current Research Papers</Text>
        {researchPapers.map((paper) => (
          <ListItem
            key={paper.id}
            title={paper.title}
            subtitle={`${paper.authors} | ${paper.year}`}
            rightComponent={
              <CustomButton
                title="Delete"
                onPress={() => handleDeletePaper(paper)}
                type="secondary"
                style={styles.deleteButton}
                textStyle={styles.deleteButtonText}
              />
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
  },
  title: {
    ...commonStyles.title,
    marginBottom: 20,
  },
  subtitle: {
    ...commonStyles.subtitle,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  papersList: {
    flex: 1,
  },
  deleteButton: {
    height: 30,
    width: 80,
    backgroundColor: colors.error,
  },
  deleteButtonText: {
    fontSize: 12,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    color: colors.darkGray,
  },
  modalContent: {
    maxHeight: 400,
  },
})

export default ResearchManagement

