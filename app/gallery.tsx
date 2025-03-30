import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const photos = [
  { id: "1", uri: "https://via.placeholder.com/150" },
  { id: "2", uri: "https://via.placeholder.com/150" },
  { id: "3", uri: "https://via.placeholder.com/150" },
  { id: "4", uri: "https://via.placeholder.com/150" },
  { id: "5", uri: "https://via.placeholder.com/150" },
  { id: "6", uri: "https://via.placeholder.com/150" },
];

const GalleryScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    id: string;
    uri: string;
  } | null>(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.grid}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <BlurView intensity={90} style={styles.blurContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {selectedImage && (
                  <Image
                    source={{ uri: selectedImage.uri }}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 15,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#DDD",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  backText: {
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  grid: {
    paddingTop: 10,
    alignItems: "center",
  },
  image: {
    width: width / 3 - 30,
    height: width / 3 - 30,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#DDD",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});

export default GalleryScreen;
