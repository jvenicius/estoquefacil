import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router"; // Para navegação e parâmetros
import supabase from "../database/database";

export default function AtualizarProduto() {
  const navigation = useNavigation();
  const router = useRouter();
  const { produtoId } = useLocalSearchParams();

  const [produto, setProduto] = useState(null);
  const [sku, setSku] = useState("");
  const [nome, setNome] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [lote, setLote] = useState("");
  const [estoque, setEstoque] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: "Atualizar Produto",
      headerStyle: {
        backgroundColor: "#327E8E", // Cor verde para o header
      },
      headerTintColor: "#fff", // Cor do texto no header
    });

    const fetchProduto = async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", produtoId)
        .single();

      if (data) {
        setProduto(data);
        setSku(data.sku);
        setNome(data.nome);
        setFornecedor(data.fornecedor);
        setLote(data.lote);
        setEstoque(data.estoque);
      }
      if (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduto();
  }, [produtoId]);

  // Função para atualizar o produto no banco de dados
  const handleUpdate = async () => {
    const { error } = await supabase
      .from("produtos")
      .update({
        sku,
        nome,
        fornecedor,
        lote,
        estoque,
      })
      .eq("id", produtoId);

    if (!error) {
      console.log("Produto atualizado com sucesso!");
      setMensagem("Produto atualizado com sucesso!");
    } else {
      setMensagem("Erro ao atualizar produto:", error);
      console.error("Erro ao atualizar produto:", error);
    }
  };

  // Função para apagar o produto do banco de dados
  const handleDelete = async () => {
    const { error } = await supabase
      .from("produtos")
      .delete()
      .eq("id", produtoId);

    if (!error) {
      console.log("Produto excluído com sucesso!");
      setMensagem("Produto excluído com sucesso!");
      router.push("/dashboard");
    } else {
      console.error("Erro ao excluir produto:", error);
      setMensagem("Erro ao excluir produto:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ATUALIZAR PRODUTO</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={sku}
          onChangeText={setSku}
          label="SKU"
          testID="sku-input"
        />
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          label="Nome"
          testID="nome-input"
        />
        <TextInput
          style={styles.input}
          value={fornecedor}
          onChangeText={setFornecedor}
          label="Fornecedor"
          testID="fornecedor-input"
        />
        <TextInput
          style={styles.input}
          value={lote}
          onChangeText={setLote}
          label="Lote"
          testID="lote-input"
        />
        <TextInput
          style={styles.input}
          value={estoque}
          onChangeText={setEstoque}
          label="Estoque"
          testID="estoque-input"
        />

        <TouchableOpacity
          style={styles.updateButton}
          testID="atualizar-button"
          onPress={handleUpdate}
        >
          <Text style={styles.updateButtonText}>ATUALIZAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          testID="excluir-button"
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>EXCLUIR</Text>
        </TouchableOpacity>
      </View>

      <Text
        testID="mensagem-text"
        style={{
          textAlign: "center",
          fontSize: 16,
          marginTop: 10,
          fontWeight: 500,
        }}
      >
        {mensagem}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7D1C8",
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    alignSelf: "center",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#4B8A96",
  },
  updateButton: {
    backgroundColor: "#4B8A96",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
