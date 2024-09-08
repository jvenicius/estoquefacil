import {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, CheckBox, ActivityIndicator } from 'react-native';
import { Input, Button } from '@rneui/themed';
import supabase from './database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [resultado,setResultado] = useState('');
  const [carregando,setCarregando] = useState(false);
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://media.sankhya.com.br/wp-content/uploads/2021/10/gestao-de-estoque-768x403.png' }} style={styles.headerImage} />
      <Text style={styles.title}>EstoqueFácil</Text>
      <Text style={styles.subtitle}>Sistema de gestão e controle</Text>
      <Text style={styles.welcome}>Bem vindo </Text>

      <Text style={styles.label}>Email </Text>
      <TextInput
        style={styles.input}
        placeholder="email@mail.com"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={autoLogin}
          onValueChange={setAutoLogin}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>Login automático</Text>
      </View>

      <Button
        title={"Entrar"}
        onPress={
            async () => {
                setResultado('');
                setCarregando(true);
                let { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });
                setCarregando(false);
                if (error === null) {
                    await AsyncStorage.setItem('usuario', email);
                    navigation.navigate('Usuario', { username: email });
                } 
                else {
                    setResultado('*As credenciais informadas estão incorretas');
                }
        }}
      />
      
      <Text style={styles.errorText}>{resultado}</Text>
      
      <ActivityIndicator 
        animating={carregando}
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Recuperar senha</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        O acesso é criado pelo gerente da sua empresa. Entrar em contato caso precise de um novo acesso.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f5e65',
    marginTop: 10,
  },
  errorText: {
    color: 'red', 
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  forgotPassword: {
    color: '#0f5e65',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  footerText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 12,
  },
});
