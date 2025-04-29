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
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Ionicons } from "@expo/vector-icons";

const ResetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "must be a valid email address" })
    .nonempty({ message: "email is required" }),
});

type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ResetPasswordData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual password reset logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setResetSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSent) {
    return (
      <View className="flex-1 justify-center items-center p-10 bg-white">
        <Ionicons name="mail-outline" size={64} color="#34d399" />
        <Text className="text-2xl font-bold text-center mt-6 mb-4">Check your email</Text>
        <Text className="text-gray-600 text-center mb-8">
          We've sent password reset instructions to your email address.
        </Text>
        <TouchableOpacity
          className="bg-cyan-400 py-4 px-8 rounded-md"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex flex-column flex-1 justify-center p-10 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text className="text-3xl text-center font-bold mb-4 text-gray-800">Reset Password</Text>
      <Text className="text-gray-600 text-center mb-8">
        Enter your email address and we'll send you instructions to reset your password.
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
          <Text className="text-red-600 text-sm">
            {errors.email?.message}
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
          <Text className="text-lg text-center text-white">Send Reset Instructions</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-6"
        onPress={() => router.back()}
      >
        <Text className="text-center text-cyan-400 font-bold">Back to Sign In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;