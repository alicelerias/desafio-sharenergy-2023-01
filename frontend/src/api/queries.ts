import configs from "../configs/configs"
import { Client } from "../types/Client"
import { Clients } from "../types/Clients"
import { DogData } from "../types/Dogs"
import { Users } from "../types/Users"
import axios from './axios'

export const getDog = async () : Promise<DogData> => {
  const { data } = await axios.get<DogData>(configs.API_URL + "/dogs")
  return data
}


export const getUsersSearch = async (search: string) : Promise<Users> => {
  const url = new URL(configs.API_URL + '/users')
  if (search) {
    url.searchParams.append('search', search)
  }
  const { data } = await axios.get<Users>(url.toString())
  return data
}


export const getClients = async (id: string) : Promise<Clients> => {
  let url = id ? new URL(configs.API_URL +'/clients'+`/${id}`) : new URL(configs.API_URL + '/clients')

  const { data } = await axios.get<Clients>(url.toString())

  return data

}

export const getClient = async (id: string | null) : Promise<Client> => {
  const url = new URL(configs.API_URL+`/clients/${id}`)

  const { data } = await axios.get<Client>(url.toString())


  return data 
}