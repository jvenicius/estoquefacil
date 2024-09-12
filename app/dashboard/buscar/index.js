import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from "expo-router";
export default function Buscar() {
    const router = useRouter();
    const [sku, setSku] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.inputLabel}>Digite o nome do produto ou SKU</Text>
            <TextInput style={styles.input} placeholder='Ex.: Pipoca' onChangeText={setSku} />

            <TouchableOpacity 
                style={styles.searchButton}
                onPress={() => router.push('/routes/produtosEncontrados')}
            >
                <Text style={styles.searchButtonText}>PESQUISAR</Text>
                
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C7D1C8',
        padding: 16
    },

    inputLabel: {
        marginBottom: 10,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#4B8A96',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    searchButton: {
        backgroundColor: '#4B8A96',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
