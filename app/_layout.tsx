import { Stack } from 'expo-router';
// import { Provider as AuthProvider } from '@/context/authContext';
import './global.css'

export default function Layout() {
  const isSignedIn = false
  return (
    <Stack>
      { isSignedIn ? 
        <Stack.Screen name="(tabs)"  options={{headerShown: false}} />
        :
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
    }
      
    </Stack>

  );
}
