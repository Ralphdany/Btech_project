import { useAuth } from '../../context/authContext';
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Index() {
  const { user } = useAuth();
  const router = useRouter();
  
  const getInitials = (name: string | undefined) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-cyan-500 p-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className="bg-white w-12 h-12 rounded-full items-center justify-center mr-4">
              <Text className="text-cyan-500 text-xl font-bold">
                {getInitials(user?.name)}
              </Text>
            </View>
            <View>
              <Text className="text-white text-lg opacity-80">Welcome back,</Text>
              <Text className="text-white text-xl font-bold">
                {user?.name || 'Guest'}
              </Text>
            </View>
          </View>

          <View className='flex-row gap-3'>
          <TouchableOpacity 
            className="bg-cyan-400 w-10 h-10 rounded-full items-center justify-center"
          >
            <Ionicons name="notifications" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-cyan-400 w-10 h-10 rounded-full items-center justify-center"
            
          >
            <Ionicons name="add-circle" size={22} color="white" />
          </TouchableOpacity>

          </View>
        </View>
      </View>

      {/* <View className="flex-row justify-between p-4 mx-4 -mt-4 bg-white rounded-xl shadow-sm">
        <View className="items-center">
          <Text className="text-2xl font-bold text-cyan-500">0</Text>
          <Text className="text-gray-600">Total Tasks</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-green-500">0</Text>
          <Text className="text-gray-600">Completed</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-orange-500">0</Text>
          <Text className="text-gray-600">Pending</Text>
        </View>
      </View> */}

      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800 mb-4 ml-2">
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {/* <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
            <View className="bg-cyan-100 w-12 h-12 rounded-full items-center justify-center mb-3">
              <Ionicons name="add" size={24} color="#0891b2" />
            </View>
            <Text className="text-gray-800 font-semibold">New Task</Text>
            <Text className="text-gray-500 text-sm">Create a task</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
           className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4"
           onPress={() => router.push('/schedule')}
           >
            <View className="bg-purple-100 w-12 h-12 rounded-full items-center justify-center mb-3">
              <Ionicons name="calendar" size={24} color="#7e22ce" />
            </View>
            <Text className="text-gray-800 font-semibold">Schedule</Text>
            <Text className="text-gray-500 text-sm">View calendar</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
            <View className="bg-orange-100 w-12 h-12 rounded-full items-center justify-center mb-3">
              <Ionicons name="stats-chart" size={24} color="#ea580c" />
            </View>
            <Text className="text-gray-800 font-semibold">Analytics</Text>
            <Text className="text-gray-500 text-sm">View progress</Text>
          </TouchableOpacity> */}

          <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
            <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center mb-3">
              <Ionicons name="notifications" size={24} color="#2563eb" />
            </View>
            <Text className="text-gray-800 font-semibold">Notifications</Text>
            <Text className="text-gray-500 text-sm">View updates</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800 mb-4 ml-2">
          Recent Activity
        </Text>
        <View className="bg-white p-4 rounded-xl shadow-sm">
          <Text className="text-gray-500 text-center py-4">
            No recent activity to show
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}