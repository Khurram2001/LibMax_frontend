"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Linking, ActivityIndicator, Alert, Modal, TouchableOpacity, Platform } from "react-native"
import { WebView } from 'react-native-webview'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../types/navigation"
import { colors, commonStyles } from "../../styles/theme"
import CustomButton from "../../components/CustomButton"
import ListItem from "../../components/ListItem"
import { getAllEbooks } from "../../services/api"

type Props = NativeStackScreenProps<RootStackParamList, "EBooks">

// Interface that matches what we need from backend
interface SimplifiedEBook {
  id: string;
  title: string;
  authors: string;
  pdfUrl: string;
}

const EBooksScreen: React.FC<Props> = () => {
  const [ebooks, setEbooks] = useState<SimplifiedEBook[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null)
  const [isPdfModalVisible, setIsPdfModalVisible] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [downloadProgress, setDownloadProgress] = useState<number>(0)

  useEffect(() => {
    loadEbooks()
  }, [])

  const loadEbooks = async () => {
    setIsLoading(true)
    try {
      const data = await getAllEbooks()
      
      // Map the backend data to our simplified format
      const simplifiedData = data.map((item: any) => ({
        id: item._id,
        title: item.title,
        authors: item.authors,
        pdfUrl: item.pdfUrl,
      }))
      
      setEbooks(simplifiedData)
    } catch (error) {
      console.error("Error loading ebooks:", error)
      Alert.alert("Error", "Failed to load ebooks")
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewPDF = (pdfUrl: string) => {
    if (!pdfUrl) {
      Alert.alert("Error", "PDF URL is not available")
      return
    }
    
    setSelectedPdfUrl(pdfUrl)
    setIsPdfModalVisible(true)
  }

  const handleDownloadPDF = async (pdfUrl: string, title: string) => {
    if (!pdfUrl) {
      Alert.alert("Error", "PDF URL is not available")
      return
    }
    
    // For web, just open in browser
    if (Platform.OS === 'web') {
      Linking.openURL(pdfUrl)
      return
    }
    
    try {
      // Request permission for storage (Android only)
      if (Platform.OS === 'android') {
        const { status } = await MediaLibrary.requestPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert("Permission needed", "Storage permission is required to download files")
          return
        }
      }
      
      setIsDownloading(true)
      
      // Generate a safe filename
      const filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf'
      const fileUri = FileSystem.documentDirectory + filename
      
      // Download the file with progress tracking
      const downloadResumable = FileSystem.createDownloadResumable(
        pdfUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite
          setDownloadProgress(progress)
        }
      )
      
      const downloadResult = await downloadResumable.downloadAsync()
      
      // Fix for FileSystemDownloadResult.uri property
      if (downloadResult && downloadResult.uri) {
        // Save to media library (for Android)
        if (Platform.OS === 'android') {
          const asset = await MediaLibrary.createAssetAsync(downloadResult.uri)
          await MediaLibrary.createAlbumAsync("Downloads", asset, false)
        }
        
        Alert.alert(
          "Download Complete", 
          "The PDF has been downloaded successfully",
          [
            { 
              text: "Open", 
              onPress: () => Linking.openURL(downloadResult.uri) 
            },
            { text: "OK" }
          ]
        )
      }
      
      setIsDownloading(false)
      setDownloadProgress(0)
    } catch (error) {
      console.error("Error downloading file:", error)
      setIsDownloading(false)
      Alert.alert("Download Failed", "There was an error downloading the file")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Books Collection</Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.navyBlue} />
          <Text style={styles.loadingText}>Loading e-books...</Text>
        </View>
      ) : (
        <ScrollView style={styles.ebooksList}>
          {ebooks.length > 0 ? (
            ebooks.map((ebook) => (
              <ListItem
                key={ebook.id}
                title={ebook.title}
                subtitle={ebook.authors}
                rightComponent={
                  <View style={styles.buttonContainer}>
                    {ebook.pdfUrl && (
                      <>
                        <CustomButton
                          title="View"
                          onPress={() => handleViewPDF(ebook.pdfUrl)}
                          style={styles.viewButton}
                          textStyle={styles.buttonText}
                        />
                        <CustomButton
                          title="Download"
                          onPress={() => handleDownloadPDF(ebook.pdfUrl, ebook.title)}
                          style={styles.downloadButton}
                          textStyle={styles.buttonText}
                          disabled={isDownloading}
                        />
                      </>
                    )}
                  </View>
                }
                onPress={() => ebook.pdfUrl && handleViewPDF(ebook.pdfUrl)}
              />
            ))
          ) : (
            <Text style={styles.noResults}>No e-books found</Text>
          )}
        </ScrollView>
      )}

      {/* Download Progress Indicator */}
      {isDownloading && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${downloadProgress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{`${Math.round(downloadProgress * 100)}%`}</Text>
          <CustomButton 
            title="Cancel" 
            onPress={() => setIsDownloading(false)}
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
        </View>
      )}

      {/* PDF Viewer Modal */}
      <Modal
        visible={isPdfModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsPdfModalVisible(false)}
      >
        <View style={styles.pdfModalContainer}>
          <View style={styles.pdfHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsPdfModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          
          {selectedPdfUrl ? (
            <WebView
              source={{ uri: selectedPdfUrl }}
              style={styles.webView}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.webViewLoading}>
                  <ActivityIndicator size="large" color={colors.navyBlue} />
                </View>
              )}
              onError={() => {
                Alert.alert("Error", "Could not load PDF");
                setIsPdfModalVisible(false);
              }}
            />
          ) : (
            <View style={styles.pdfErrorContainer}>
              <Text style={styles.pdfErrorText}>Could not load PDF</Text>
            </View>
          )}
        </View>
      </Modal>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.darkGray,
  },
  ebooksList: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  viewButton: {
    height: 30,
    width: 80,
    backgroundColor: colors.navyBlue,
  },
  downloadButton: {
    height: 30,
    width: 80,
  },
  buttonText: {
    fontSize: 12,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    color: colors.darkGray,
  },
  pdfModalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdfHeader: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.navyBlue,
    paddingHorizontal: 15,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webView: {
    flex: 1,
  },
  webViewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfErrorText: {
    fontSize: 18,
    color: colors.error,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.navyBlue,
  },
  progressText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButton: {
    height: 30,
    width: 70,
    backgroundColor: colors.error,
  },
  cancelButtonText: {
    fontSize: 12,
  },
})

export default EBooksScreen