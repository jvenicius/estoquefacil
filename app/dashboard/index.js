import { View, StyleSheet } from "react-native";
import { Text, Avatar, ActivityIndicator, IconButton, MD3Colors } from "react-native-paper";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/authContext";
import { useState, useEffect } from "react";


export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    const error = await logout();

    if (error) {
      console.error('Erro ao fazer logout:', error.message);
    } else {
      router.replace('/');
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace('/');
    }
  }, [isMounted, isAuthenticated]);

  if (!isMounted || !isAuthenticated) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
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
          <Text style={styles.accountName} variant="bodyLarge">
            Olá, senhor(a).
          </Text>
          <IconButton
            icon="logout"
            iconColor={MD3Colors.neutral99}
            size={20}
            onPress={() => handleLogout()}
            style={{ alignSelf: "flex-end" }}
          />
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
    fontWeight: "bold", // Usar "bold" como alternativa para compatibilidade
  },
  subTitle: {
    color: "#FFF",
  },
  accountInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    justifyContent: "space-between"
  },
  accountName: {
    color: "#FFF",
    marginLeft: 10,
  },

});
