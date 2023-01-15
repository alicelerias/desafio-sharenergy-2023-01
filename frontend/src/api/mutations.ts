import configs from "../configs/configs";
import axios from "./axios";

export type Credencial = {
  username: string
  password: string
}

export const login = async (input : Credencial) => {
  await axios.post(configs.API_URL + "/login", input)
}