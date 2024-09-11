import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AlertaIndex() {
  const alertas = [];
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>GERENCIAR ALERTAS</Text>

        {alertas.length === 0 ? (
          <Text style={styles.noAlertText}>
            Nenhum registro de alerta foi encontrado
          </Text>
        ) : (
          alertas.map((alerta) => (
            <View key={alerta.id} style={styles.alertItem}>
              <Text>{alerta.name}</Text>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/dashboard/alertas/addAlerta")}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
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
    backgroundColor: "#4B8A96",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 50,
  },
  noAlertText: {
    color: "#000",
    fontSize: 16,
  },
  fab: {
    backgroundColor: "#4B8A96",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 80,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#4B8A96",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 12,
  },
});
