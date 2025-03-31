import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useQuery } from "react-query";
import axios from "axios";
import { User } from "@/types/User";
import { Loading } from "@/components/Loading";

const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  return response.data.map(({ id, ...user }: any) => {
    return {
      id: String(id),
      ...user,
    };
  });
};

const Index = () => {
  const { isLoading, isError, data } = useQuery("users", getUsers);
  const router = useRouter();
  const [search, setSearch] = useState("");

  if (isLoading) return <Loading text="Carregando usuários..." />;
  if (isError)
    return <Text style={styles.errorText}>Erro ao carregar usuários</Text>;

  const filteredData = data?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const onSelectUser = (item: User) => {
    const queryParams = new URLSearchParams();
    queryParams.append("userId", item.id);
    router.push(`/albums?${queryParams.toString()}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Busque usuários..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSelectUser(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Index;
