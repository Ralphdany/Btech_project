import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../context/authContext";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}
      >
        <ActivityIndicator size="large" color="cyan" />
      </SafeAreaView>
    );
  }

  if (!token) {
    return <Redirect href="/SignIn" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#06b6d4" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule & Events",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="calendar-o" color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="chatbubbles" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
