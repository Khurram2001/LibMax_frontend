import type React from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { colors } from "../styles/theme"
import CustomButton from "./CustomButton"

interface CustomModalProps {
  visible: boolean
  title: string
  message?: string
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  children?: React.ReactNode
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>

          {message && <Text style={styles.modalText}>{message}</Text>}

          {children}

          <View style={styles.buttonContainer}>
            {onConfirm && <CustomButton title={confirmText} onPress={onConfirm} style={styles.button} />}
            <CustomButton title={cancelText} onPress={onClose} type="secondary" style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: colors.offWhite,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.navyBlue,
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: colors.darkGray,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
})

export default CustomModal

