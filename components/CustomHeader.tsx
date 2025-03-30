import { SafeAreaView, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";

type CustomHeaderProps = {
  route: RouteProp<Record<string, object | undefined>, string>;
};

export function CustomHeader({ route }: CustomHeaderProps) {
  // Define os títulos para cada rota
  const getHeaderData = () => {
    switch (route.name) {
      case "Albums":
        return {
          title: "Albums",
          subtitle: "Select one album to view",
        };
      case "index":
        return {
          title: "Usuários",
          subtitle: "Selecione o usuário para entrar",
        };
      case "gallery":
        return {
          title: "Fotos",
          subtitle: "Itália",
        };
      default:
        return {
          title: route.name || "App",
          subtitle: "",
        };
    }
  };

  const { title, subtitle } = getHeaderData();

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingVertical: 20 }}>
      <View style={{ alignItems: "center", paddingTop: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        {subtitle ? (
          <Text style={{ fontSize: 16, color: "gray" }}>{subtitle}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
