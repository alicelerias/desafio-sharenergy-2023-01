import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { Credencial, login } from '../api/mutations'
import configs from '../configs/configs'
import Ilustration from '../assets/solar-panel-house.svg'
import Logo from '../assets/logo_sharenergy.png'
import { LoginForm } from './LoginForm'


export const Login = () => {
  const navigate = useNavigate()
  const { mutate } = useMutation(login, {
    onSuccess: () => {
      navigate("/")
    },
    onError: () => {
      window.location.assign(configs.HOST)
    }
  })
  const onSubmit = (data : FieldValues) => {
    mutate(data as Credencial)
  }

  return (

    <>
  
<div className="flex flex-col justify-center w-screen h-screen bg-gray-100">
  <div className="flex flex-col justify-between w-full h-screen bg-gray-100 sm:shadow-lg p-8 rounded-md sm:px-4 sm:w-auto sm:h-5/6 sm:aspect-[1/2] sm:mx-auto sm:space-y-8 sm:p-4 sm:border-2 sm:border-blue">
    <img alt="logo" src={Logo} className="w-auto"/>
    <div className="text-center font-medium self-center text-4xl sm:text-base sm:font-semibold">
      Economize com energia solar!
    </div>
    <div className="font-medium self-center text-xl sm:text-2xl">
      <img alt='ilustration' src={Ilustration} className="w-auto sm:aspect-[9/5]" />
    </div>

    <LoginForm onSubmit={onSubmit} />
    
  </div>
</div>
    </>

    
  )
}