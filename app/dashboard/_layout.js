import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DashboardTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#327E8E",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#C7D1C8",
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarItemStyle: {
          padding: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="buscar/index"
        options={{
          headerShown: true,
          title: "Buscar produtos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#327E8E",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="registrar/index"
        options={{
          headerShown: true,
          title: "Registrar produto",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#327E8E",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="alertas/index"
        options={{
          headerShown: true,
          title: "Gerenciar alertas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="warning" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#327E8E",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
    </Tabs>
  );
}
