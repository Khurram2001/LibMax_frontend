// "use client"

// import type React from "react"
// import { useState } from "react"
// import { View, Text, StyleSheet, ScrollView } from "react-native"
// import { colors, commonStyles } from "../../../styles/theme"
// import CustomButton from "../../../components/CustomButton"
// import CustomInput from "../../../components/CustomInput"
// import CustomModal from "../../../components/CustomModal"
// import ListItem from "../../../components/ListItem"
// import type { ResearchPaper } from "../../../types/navigation"

// // Mock data (adjusted to match type)
// const mockResearchPapers: ResearchPaper[] = [
//   {
//     id: "1",
//     title: "Machine Learning Applications in Healthcare",
//     authors: "Dr. Sarah Johnson",
//     year: "2022",
//     subject: "AI in Healthcare",
//     callNumber: "D123",
//     accessionNumber: "A1001",
//     language: "English",
//     pages: 15,
//     publisher: "Springer",
//     doi: "10.1000/mlhc2022",
//     volumeIssue: "Vol. 1, Issue 2",
//     journalName: "International Journal of ML",
//     paperType: "Journal",
//     impactFactor: 3.5,
//     sdg: "SDG 3 - Good Health and Well-being",
//     category: "Computer Science",
//     pdfUrl: "https://example.com/research1.pdf",
//   },
// ]

// const ResearchManagement: React.FC = () => {
//   const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>(mockResearchPapers)
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false)
//   const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null)

//   const [newPaper, setNewPaper] = useState<Partial<ResearchPaper>>({
//     title: "",
//     authors: "",
//     year: "",
//     subject: "",
//     callNumber: "",
//     accessionNumber: "",
//     language: "",
//     pages: 0,
//     publisher: "",
//     doi: "",
//     volumeIssue: "",
//     journalName: "",
//     paperType: "",
//     impactFactor: undefined,
//     sdg: "",
//     category: "",
//     pdfUrl: "",
//   })

//   const handleAddPaper = () => {
//     if (!newPaper.title || !newPaper.authors || !newPaper.year || !newPaper.subject) {
//       return
//     }

//     const paperToAdd: ResearchPaper = {
//       id: Date.now().toString(),
//       title: newPaper.title!,
//       authors: newPaper.authors!,
//       year: newPaper.year!,
//       subject: newPaper.subject!,
//       callNumber: newPaper.callNumber || "",
//       accessionNumber: newPaper.accessionNumber || "",
//       language: newPaper.language || "",
//       pages: newPaper.pages || 0,
//       publisher: newPaper.publisher || "",
//       doi: newPaper.doi || "",
//       volumeIssue: newPaper.volumeIssue || "",
//       journalName: newPaper.journalName || "",
//       paperType: newPaper.paperType || "",
//       impactFactor: newPaper.impactFactor,
//       sdg: newPaper.sdg,
//       category: newPaper.category || "",
//       pdfUrl: newPaper.pdfUrl,
//     }

//     setResearchPapers([...researchPapers, paperToAdd])
//     setIsAddModalVisible(false)
//     setNewPaper({
//       title: "",
//       authors: "",
//       year: "",
//       subject: "",
//       callNumber: "",
//       accessionNumber: "",
//       language: "",
//       pages: 0,
//       publisher: "",
//       doi: "",
//       volumeIssue: "",
//       journalName: "",
//       paperType: "",
//       impactFactor: undefined,
//       sdg: "",
//       category: "",
//       pdfUrl: "",
//     })
//   }

//   const handleDeletePaper = (paper: ResearchPaper) => {
//     setResearchPapers(researchPapers.filter((p) => p.id !== paper.id))
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Faculty Research Publications</Text>

//       <View style={styles.buttonContainer}>
//         <CustomButton
//           title="Add Research Paper"
//           onPress={() => setIsAddModalVisible(true)}
//           style={styles.actionButton}
//         />
//       </View>

