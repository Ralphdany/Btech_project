import axios from "axios"
import Constants from "expo-constants"

const ip = Constants.expoConfig?.hostUri?.replace("8081","3000")
console.log("IP", ip);

interface loginResponse {
  token: string
}

interface errorResponse {
  error: string
}
interface registerResponse {
  message: string
}
const API_URL = `http://${ip}`;

export const registerUser = async (data: { name: string; email: string; password: string }) => {
   const response = await axios.post<registerResponse | errorResponse>(`${API_URL}/signup`, data);
   return response.data
};

export const loginUser = async (data: { email: string; password: string }) => {
    const response = await axios.post<loginResponse | errorResponse>(`${API_URL}/signin`, data); 
  return response.data
};

export const getProfile = async (token: string) => {
  return axios.get(`${API_URL}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};