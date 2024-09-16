import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import supabase from "../../../database/database";

export default function Registrar() {
  const [sku, setSku] = useState("");
  const [nome, setNome] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [lote, setLote] = useState("");
  const [estoque, setEstoque] = useState("");

  const handleRegister = async () => {
    if (!sku || !nome || !fornecedor || !lote || !estoque) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const dados = {
      tabela: "produto",
      dados: {
        sku: sku,
        nome: nome,
        fornecedor: fornecedor,
        lote: lote,
        estoque: estoque,
      },
    };

    const { data, error } = await supabase
      .from("produtos")
      .insert([dados.dados])
      .select();

    if (!error) {
      Alert.alert("Sucesso", "Produto registrado com sucesso!");
    } else {
      Alert.alert("Erro", "Tente novamente");
    }

    // Limpar os campos após o registro bem-sucedido
    setSku("");
    setNome("");
    setFornecedor("");
    setLote("");
    setEstoque("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRAR PRODUTO</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={sku}
          onChangeText={setSku}
          label="SKU"
          aria-label="SKU"
        />
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          label="Nome"
          aria-label="Nome"
        />
        <TextInput
          style={styles.input}
          value={fornecedor}
          onChangeText={setFornecedor}
          label="Fornecedor"
          aria-label="Fornecedor"
        />
        <TextInput
          style={styles.input}
          value={lote}
          onChangeText={setLote}
          label="Lote"
          aria-label="Lote"
        />
        <TextInput
          style={styles.input}
          value={estoque}
          onChangeText={setEstoque}
          label="Estoque"
          aria-label="Estoque"
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={async () => await handleRegister()}
        >
          <Text style={styles.registerButtonText}>REGISTRAR</Text>
        </TouchableOpacity>
      </View>
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
  registerButton: {
    backgroundColor: "#4B8A96",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
