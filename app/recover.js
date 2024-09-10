import {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';


export default function Recover({navigation}) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordRecovery = () => {
    setSuccess(true);
    Alert.alert('Email de recuperação enviado com sucesso');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://media.sankhya.com.br/wp-content/uploads/2021/10/gestao-de-estoque-768x403.png' }} style={styles.headerImage} />
      <Text style={styles.title}>EstoqueFácil</Text>
      <Text style={styles.subtitle}>Sistema de gestão e controle</Text>
      <Text style={styles.welcome}>Recuperação de senha</Text>

      {!success?(
        <>
          <Text style={styles.label}>Email </Text>
          <TextInput
            style={styles.input}
            placeholder="email@mail.com"
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery}>
            <Text style = {styles.buttonText}> Enviar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.successMessage}>
            <Text>Email de recuperação enviado com sucesso</Text>
        </View>
      )}      

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
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingBottom:20,
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
  button: {
    backgroundColor: '#0f5e65',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  footerText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 12,
  },
  successMessage: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#E0FFE0',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
});
