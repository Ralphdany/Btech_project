import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import { loginUser, registerUser, getProfile } from "../services/authService";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { AxiosError } from "axios";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  isSignedUp: boolean;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: userType | null;
  error: string
  isLoading: boolean
}
interface userType {
  name: string;
  email: string;
}

interface loginResponse {
  token: string
}

interface errorResponse {
  message: string
}


const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<userType | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>("")
  const [isSignedUp, setSignedUp] = useState<boolean>(false) // Start as true

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        console.log(storedToken)
        if (storedToken) {
          const userData = await getProfile(storedToken);
          setToken(storedToken);
          setUser(userData.data);
        console.log(storedToken)

        }
      } catch (err) {
        console.log("Error loading token", err);
      } finally {
        setLoading(false);
      }
    };
  
    loadToken();
  }, [token]);



  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      const { token } = data as loginResponse
      console.log(token)
      await SecureStore.setItemAsync("token", token );
      setToken(token);
      const currentUser = await getProfile(token);
      setUser(currentUser.data);
    } catch (err) {
      const error = err as  AxiosError<errorResponse>
      setError(error.response?.data.message || "Something went wrong")
      console.log(error)
    }
       finally {
      setLoading(false);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {

      const data = await registerUser({ name, email, password });
      console.log(data)
      setSignedUp(true)
    } catch (err) {
      const error = err as AxiosError<errorResponse>
      setError(error.response?.data.message || "Something went wrong")
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      setUser(null);
    } catch (err) {
      console.log("Sign out error:", err);
    } finally {
      setLoading(false);
    }
  };

  const contextData = { token, login, signUp, user, signOut, isSignedUp, isLoading, error };

  return (
    <AuthContext.Provider value={contextData}>
      {/* {isLoading ? (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="cyan" />
        </SafeAreaView>
      ) : (
        children
      )} */}
  {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
