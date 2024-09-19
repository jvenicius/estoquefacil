import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
  Button
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/authContext";

const MAX_ATTEMPTS = 3; 
const BLOCK_TIME = 300000; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    checkBlocked(); 
  }, []);

  const checkBlocked = async () => {
    const lastAttemptTime = await AsyncStorage.getItem('lastAttemptTime');
    const failedAttempts = await AsyncStorage.getItem('failedAttempts');

    if (lastAttemptTime && failedAttempts) {
      const currentTime = new Date().getTime();
      if (currentTime - lastAttemptTime < BLOCK_TIME && failedAttempts >= MAX_ATTEMPTS) {
        setResultado('*Conta temporariamente bloqueada. Tente novamente mais tarde.');
      }
    }
  };

  const handleLogin = async (email, password) => {
    setResultado("");
    setCarregando(true);

    
    const lastAttemptTime = await AsyncStorage.getItem('lastAttemptTime');
    const failedAttempts = await AsyncStorage.getItem('failedAttempts');

    if (lastAttemptTime && failedAttempts) {
      const currentTime = new Date().getTime();
      if (currentTime - lastAttemptTime < BLOCK_TIME && failedAttempts >= MAX_ATTEMPTS) {
        setResultado('*Conta temporariamente bloqueada. Tente novamente mais tarde.');
        setCarregando(false);
        return;
      }
    }

    
    const success = await login({ email, password });
    setCarregando(false);

    if (success) {
      router.replace("/dashboard");
      await AsyncStorage.removeItem('failedAttempts'); 
      await AsyncStorage.removeItem('lastAttemptTime');
    } else {
      const newFailedAttempts = (parseInt(failedAttempts) || 0) + 1;
      await AsyncStorage.setItem('failedAttempts', newFailedAttempts.toString());
      await AsyncStorage.setItem('lastAttemptTime', new Date().getTime().toString());

      if (newFailedAttempts >= MAX_ATTEMPTS) {
        setResultado('*Conta temporariamente bloqueada. Tente novamente mais tarde.');
      } else {
        setResultado('*As credenciais informadas estão incorretas');
      }
    }
  };

  const handleWhatsAppSupport = () => {
    const phoneNumber = "+558596979482";
    const message = "Olá, preciso de ajuda com o sistema EstoqueFácil.";
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(whatsappURL)
      .then(() => {
        console.log("WhatsApp aberto com sucesso!");
      })
      .catch(() => {
        alert("O WhatsApp não está instalado ou ocorreu um erro ao abrir.");
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://media.sankhya.com.br/wp-content/uploads/2021/10/gestao-de-estoque-768x403.png",
        }}
        style={styles.headerImage}
      />
      <Text style={styles.title}>EstoqueFácil</Text>
      <Text style={styles.subtitle}>Sistema de gestão e controle</Text>
      <Text style={styles.welcome}>Bem vindo </Text>

      <Text style={styles.label}>Email </Text>
      <TextInput
        style={styles.input}
        placeholder="email@mail.com"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <Button
        title={"Entrar"}
        onPress={async () => {
          await handleLogin(email, password);
        }}
      />

      <Text style={styles.errorText}>{resultado}</Text>

      <ActivityIndicator animating={carregando} />
      <TouchableOpacity onPress={() => router.push("/recover")}>
        <Text style={styles.forgotPassword}>Recuperar senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={handleWhatsAppSupport}
      >
        <Text style={styles.whatsappText}>Fale com o suporte via WhatsApp</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        O acesso é criado pelo gerente da sua empresa. Entrar em contato caso
        precise de um novo acesso.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f5e65",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  welcome: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 10,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 5,
  },
  forgotPassword: {
    color: "#0f5e65",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  whatsappButton: {
    marginTop: 20,
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 8,
  },
  whatsappText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 12,
  },
});
