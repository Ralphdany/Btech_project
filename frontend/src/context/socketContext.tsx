import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Toast from 'react-native-toast-message';
import { useNetInfo } from '@react-native-community/netinfo';
import Constants from "expo-constants";
import { useAuth } from "./authContext";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}


const SocketContext = createContext<SocketContextType | undefined>(undefined);


export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, CurrentUser } = useAuth();
  const [connected, setConnected] = useState(false);
  const { isConnected: isNetworkConnected } = useNetInfo();
  const socketRef = useRef<Socket | null>(null);

  const ip = Constants.expoConfig?.hostUri?.replace("8081", "3000");
  const API_URL = `http://${ip}`;

  useEffect(() => {

    if (!isNetworkConnected) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection.',
      });
      return;
    }
    if (!token || socketRef.current) return;

    const socket = io(API_URL, {
      auth: { token, userId: CurrentUser?._id, name: CurrentUser?.name },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      console.log("✅ Socket connected");
    });

    socket.on('connect_error', (err) => {
      setConnected(false);
      console.error("❌ Socket connection error:", err.message);
      Toast.show({
        type: 'error',
        text1: 'Socket Connection Error',
        text2: err.message,
      });
    })

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("🔌 Socket disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);



  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected: connected }}>
      {children}
    </SocketContext.Provider>
  );
  
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
      throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
  };
