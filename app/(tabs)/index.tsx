import { useAuth } from "@/context/authContext";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { signOut, user} = useAuth()

  const handleSignOut = async () => {
    try {
       signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl font-bold py-10">Hello, {user?.name}</Text>
      <TouchableOpacity
       className="bg-cyan-400 py-4 px-2  font-bold rounded-md"
       onPress={handleSignOut}>
        <Text className="text-lg text-center text-white">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
