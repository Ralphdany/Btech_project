import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Constants from "expo-constants";
import { useAuth } from "./authContext";

interface SocketContextType {
  socket: Socket | null;
}


const SocketContext = createContext<SocketContextType | undefined>(undefined);


export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, CurrentUser } = useAuth();
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const ip = Constants.expoConfig?.hostUri?.replace("8081", "3000");
  const API_URL = `http://${ip}`;

  useEffect(() => {
    if (!token || socketRef.current) return;

    const socket = io(API_URL, {
      auth: { token, name: CurrentUser?.name },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      console.log("✅ Socket connected");
    });

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
    <SocketContext.Provider value={{ socket: socketRef.current }}>
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
