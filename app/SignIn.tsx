import { View, Text, TextInput, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Redirect, useRouter } from 'expo-router';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from '@/context/authContext';

const LoggedUser = z.object({
  email: z.string().email({message:"must be a valid email address" })
  .nonempty({message:"email is required" }),
  password: z.string().min(8, {message:"password must be at least 8 characters" })
  .nonempty({message:"password is required" }),
})



type formData = z.infer<typeof LoggedUser>

const SignUp = () => {
  const { login, error, isLoading, token } = useAuth()
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(LoggedUser),
  });

  const onSubmit = (data: formData) => {
        const {email, password} = data
        login(email, password)
  }

  
  const router = useRouter()

  if(token) return <Redirect href="/"/>
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
        
        {error ? (
            <Text className="text-red-600 text-sm">{error}</Text>
          ) : (
            <Text className="text-red-600 text-sm">
              {errors.email?.message}
            </Text>
          )}
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
  {error ? (
            <Text className="text-red-600 text-sm">{error}</Text>
          ) : (
            <Text className="text-red-600 text-sm">
              {errors.password?.message}
            </Text>
          )}
      </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity
       className="bg-cyan-400 py-4 px-2  font-bold rounded-md flex justify-center align-center"
       onPress={handleSubmit(onSubmit)}>
        {isLoading ? 
        <ActivityIndicator size="small" color="white"/>
        :
        <Text className="text-lg text-center text-white">Sign in</Text>

      }
      </TouchableOpacity>

      <View className="flex flex-row">
       <Text className="text-center mt-2">Already have an account?</Text>
       <TouchableOpacity className="ml-2 mt-2" onPress={() => router.replace('/SignUp')}>
          <Text className="text-center text-cyan-400 font-bold">Sign up</Text>
       </TouchableOpacity>
     </View>

      </KeyboardAvoidingView>
      
  )
}

export default SignUp