import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

type CustomHeaderProps = {
  route: RouteProp<Record<string, object | undefined>, string>;
};

type Params = {
  userId?: string;
  albumId?: string;
  albumTitle?: string;
};

export function CustomHeader({ route }: CustomHeaderProps) {
  const navigation = useNavigation();

  const getHeaderData = () => {
    switch (route.name) {
      case "albums":
        return {
          title: "Albums",
          subtitle: "Selecione o álbum para visualizar",
        };
      case "index":
        return {
          title: "Usuários",
          subtitle: "Selecione o usuário para entrar",
        };
      case "photos":
        return {
          title: "Fotos",
          subtitle: (route.params as Params)?.albumTitle ?? "",
        };
      default:
        return {
          title: route.name || "App",
          subtitle: "",
        };
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingVertical: 20 }}>
      <View style={styles.header}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}

        <Text style={styles.title}>{getHeaderData().title}</Text>
        <Text style={styles.subtitle}>{getHeaderData().subtitle}</Text>
      </View>
    </SafeAreaView>
  );
}

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
});
