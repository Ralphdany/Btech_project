import { Stack } from "expo-router";

type Params = {
  userChat?: string;
  userId?: string;
};

export default function ChatsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Chats" }} />
      <Stack.Screen
        name="[userChat]"
        options={({ route }) => {
          const params = route.params as Params;
          return {
            title: params.userChat || "Chat",
          };
        }}
      />
    </Stack>
  );
}