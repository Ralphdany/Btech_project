import { Slot} from 'expo-router';

import { AuthProvider} from '@/src/context/authContext';
import './global.css'


export default function Layout() {

  return (
    <AuthProvider>
      <Slot/>
    </AuthProvider>
  
  );
}




