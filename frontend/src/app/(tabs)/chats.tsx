import { StyleSheet, Text, View, FlatList } from 'react-native';
import {useSocket} from '@/src/context/socketContext'
import { useAuth } from '@/src/context/authContext';
import { useEffect, useState } from 'react';

interface userType {
  _id: string;
  name: string;
  email: string;
}

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  const { socket } = useSocket();
  const { allUsers, getAllUsers, token }  = useAuth()
  const [AllUsers, setAllUsers] = useState<userType[]>([])

  useEffect(() => {
    if (!token) return;
    getAllUsers(token)
      .then(users => {
        setAllUsers(users);
        console.log("Fetched users:", users);
      })
      .catch(err => {
        console.error("Failed to fetch users:", err);
      });
  }, [token, getAllUsers]);
  

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

  return (
    <View style={styles.container}>
      <Text>Status: { isConnected ? 'connected' : 'disconnected' }</Text>
      <Text>Transport: { transport }</Text>
      <Text>{socket?.id}</Text>
      <FlatList
        data={AllUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className='m-2 p-2 border-1 border-blue-300 rounded-lg'>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});