import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import supabase from "../../../database/database";

export default function Buscar() {
  const [sku, setSku] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarProdutos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .or(`sku.ilike.%${sku}%,nome.ilike.%${sku}%`); // Busca por SKU ou nome (case insensitive)

    if (error) {
      console.error("Erro ao buscar produtos:", error.message);
    } else {
      setProdutos(data);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Digite o nome do produto ou SKU</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Pipoca"
        onChangeText={setSku}
        testID="name-input"
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={buscarProdutos}
        testID="pesquisar-button"
      >
        <Text style={styles.searchButtonText}>PESQUISAR</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.resultsContainer} testID="product-list">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <View key={produto.id} style={styles.resultItem}>
                <Text>ID: {produto.id}</Text>
                <Text>Nome: {produto.nome}</Text>
                <Text>Lote: {produto.lote}</Text>
                <Text>Estoque: {produto.estoque}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noResultsText}>Nenhum produto encontrado</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7D1C8",
    padding: 16,
  },
  inputLabel: {
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4B8A96",
    borderRadius: 5,
    backgroundColor: "white",
  },
  searchButton: {
    backgroundColor: "#4B8A96",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
