import { createContext, useContext, useState } from 'react';
import { useSocket } from './socketContext';

interface userType {
    _id: string;
    name: string;
    email: string;
  }

type ChatContextType = {
  selectedUser: userType | null;
  setSelectedUser: (user: userType | null) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { socket, isConnected } = useSocket();
  const [selectedUser, setSelectedUser] = useState<userType | null>(null);

  return (
    <ChatContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};