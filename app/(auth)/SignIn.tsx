import { View, Text, TextInput, Keyboard,TouchableHighlight,KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const LoggedUser = z.object({
  email: z.string().email({message:"must be a valid email address" }),
  password: z.string().min(8, {message:"password must be at least 8 characters" })
})

type formData = z.infer<typeof LoggedUser>

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(LoggedUser),
  });

  const onSubmit = (data: formData) => {
    Alert.alert(JSON.stringify(data))
  }
  return (
    
      <KeyboardAvoidingView 
      className="flex flex-column flex-1 justify-center p-10"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      > 
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      <Text className="font-bold mb-2">Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="box-border border-2 border-gray-300 py-4
               px-2 focus:border-2 focus:border-cyan-400 
               mb-2 rounded-md"
              placeholder="Enter your email address"
              placeholderTextColor='gray'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {  
          <Text className="text-red-600 text-sm">{errors.email?.message}</Text>}
      </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      <Text className="font-bold mb-2">Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              className="box-border border-2 border-gray-300 py-4 px-2 focus:border-2 focus:border-cyan-400 mb-2 rounded-md"
              placeholder="Enter password"
              placeholderTextColor='gray'
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {<Text className="text-red-600 text-sm">{errors.password?.message}</Text>}
      </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity
       className="bg-cyan-400 py-4 px-2  font-bold rounded-md"
       onPress={handleSubmit(onSubmit)}>
        <Text className="text-lg text-center text-white">Sign up</Text>
      </TouchableOpacity>

      </KeyboardAvoidingView>
      
  )
}

export default SignUp