import axios, {AxiosError} from "axios";
import Constants from "expo-constants";

type Users = { _id: string; name: string; email: string }[];

const ip = Constants.expoConfig?.hostUri?.replace("8081", "3000");
const API_URL = `http://${ip}`;

export  const getAllUsers = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = response.data as Users;

        return data

}catch (err){
  throw new Error("Failed to fetch users: " + (err as AxiosError).message);
}
}