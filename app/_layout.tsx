import { Slot, Redirect } from 'expo-router';

import {  AuthProvider, useAuth } from '@/context/authContext';
import './global.css'


export default function Layout() {

  return (
    <AuthProvider>
      <Slot/>
    </AuthProvider>
  
  );
}




