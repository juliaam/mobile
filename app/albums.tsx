import { Loading } from "@/components/Loading";
import { Album } from "@/types/Album";
import axios from "axios";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { useQuery } from "react-query";

const getAlbums = async (userId: string): Promise<Album[]> => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
  );
  return response.data;
};

const AlbumsScreen = () => {
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("userId");

  const { isLoading, isError, data } = useQuery("albums", () => {
    if (userId) {
      return getAlbums(userId);
    }
  });

  if (isLoading) return <Loading text="Carregando álbums..." />;
  if (isError || !userId) return Alert.alert("Erro", "Algo deu errado");

  const handleAlbumPress = (album: Album) => {
    const queryParams = new URLSearchParams();
    queryParams.append("albumId", String(album.id));
    queryParams.append("albumTitle", album.title);
    router.push(`/photos?${queryParams.toString()}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.albumContainer}
        showsVerticalScrollIndicator={false}
      >
        {data?.map((album) => (
          <TouchableOpacity
            key={album.id}
            style={styles.albumItem}
            onPress={() => handleAlbumPress(album)}
            activeOpacity={0.7}
          >
            <Text style={styles.albumText}>{album.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

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
