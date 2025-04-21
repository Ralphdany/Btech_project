import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React from "react";
import { useAuth } from "@/context/authContext";
import { router } from "expo-router";

const userSchema = z
  .object({
    name: z.string()
    .min(3, { message: "name must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {message: "name must be alphanumeric"})
    .nonempty({ message: "name is required" }),
    email: z.string().email({ message: "must be a valid email address" }).nonempty({ message: "email is required" }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .nonempty({ message: "password is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof userSchema>;

const SignUp = () => {
  const { signUp, isLoading, error } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = async (data: Omit<FormData, "confirmPassword">) => {
    const { name, email, password } = data
    signUp(name, email, password);
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex flex-column flex-1 justify-center p-10"
    >
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
                placeholderTextColor="gray"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {<Text className="text-red-600 text-sm">{errors.name?.message}</Text>}
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
                placeholderTextColor="gray"
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
                placeholderTextColor="gray"
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

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text className="font-bold mb-2">Confirm Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="box-border border-2 border-gray-300 py-4 px-2 focus:border-2 focus:border-cyan-400 mb-2 rounded-md"
                placeholder="Confirm password"
                placeholderTextColor="gray"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirmPassword"
          />
          {error ? (
            <Text className="text-red-600 text-sm">{error}</Text>
          ) : (
            <Text className="text-red-600 text-sm">
              {errors.confirmPassword?.message}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>

      <View>
        <TouchableOpacity
          className="bg-cyan-400 py-4 px-2  font-bold rounded-md"
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-lg text-center text-white">Sign up</Text>
          )}
        </TouchableOpacity>

        <View className="flex flex-row">
          <Text className="text-center mt-2">Already have an account?</Text>
          <TouchableOpacity
            className="ml-2 mt-2"
            onPress={() => router.replace("/SignIn")}
          >
            <Text className="text-center text-cyan-400 font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
