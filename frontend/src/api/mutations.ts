import configs from "../configs/configs";
import { Client, NewClient } from "../types/Client";
import { Credencial } from "../types/Credencial";
import axios from "./axios";


export const login = async (input : Credencial) => {
  await axios.post(configs.API_URL + "/login", input)
}

export const logout = async () => {
  await axios.post(configs.API_URL + "/logout")
}

export const createClient = async (input: NewClient) => {
  await axios.post(configs.API_URL + "/clients", input)
}

export const updateClient = async (input: Client, id: string) => {
  const url = new URL(configs.API_URL+`/clients/${id}`)
  await axios.put(url.toString(), input)
  
}

export const deleteClient = async (id: string) => {
  const url = new URL(configs.API_URL+`/clients/${id}`)
  await axios.delete(url.toString())

}