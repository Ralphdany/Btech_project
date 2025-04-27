import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@/src/context/authContext';
import { ActivityIndicator, SafeAreaView } from 'react-native';

export default function TabLayout() {
  const { token, isLoading } = useAuth();

  console.log('token', token);

  // ✅ Show loader first
  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="cyan" />
      </SafeAreaView>
    );
  }

  // ✅ Handle auth logic after loading is complete


  if (!token) {
    console.log('Redirecting to sign in');
    return <Redirect href="/SignIn" />;
  }

  //✅ If everything is okay, show tabs
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
