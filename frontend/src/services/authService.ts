import axios, { AxiosError } from "axios";
import Constants from "expo-constants";

const ip = Constants.expoConfig?.hostUri?.replace("8081", "3000");

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface AuthError {
  error: string;
  message: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
}

const API_URL = `http://${ip}`;

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<RegisterResponse>> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/signup`,
      data
    );
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthError>;
      if (axiosError.response?.data) {
        throw new Error(
          axiosError.response.data.message || "Registration failed"
        );
      }
      throw new Error("Network error occurred during registration");
    }
    throw new Error("An unexpected error occurred during registration");
  }
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ApiResponse<LoginResponse>> => {
  console.log("API_URL", API_URL);
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/signin`, data);
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthError>;
      if (axiosError.response?.data) {
        throw new Error(axiosError.response.data.message || "Login failed");
      }
      throw new Error("Network error occurred during login");
    }
    throw new Error("An unexpected error occurred during login");
  }
};

export const getProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.error ||
            axiosError.response.data.message ||
            "Failed to fetch profile"
        );
      }
      throw new Error("Network error occurred while fetching profile");
    }
    throw new Error("An unexpected error occurred while fetching profile");
  }
};
