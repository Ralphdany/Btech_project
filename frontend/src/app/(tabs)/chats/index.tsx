import { TouchableOpacity, Text, View, FlatList, ActivityIndicator } from 'react-native';
import {useSocket} from '@/src/context/socketContext'
import { useAuth } from '@/src/context/authContext';
import { useChat } from '@/src/context/chatContext';
import { useEffect, useState } from 'react';
import { Href, useRouter } from 'expo-router';

interface userType {
  _id: string;
  name: string;
  email: string;
}

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  const { socket } = useSocket();
  const { setSelectedUser } = useChat();
  const { allUsers, isLoading }  = useAuth()
  const router = useRouter()
  // const [AllUsers, setAllUsers] = useState<userType[]>([])

  // useEffect(() => {
  //   if (!token) return;
  //   getAllUsers(token)
  //     .then(users => {
  //       setAllUsers(users);
  //     })
  //     .catch(err => {
  //       console.error("Failed to fetch users:", err);
  //     });
  // }, [token, getAllUsers]);
  

  useEffect(() => {
    if (!socket) {
      console.warn('Socket is not initialized');
      return;
    }
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      if (!socket) {
        console.log('Socket is not initialized');
        return
      };
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      console.log('Connected to socket.io server');

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      }); 
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on("users", (users) => {
      console.log("Connected users:", users);
    })
    

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]);

  if (isLoading) {
    return <ActivityIndicator size="small" color="cyan"/>
  }

  return (
    <View className='bg-white p-4 flex gap-3 flex-column flex-1'>
      {/* <Text>Status: { isConnected ? 'connected' : 'disconnected' }</Text>
      <Text>Transport: { transport }</Text>
      <Text>{socket?.id}</Text> */}
      <FlatList
      className='flex gap-3 flex-column border-1 border-slate-900'
        data={allUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => {
              setSelectedUser(item)
              console.log("Selected user:", item);
              router.push({pathname: '/chats/[userChat]', params: { userChat: item.name}})
            }}
          className='p-5 mb-2 border-1 border-b-black/10 bg-gray-300/80 rounded-lg'>
            <Text>{item.name}</Text>
            {/* <Text>{item.email}</Text> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });