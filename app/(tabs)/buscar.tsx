import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function Buscar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Buscar Produtos",
          headerStyle: { backgroundColor: "#327E8E" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <FontAwesome.Button
              name="arrow-left"
              onPress={() => navigation.goBack()}
              backgroundColor={""}
            />
          ),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7D1C8",
  },
  header: {
    backgroundColor: "#327E8E",
    padding: 16,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontWeight: 700,
  },
  subTitle: {
    color: "#FFF",
  },
  accountInfo: {
    justifyContent: "flex-start",
    gap: 16,
  },
  accountName: {
    color: "#FFF",
  },
});
