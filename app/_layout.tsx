import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./(tabs)/index";
import Buscar from "./(tabs)/buscar";

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: "Principal" }}
          component={Home}
        />
        <Stack.Screen
          name="Buscar"
          component={Buscar}
          options={{ title: "Autenticação" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