//       <CustomModal
//         visible={isAddModalVisible}
//         title="Add Research Paper"
//         onClose={() => setIsAddModalVisible(false)}
//         onConfirm={handleAddPaper}
//         confirmText="Add Paper"
//       >
//         <ScrollView style={styles.modalContent}>
//           <CustomInput label="Title" value={newPaper.title} onChangeText={(text) => setNewPaper({ ...newPaper, title: text })} />
//           <CustomInput label="Author(s)" value={newPaper.authors} onChangeText={(text) => setNewPaper({ ...newPaper, authors: text })} />
//           <CustomInput label="Year" value={newPaper.year} onChangeText={(text) => setNewPaper({ ...newPaper, year: text })} />
//           <CustomInput label="Subject" value={newPaper.subject} onChangeText={(text) => setNewPaper({ ...newPaper, subject: text })} />
//           <CustomInput label="Call Number" value={newPaper.callNumber} onChangeText={(text) => setNewPaper({ ...newPaper, callNumber: text })} />
//           <CustomInput label="Accession Number" value={newPaper.accessionNumber} onChangeText={(text) => setNewPaper({ ...newPaper, accessionNumber: text })} />
//           <CustomInput label="Language" value={newPaper.language} onChangeText={(text) => setNewPaper({ ...newPaper, language: text })} />
//           <CustomInput label="Pages" value={newPaper.pages?.toString()} keyboardType="numeric" onChangeText={(text) => setNewPaper({ ...newPaper, pages: parseInt(text) || 0 })} />
//           <CustomInput label="Publisher" value={newPaper.publisher} onChangeText={(text) => setNewPaper({ ...newPaper, publisher: text })} />
//           <CustomInput label="DOI" value={newPaper.doi} onChangeText={(text) => setNewPaper({ ...newPaper, doi: text })} />
//           <CustomInput label="Volume/Issue" value={newPaper.volumeIssue} onChangeText={(text) => setNewPaper({ ...newPaper, volumeIssue: text })} />
//           <CustomInput label="Journal Name" value={newPaper.journalName} onChangeText={(text) => setNewPaper({ ...newPaper, journalName: text })} />
//           <CustomInput label="Paper Type" value={newPaper.paperType} onChangeText={(text) => setNewPaper({ ...newPaper, paperType: text })} />
//           <CustomInput label="Impact Factor" value={newPaper.impactFactor?.toString()} keyboardType="numeric" onChangeText={(text) => setNewPaper({ ...newPaper, impactFactor: parseFloat(text) })} />
//           <CustomInput label="SDG" value={newPaper.sdg} onChangeText={(text) => setNewPaper({ ...newPaper, sdg: text })} />
//           <CustomInput label="Category" value={newPaper.category} onChangeText={(text) => setNewPaper({ ...newPaper, category: text })} />
//           <CustomInput label="PDF URL" value={newPaper.pdfUrl} onChangeText={(text) => setNewPaper({ ...newPaper, pdfUrl: text })} />
//         </ScrollView>
//       </CustomModal>

//       <ScrollView style={styles.papersList}>
//         <Text style={styles.subtitle}>Current Research Papers</Text>
//         {researchPapers.map((paper) => (
//           <ListItem
//             key={paper.id}
//             title={paper.title}
//             subtitle={`${paper.authors} | ${paper.year}`}
//             rightComponent={
//               <CustomButton
//                 title="Delete"
//                 onPress={() => handleDeletePaper(paper)}
//                 type="secondary"
//                 style={styles.deleteButton}
//                 textStyle={styles.deleteButtonText}
//               />
//             }
//           />
//         ))}
//         {researchPapers.length === 0 && <Text style={styles.noResults}>No research papers available</Text>}
//       </ScrollView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   title: { ...commonStyles.title, marginBottom: 20 },
//   subtitle: { ...commonStyles.subtitle, marginTop: 10, marginBottom: 10 },
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
//   actionButton: { flex: 1, marginHorizontal: 5 },
//   papersList: { flex: 1 },
//   deleteButton: { height: 30, width: 80, backgroundColor: colors.error },
//   deleteButtonText: { fontSize: 12 },
//   noResults: { textAlign: "center", marginTop: 20, color: colors.darkGray },
//   modalContent: { maxHeight: 500 },
// })

// export default ResearchManagement

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { colors, commonStyles } from "../../../styles/theme"
import CustomButton from "../../../components/CustomButton"
import CustomInput from "../../../components/CustomInput"
import CustomModal from "../../../components/CustomModal"
import ListItem from "../../../components/ListItem"
import type { ResearchPaper } from "../../../types/navigation"
import { createResearchPaper, getResearchPapers, deleteResearchPaper } from "../../../services/api"

