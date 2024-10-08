import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  Text,
  Avatar,
  ActivityIndicator,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/authContext";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import supabase from "@/database/database";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const { logout } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  const fetchCurrentDate = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Europe/Lisbon');
      const datetime = new Date(response.data.datetime);
      setCurrentDate(formatDate(datetime));
    } catch (error) {
      console.error('Erro ao buscar a data atual:', error);
    }
  };

  const formatDate = (date) => {
    const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} de ${monthName} de ${year}`;
  };

  const handleNavigateToUpdate = (produtoId) => {
    router.push({
      pathname: "/atualizarProduto",
      params: { produtoId },
    });
  };

  const fetchProdutos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("produtos").select("*");

    if (error) {
      console.error("Erro ao buscar produtos:", error.message);
    } else {
      setProdutos(data);
    }
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.nome}</Text>
      <TouchableOpacity onPress={() => handleNavigateToUpdate(item.id)}>
        <Ionicons name="open-outline" size={20} color="#4B8A96" />
      </TouchableOpacity>
    </View>
  );

  const handleLogout = async () => {
    const error = await logout();

    if (error) {
      console.error("Erro ao fazer logout:", error.message);
    } else {
      router.replace("/");
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchCurrentDate()
    fetchProdutos(); 
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace("/");
    }
  }, [isMounted, isAuthenticated]);

  if (!isMounted || !isAuthenticated || loading) {
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
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{currentDate}</Text>
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
      <View>
        <Text style={styles.listTitle}>Produtos</Text>
        <FlatList
          data={produtos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
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
    fontWeight: "bold",
  },
  subTitle: {
    color: "#FFF",
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    justifyContent: "space-between",
  },
  accountName: {
    color: "#FFF",
    marginLeft: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    alignSelf: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
});
