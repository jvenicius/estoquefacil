import { Stack } from 'expo-router';
import { AuthProvider } from '../hooks/authContext';

export default function Layout() {

    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen
                    name="dashboard"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="login"
                    options={{ headerShown: false }}
                />
            </Stack>
        </AuthProvider>
    );
}
