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
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const userSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "name must be at least 3 characters" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "name must be alphanumeric" })
      .nonempty({ message: "name is required" }),
    email: z
      .string()
      .email({ message: "must be a valid email address" })
      .nonempty({ message: "email is required" }),
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: Omit<FormData, "confirmPassword">) => {
    const { name, email, password } = data;
    signUp(name, email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex flex-column flex-1 justify-center p-6"
    >
      <Text className="text-3xl text-center font-bold ">Sign Up</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text className="font-bold mb-2 text-gray-700">Username</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="relative">
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="gray"
                  className="absolute left-3 top-4"
                />
                <TextInput
                  className="box-border border-2 border-gray-300 py-4 pl-10 pr-4 focus:border-2 focus:border-cyan-400 mb-2 rounded-md"
                  placeholder="Enter your name"
                  placeholderTextColor="gray"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
              </View>
            )}
            name="name"
          />
          <Text className="text-red-600 text-sm">{errors.name?.message}</Text>
        </View>
      </TouchableWithoutFeedback>

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

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text className="font-bold mb-2 text-gray-700">Confirm Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="relative">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="gray"
                  className="absolute left-3 top-4"
                />
                <TextInput
                  className="box-border border-2 border-gray-300 py-4 pl-10 pr-10 focus:border-2 focus:border-cyan-400 mb-2 rounded-md"
                  placeholder="Confirm password"
                  placeholderTextColor="gray"
                  secureTextEntry={!showConfirmPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity
                  className="absolute right-3 top-4"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            )}
            name="confirmPassword"
          />
          <Text className="text-red-600 text-sm">
            {errors.confirmPassword?.message}
          </Text>
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
