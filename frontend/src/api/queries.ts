import configs from "../configs/configs"
import axios from './axios'


type DogData = {
  url: string
}

type Users = {
  results: {
    name: {
      title: string,
      first: string,
      last: string
    },
    email: string,
    login: {
      username: string
    }
    dob: {
      age: string,
    }
    picture: {
      medium: string
    }
  }[]
}

type Clients = {
  clients: {
    nome: string,
    endereco: string,
    email: string,
    telefone: string,
    cpf: string
  }[]
}



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


export const getClients = async (search: string) : Promise<Clients> => {
  const url = new URL(configs.API_URL + '/clients')
  if (search) {
    url.searchParams.append('search', search)
  }
  const { data } = await axios.get<Clients>(url.toString())
  return data

}