const ResearchManagement: React.FC = () => {
  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>([])
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null)

  const [newPaper, setNewPaper] = useState<Partial<ResearchPaper> & { file?: any }>({
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
    file: null,
  })

  const loadResearchPapers = async () => {
    setIsLoading(true)
    try {
      const data = await getResearchPapers()
      
      // Map backend fields to match the frontend ResearchPaper interface
      const mappedData = data.map((item: any) => ({
        id: item._id, // Map _id to id for frontend compatibility
        title: item.title,
        authors: item.authors,
        year: item.year,
        subject: item.subject,
        callNumber: item.callNumber,
        accessionNumber: item.accessionNumber,
        language: item.language,
        pages: item.pages,
        publisher: item.publisher,
        doi: item.doi,
        volumeIssue: item.volumeIssue,
        journalName: item.journalName,
        paperType: item.paperType,
        impactFactor: item.impactFactor,
        sdg: item.sdg,
        category: item.category,
        pdfUrl: item.pdfUrl,
      }))
      
      setResearchPapers(mappedData)
    } catch (error) {
      console.error("Error loading research papers:", error)
      Alert.alert("Error", "Failed to load research papers")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResearchPapers()
  }, [])

// Updated handlePickPDF function in ResearchManagement.tsx:
const handlePickPDF = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    
    console.log("DocumentPicker result:", result);
    
    if (result.assets && result.assets.length > 0 && !result.canceled) {
      // This is critical - use the asset directly as in EBookManagement
      //@ts-ignore
      const fileAsset = result?.output[0];
      setNewPaper({ 
        ...newPaper, 
        file: fileAsset
      })
    }
  } catch (error) {
    console.error("Error picking document:", error);
    Alert.alert("Error", "Failed to select document");
  }
}

  const handleAddPaper = async () => {
    if (!newPaper.title || !newPaper.authors || !newPaper.year || !newPaper.subject ||
        !newPaper.callNumber || !newPaper.accessionNumber || !newPaper.language ||
        !newPaper.pages || !newPaper.publisher || !newPaper.doi ||
        !newPaper.volumeIssue || !newPaper.journalName || !newPaper.paperType ||
        !newPaper.impactFactor || !newPaper.sdg || !newPaper.category || !newPaper.file) {
      Alert.alert("Error", "All fields are required including PDF file")
      return
    }

    setIsLoading(true)
    try {
      console.log("Adding research paper:", newPaper) // Log for debugging
      const response = await createResearchPaper({
        title: newPaper.title!,
        authors: newPaper.authors!,
        year: newPaper.year!,
        subject: newPaper.subject!,
        callNumber: newPaper.callNumber!,
        accessionNumber: newPaper.accessionNumber!,
        language: newPaper.language!,
        pages: newPaper.pages || 0,
        publisher: newPaper.publisher!,
        doi: newPaper.doi!,
        volumeIssue: newPaper.volumeIssue!,
        journalName: newPaper.journalName!,
        paperType: newPaper.paperType!,
        impactFactor: newPaper.impactFactor || 0,
        sdg: newPaper.sdg!,
        category: newPaper.category!,
        file: newPaper.file,
      })
      
      console.log("Research paper creation response:", response) // Log for debugging
      
      if (response.success) {
        Alert.alert("Success", "Research paper added successfully")
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
          file: null,
        })
        await loadResearchPapers()
      } else {
        Alert.alert("Error", response.message || "Failed to add research paper")
      }
    } catch (error) {
      console.error("Error adding research paper:", error)
      Alert.alert("Error", "Failed to add research paper. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePaper = async (paper: ResearchPaper) => {
    setIsLoading(true)
    try {
      console.log("Deleting paper with ID:", paper.id) // Log for debugging
      const response = await deleteResearchPaper(paper.id)
      
      console.log("Delete response:", response) // Log for debugging
      
      if (response.success) {
        Alert.alert("Success", "Research paper deleted successfully")
        await loadResearchPapers()
      } else {
        Alert.alert("Error", response.message || "Failed to delete research paper")
      }
    } catch (error) {
      console.error("Error deleting research paper:", error)
      Alert.alert("Error", "Failed to delete research paper")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faculty Research Publications</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Add Research Paper"
          onPress={() => setIsAddModalVisible(true)}
          style={styles.actionButton}
          disabled={isLoading}
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
          
          {/* Replace PDF URL input with PDF file picker */}
          <CustomButton
            title={newPaper.file ? `PDF Selected: ${newPaper.file.name || 'document.pdf'}` : "Select PDF File"}
            onPress={handlePickPDF}
            style={{ marginTop: 10 }}
            disabled={isLoading}
          />
        </ScrollView>
      </CustomModal>

      <ScrollView style={styles.papersList}>
        <Text style={styles.subtitle}>Current Research Papers</Text>
        {isLoading ? (
          <Text style={styles.noResults}>Loading research papers...</Text>
        ) : researchPapers.length > 0 ? (
          researchPapers.map((paper) => (
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
                  disabled={isLoading}
                />
              }
            />
          ))
        ) : (
          <Text style={styles.noResults}>No research papers available</Text>
        )}
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