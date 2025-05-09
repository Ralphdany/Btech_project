import {
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/src/context/authContext";
import { Ionicons } from "@expo/vector-icons";

const LoggedUser = z.object({
  email: z
    .string()
    .email({ message: "must be a valid email address" })
    .nonempty({ message: "email is required" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" })
    .nonempty({ message: "password is required" }),
});

type formData = z.infer<typeof LoggedUser>;

const SignUp = () => {
  const { login, error, isLoading, token } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(LoggedUser),
    mode: "onChange",
  });

  const onSubmit = (data: formData) => {
    const { email, password } = data;
    login(email, password);
  };

  const router = useRouter();

  if (token) return <Redirect href="/" />;
  return (
    <KeyboardAvoidingView
      className="flex flex-column flex-1 justify-center p-6 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text className="text-3xl text-center font-bold mb-8 text-gray-800">
        Welcome Back
      </Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text className="font-bold mb-2 text-gray-700">Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="relative">
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="gray"
                  className="absolute left-3 top-4"
                />
                <TextInput
                  className="box-border border-2 border-gray-300 py-4 pl-10 pr-4 focus:border-2 focus:border-cyan-400 mb-2 rounded-md"
                  placeholder="Enter your email address"
                  placeholderTextColor="gray"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            )}
            name="email"
          />
          <Text className="text-red-600 text-sm">{errors.email?.message}</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text className="font-bold mb-2 text-gray-700">Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <View className="relative">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="gray"
                  className="absolute left-3 top-4"
                />
                <TextInput
                  className="box-border border-2 border-gray-300 py-4 pl-10 pr-10 focus:border-2 focus:border-cyan-400 mb-2 rounded-md"
                  placeholder="Enter password"
                  placeholderTextColor="gray"
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity
                  className="absolute right-3 top-4"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            )}
            name="password"
          />
          <Text className="text-red-600 text-sm">
            {errors.password?.message}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity
        className="bg-cyan-400 py-4 px-2 font-bold rounded-md flex justify-center align-center mt-4"
        onPress={handleSubmit(onSubmit)}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-lg text-center text-white">Sign in</Text>
        )}
      </TouchableOpacity>

      <View className="flex flex-row justify-center mt-4">
        <Text className="text-center text-gray-600">
          Don't have an account?
        </Text>
        <TouchableOpacity
          className="ml-2"
          onPress={() => router.replace("/SignUp")}
        >
          <Text className="text-center text-cyan-400 font-bold">Sign up</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-center mt-4">
        <TouchableOpacity
          className="mt-1 mb-4"
          onPress={() => router.push("/ResetPassword")}
        >
          <Text className="text-right text-cyan-400">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
