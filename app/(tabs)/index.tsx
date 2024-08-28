import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text, Avatar } from "react-native-paper";

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} variant="titleLarge">
            EstoqueFácil
          </Text>
          <Text style={styles.subTitle} variant="titleMedium">
            Sistema de Gestão e controle
          </Text>
        </View>
        <View style={styles.accountInfo}>
          <Avatar.Icon
            size={45}
            icon="account"
            color="#000"
            style={{ backgroundColor: "#eee" }}
          />
          <Text style={styles.accountName} variant="bodyLarge">
            Olá, Venícius Santos
          </Text>
        </View>
      </View>
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
