import { Stack } from 'expo-router';

export default function Layout() {
    return (
      <Stack>
        <Stack.Screen name="SignIn"/>
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="ResetPassword"/>
      </Stack>
  
    );
  }