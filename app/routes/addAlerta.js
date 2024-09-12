import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";


export default function criarAlerta () {


  const [produto, setProduto] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const [estoqueAtual, setEstoqueAtual] = useState('');

  const handleSave = () => {
    if (!produto || !estoqueMinimo || !estoqueAtual) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    Alert.alert('Sucesso', 'Alerta de estoque criado com sucesso');

    setProduto('');
    setEstoqueMinimo('');
    setEstoqueAtual('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text style={styles.menuTitle}>CRIAR ALERTA</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={produto}
          onChangeText={setProduto}
          placeholder="Produto ou SKU"
        />
        <TextInput
          style={styles.input}
          value={estoqueMinimo}
          onChangeText={setEstoqueMinimo}
          placeholder="Volume em unidades"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={estoqueAtual}
          onChangeText={setEstoqueAtual}
          placeholder="Nome do alerta"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E5DC',
  },
  header: {
    backgroundColor: '#4B8A96',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  menuTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 100,
    marginTop: 30,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  saveButton: {
    backgroundColor: '#4B8A96',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4B8A96',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
  },
});


