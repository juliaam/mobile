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
  Alert,
} from "react-native";
import axios from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "expo-router/build/hooks";
import { Loading } from "@/components/Loading";
import { Photo } from "@/types/Photo";

const { width } = Dimensions.get("window");

const getPhotos = async (albumId: string): Promise<Photo[]> => {
  const response = await axios.get(
    `https://my-json-server.typicode.com/juliaam/jsplaceholder/photos?albumId=${albumId}`,
  );
  return response.data.map(({ id, ...photo }: any) => {
    return {
      id: String(id),
      ...photo,
    };
  });
};

const GalleryScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const params = useSearchParams();
  const albumId = params.get("albumId");
  const { isLoading, isError, data } = useQuery("photos", () => {
    if (albumId) {
      return getPhotos(albumId);
    }
  });

  if (isLoading) return <Loading text="Carregando fotos..." />;
  if (isError || !albumId) return Alert.alert("Erro", "Algo deu errado");

  const openModal = (image: Photo) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => openModal(item)}>
              <Image source={{ uri: item.url }} style={styles.image} />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.grid}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{selectedImage?.title}</Text>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage.url }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: width * 0.9,
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
  },
  modalTitle: {
    width: "100%",
    padding: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#F0F0F0",
    textAlign: "left",
  },
  modalImage: {
    width: "100%",
    height: width * 0.9,
  },
});

export default GalleryScreen;
