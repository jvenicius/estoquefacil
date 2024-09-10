import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DashboardTabs() {
    return (

        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#327E8E',
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#C7D1C8',
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
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cadastrar/index"
                options={{
                    headerShown: false,
                    title: 'Cadastrar',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>

    );
}
