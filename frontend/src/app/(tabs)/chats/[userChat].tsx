import { View, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

const ChatDetail = () => {
  const { userChat } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(40); // Initial height

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      setInputHeight(40); // Reset height after sending
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <ScrollView
            className="flex-1 p-4"
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          >
            {/* Placeholder for chat messages */}
            <View className="flex-1" />
          </ScrollView>
          <View className="bg-white p-4 border-t border-gray-300">
            <View className="flex-row items-center bg-gray-200 rounded-lg p-2">
              <TextInput
                className="flex-1 px-3 text-base text-gray-800"
                style={{ height: Math.min(Math.max(inputHeight, 40), 120) }} // Min 40px, max 120px
                value={message}
                placeholder="Enter something"
                placeholderTextColor="gray"
                onChangeText={setMessage}
                multiline
                onContentSizeChange={(e) => {
                  setInputHeight(e.nativeEvent.contentSize.height);
                }}
              />
              <TouchableOpacity
                className="p-2"
                onPress={handleSend}
                disabled={!message.trim()}
              >
                <Ionicons
                  name="send"
                  size={24}
                  color={message.trim() ? '#06b6d4' : '#d1d5db'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatDetail;