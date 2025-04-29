import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const { signOut, user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const getInitials = (name: string | undefined): string => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Profile Section */}
      <View className="bg-white p-6 mb-4">
        <View className="items-center">
          <View className="bg-cyan-500 w-20 h-20 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">
              {getInitials(user?.name)}
            </Text>
          </View>
          <Text className="text-xl font-bold text-gray-800">{user?.name}</Text>
          <Text className="text-gray-500">{user?.email}</Text>
        </View>
      </View>

      {/* Preferences */}
      <View className="bg-white mb-4">
        <Text className="px-6 py-3 text-sm font-medium text-gray-500 uppercase">
          Preferences
        </Text>
        <View className="border-t border-gray-200">
          <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="notifications" size={22} color="#4b5563" className="mr-3" />
              <Text className="text-gray-800 ml-3">Push Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#d1d5db', true: '#0891b2' }}
            />
          </View>
          <View className="flex-row justify-between items-center px-6 py-4">
            <View className="flex-row items-center">
              <Ionicons name="moon" size={22} color="#4b5563" className="mr-3" />
              <Text className="text-gray-800 ml-3">Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#d1d5db', true: '#0891b2' }}
            />
          </View>
        </View>
      </View>

      {/* Account Actions */}
      <View className="bg-white">
        <Text className="px-6 py-3 text-sm font-medium text-gray-500 uppercase">
          Account
        </Text>
        <View className="border-t border-gray-200">
          <TouchableOpacity 
            className="flex-row items-center px-6 py-4 border-b border-gray-200"
            onPress={() => {/* Handle edit profile */}}
          >
            <Ionicons name="person" size={22} color="#4b5563" />
            <Text className="text-gray-800 ml-3">Edit Profile</Text>
            <Ionicons name="chevron-forward" size={22} color="#9ca3af" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-row items-center px-6 py-4"
            onPress={handleSignOut}
          >
            <Ionicons name="log-out" size={22} color="#dc2626" />
            <Text className="text-red-600 ml-3">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}