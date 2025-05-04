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

// Mock data (adjusted to match type)
const mockResearchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "Machine Learning Applications in Healthcare",
    authors: "Dr. Sarah Johnson",
    year: "2022",
    subject: "AI in Healthcare",
    callNumber: "D123",
    accessionNumber: "A1001",
    language: "English",
    pages: 15,
    publisher: "Springer",
    doi: "10.1000/mlhc2022",
    volumeIssue: "Vol. 1, Issue 2",
    journalName: "International Journal of ML",
    paperType: "Journal",
    impactFactor: 3.5,
    sdg: "SDG 3 - Good Health and Well-being",
    category: "Computer Science",
    pdfUrl: "https://example.com/research1.pdf",
  },
]

const ResearchManagement: React.FC = () => {
  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>(mockResearchPapers)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null)

  const [newPaper, setNewPaper] = useState<Partial<ResearchPaper>>({
    title: "",
    authors: "",
    year: "",
    subject: "",
    callNumber: "",
    accessionNumber: "",
    language: "",
    pages: 0,
    publisher: "",
    doi: "",
    volumeIssue: "",
    journalName: "",
    paperType: "",
    impactFactor: undefined,
    sdg: "",
    category: "",
    pdfUrl: "",
  })

  const handleAddPaper = () => {
    if (!newPaper.title || !newPaper.authors || !newPaper.year || !newPaper.subject) {
      return
    }

    const paperToAdd: ResearchPaper = {
      id: Date.now().toString(),
      title: newPaper.title!,
      authors: newPaper.authors!,
      year: newPaper.year!,
      subject: newPaper.subject!,
      callNumber: newPaper.callNumber || "",
      accessionNumber: newPaper.accessionNumber || "",
      language: newPaper.language || "",
      pages: newPaper.pages || 0,
      publisher: newPaper.publisher || "",
      doi: newPaper.doi || "",
      volumeIssue: newPaper.volumeIssue || "",
      journalName: newPaper.journalName || "",
      paperType: newPaper.paperType || "",
      impactFactor: newPaper.impactFactor,
      sdg: newPaper.sdg,
      category: newPaper.category || "",
      pdfUrl: newPaper.pdfUrl,
    }

    setResearchPapers([...researchPapers, paperToAdd])
    setIsAddModalVisible(false)
    setNewPaper({
      title: "",
      authors: "",
      year: "",
      subject: "",
      callNumber: "",
      accessionNumber: "",
      language: "",
      pages: 0,
      publisher: "",
      doi: "",
      volumeIssue: "",
      journalName: "",
      paperType: "",
      impactFactor: undefined,
      sdg: "",
      category: "",
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

      <CustomModal
        visible={isAddModalVisible}
        title="Add Research Paper"
        onClose={() => setIsAddModalVisible(false)}
        onConfirm={handleAddPaper}
        confirmText="Add Paper"
      >
        <ScrollView style={styles.modalContent}>
          <CustomInput label="Title" value={newPaper.title} onChangeText={(text) => setNewPaper({ ...newPaper, title: text })} />
          <CustomInput label="Author(s)" value={newPaper.authors} onChangeText={(text) => setNewPaper({ ...newPaper, authors: text })} />
          <CustomInput label="Year" value={newPaper.year} onChangeText={(text) => setNewPaper({ ...newPaper, year: text })} />
          <CustomInput label="Subject" value={newPaper.subject} onChangeText={(text) => setNewPaper({ ...newPaper, subject: text })} />
          <CustomInput label="Call Number" value={newPaper.callNumber} onChangeText={(text) => setNewPaper({ ...newPaper, callNumber: text })} />
          <CustomInput label="Accession Number" value={newPaper.accessionNumber} onChangeText={(text) => setNewPaper({ ...newPaper, accessionNumber: text })} />
          <CustomInput label="Language" value={newPaper.language} onChangeText={(text) => setNewPaper({ ...newPaper, language: text })} />
          <CustomInput label="Pages" value={newPaper.pages?.toString()} keyboardType="numeric" onChangeText={(text) => setNewPaper({ ...newPaper, pages: parseInt(text) || 0 })} />
          <CustomInput label="Publisher" value={newPaper.publisher} onChangeText={(text) => setNewPaper({ ...newPaper, publisher: text })} />
          <CustomInput label="DOI" value={newPaper.doi} onChangeText={(text) => setNewPaper({ ...newPaper, doi: text })} />
          <CustomInput label="Volume/Issue" value={newPaper.volumeIssue} onChangeText={(text) => setNewPaper({ ...newPaper, volumeIssue: text })} />
          <CustomInput label="Journal Name" value={newPaper.journalName} onChangeText={(text) => setNewPaper({ ...newPaper, journalName: text })} />
          <CustomInput label="Paper Type" value={newPaper.paperType} onChangeText={(text) => setNewPaper({ ...newPaper, paperType: text })} />
          <CustomInput label="Impact Factor" value={newPaper.impactFactor?.toString()} keyboardType="numeric" onChangeText={(text) => setNewPaper({ ...newPaper, impactFactor: parseFloat(text) })} />
          <CustomInput label="SDG" value={newPaper.sdg} onChangeText={(text) => setNewPaper({ ...newPaper, sdg: text })} />
          <CustomInput label="Category" value={newPaper.category} onChangeText={(text) => setNewPaper({ ...newPaper, category: text })} />
          <CustomInput label="PDF URL" value={newPaper.pdfUrl} onChangeText={(text) => setNewPaper({ ...newPaper, pdfUrl: text })} />
        </ScrollView>
      </CustomModal>

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
  container: { flex: 1 },
  title: { ...commonStyles.title, marginBottom: 20 },
  subtitle: { ...commonStyles.subtitle, marginTop: 10, marginBottom: 10 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  actionButton: { flex: 1, marginHorizontal: 5 },
  papersList: { flex: 1 },
  deleteButton: { height: 30, width: 80, backgroundColor: colors.error },
  deleteButtonText: { fontSize: 12 },
  noResults: { textAlign: "center", marginTop: 20, color: colors.darkGray },
  modalContent: { maxHeight: 500 },
})

export default ResearchManagement
