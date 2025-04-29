import { Slot } from "expo-router";
import { AuthProvider } from "../context/authContext";
import "./global.css";

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
