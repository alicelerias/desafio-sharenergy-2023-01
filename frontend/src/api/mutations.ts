import configs from "../configs/configs";
import axios from "./axios";

export type Credencial = {
  username: string
  password: string
}

export type NewClient = {
  nome: string
  email: string
  endereco: string
  telefone: string
  cpf: string
}

export const login = async (input : Credencial) => {
  await axios.post(configs.API_URL + "/login", input)
}

export const createClient = async (input: NewClient) => {
  await axios.post(configs.API_URL + "/clients", input)
}