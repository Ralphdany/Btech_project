import { Slot } from 'expo-router';

import { AuthProvider} from '@/src/context/authContext';
import { SocketProvider } from '../context/socketContext';
import { ChatProvider } from '../context/chatContext';
import './global.css'


export default function Layout() {

  return (
    <AuthProvider>
      <SocketProvider>
        <ChatProvider>
         <Slot screenOptions={{headerShown: false}}/> 
        </ChatProvider>
      </SocketProvider>
    </AuthProvider>
  
  );
}




