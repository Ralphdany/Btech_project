import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl font-bold py-10">Edit app/index.tsx to edit this screen.</Text>
      <Link href='/SignUp'>Go to Sign Up page</Link>
    </View>
  );
}
