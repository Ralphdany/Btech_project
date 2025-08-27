import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import { loginUser, registerUser, getProfile } from "../services/authService";
import { getAllUsers } from "../services/userService";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

type Users = { _id: string; name: string; email: string }[];

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  CurrentUser: userType | null;
  allUsers: userType[];
  error: string;
  isLoading: boolean;
  getAllUsers: (token: string) => Promise<Users>;
}
interface userType {
  _id: string;
  name: string;
  email: string;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [CurrentUser, setCurrentUser] = useState<userType | null>(null);
  const [allUsers, setAllUsers] = useState<userType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          console.log(storedToken);
          const CurrentUserData = await getProfile(storedToken);
          const allUsersData = await getAllUsers(storedToken);
          setToken(storedToken);
          setCurrentUser(CurrentUserData.data);
          setAllUsers(allUsersData);
          // // console.log("Current User:", CurrentUserData.data)
          // console.log("All Users:", allUsersData);
        }
      } catch (err) {
        console.log("Error loading token", err);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await loginUser({ email, password });
      const { token } = data.data;
      await SecureStore.setItemAsync("token", token);
      const currentUser = await getProfile(token);
      const users = await getAllUsers(token)
      setCurrentUser(currentUser.data);
      setAllUsers(users);
      setToken(token);
      Alert.alert("Success", "Login successful!");
    } catch (err) {
      console.log("Login error:", err);
      if (err instanceof Error) {
        Alert.alert("Error", err.message);
      } else {
        Alert.alert("Error", "An error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await registerUser({ name, email, password });
      console.log("data", data);
      Alert.alert("Success", "Account created successfully! Please login.");
      router.replace("/SignIn");
    } catch (err) {
      console.log("Signup error:", err);
      if (err instanceof Error) {
        Alert.alert("Error", err.message);
      } else {
        Alert.alert("Error", "An error occurred during signup");
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      setCurrentUser(null);
      router.replace("/SignIn");
      Alert.alert("Success", "Logged out successfully!");
    } catch (err) {
      console.log("Sign out error:", err);
      Alert.alert("Error", "An error occurred during sign out");
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    token,
    login,
    signUp,
    CurrentUser,
    signOut,
    isLoading,
    error,
    getAllUsers,
    allUsers,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
