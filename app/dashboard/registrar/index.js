import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { inserirNoBanco } from "../../../database/services";

import {TextInput }from "react-native-paper";

export default function Registrar() {

  const [sku, setSku] = useState("");
  const [nome, setNome] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [lote, setLote] = useState("");
  const [estoque, setEstoque] = useState("");

  let data = {
    tabela: 'produto',
    dados: {},
    
  }

  const handleRegister = () => {
    console.log("Produto registrado:", {
      sku,
      nome,
      fornecedor,
      lote,
      estoque,
    });
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
        />
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          label="Nome"
        />
        <TextInput
          style={styles.input}
          value={fornecedor}
          onChangeText={setFornecedor}
          label="Fornecedor"
        />
        <TextInput
          style={styles.input}
          value={lote}
          onChangeText={setLote}
          label="Lote"
        />
        <TextInput
          style={styles.input}
          value={estoque}
          onChangeText={setEstoque}
          label="Estoque"
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText} onPress={async () => await inserirNoBanco()}>REGISTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    borderColor: '#4B8A96',
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

