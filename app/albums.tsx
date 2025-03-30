import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Button,
} from "react-native";

const AlbumsScreen = () => {
  const router = useRouter();
  // Dados dos álbuns - na prática viria de uma API ou estado
  const albums = Array(6)
    .fill({ name: "Itália" })
    .map((item, index) => ({
      id: index + 1,
      ...item,
    }));

  const handleAlbumPress = (album: any) => {
    console.log("Álbum selecionado:", album.name);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Albums</Text>
        <Text style={styles.subtitle}>Select one album to view</Text>
      </View>

      {/* Lista de Álbuns */}
      <ScrollView
        contentContainerStyle={styles.albumContainer}
        showsVerticalScrollIndicator={false}
      >
        {albums.map((album) => (
          <TouchableOpacity
            key={album.id}
            style={styles.albumItem}
            onPress={() => handleAlbumPress(album)}
            activeOpacity={0.7}
          >
            <Text style={styles.albumText}>{album.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button title="Ir para Álbuns" onPress={() => router.push("/gallery")} />
    </View>
  );
};

// Estilos COMPLETOS definidos aqui mesmo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  albumContainer: {
    paddingBottom: 30,
  },
  albumItem: {
    backgroundColor: "#f8f8f8",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  albumText: {
    fontSize: 18,
    color: "#333",
  },
});

export default AlbumsScreen;
