import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Keyboard, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React from "react";

const userSchema = z
  .object({
    username: z.string(),
    email: z.string().email({message:"must be a valid email address" }),
    password: z.string().min(8, {message:"password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof userSchema>;

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = (data: FormData) => {
    Alert.alert(JSON.stringify(data));
  };
  return (
    <KeyboardAvoidingView
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     className="flex flex-column flex-1 justify-center p-10">
      <Text className="text-3xl text-center font-bold ">Sign Up</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      <Text className="font-bold mb-2">Username</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="box-border border-2 border-gray-300 py-4
               px-2 focus:border-2 focus:border-cyan-400 
               mb-2 rounded-md"
              placeholder="Enter your name"
              placeholderTextColor='gray'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
        />
        {  
          <Text className="text-red-600 text-sm">{errors.username?.message}</Text>}
      </View>

      </TouchableWithoutFeedback>
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

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View >
      <Text className="font-bold mb-2">Confirm Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="box-border border-2 border-gray-300 py-4 px-2 focus:border-2 focus:border-cyan-400 mb-2 rounded-md"
              placeholder="Confirm password"
              placeholderTextColor='gray'
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="confirmPassword"
        />
        {<Text className="text-red-600 text-sm">{errors.confirmPassword?.message}</Text>}
      </View>

      </TouchableWithoutFeedback>
      
      <TouchableOpacity
       className="bg-cyan-400 py-4 px-2  font-bold rounded-md"
       onPress={handleSubmit(onSubmit)}>
        <Text className="text-lg text-center text-white">Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
