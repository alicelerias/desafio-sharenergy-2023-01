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



export const getDog = async () : Promise<DogData> => {
  const { data } = await axios.get<DogData>(configs.API_URL + "/dogs")
  return data
}

// export const getCat = async (code : string) : Promise<Cat> => {
//   const { data } = await axios.get<Cat>(configs.API_URL + `/cats?code=${code}`)
//   return data
// }
export const getUsersSearch = async (search: string) : Promise<Users> => {
  const url = new URL(configs.API_URL + '/users')
  if (search) {
    url.searchParams.append('search', search)
  }
  const { data } = await axios.get<Users>(url.toString())
  return data
}


