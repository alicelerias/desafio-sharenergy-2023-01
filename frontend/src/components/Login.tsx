import { useCallback } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { Credencial, login } from '../api/mutations'
import configs from '../configs/configs'
import Ilustration from '../assets/solar-panel-house.svg'
import Logo from '../assets/logo_sharenergy.png'


export const Login = () => {
  const navigate = useNavigate()
  const { formState: {errors}, handleSubmit, register} = useForm()
  const { mutate } = useMutation(login, {
    onSuccess: () => {
      navigate("/users")
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
  <div className="flex flex-col space-y-16 w-full h-screen bg-gray-100 sm:shadow-lg p-8 rounded-md sm:px-4 sm:w-auto sm:h-5/6 sm:aspect-[1/2] sm:mx-auto sm:space-y-8 sm:p-4 sm:border-2 sm:border-blue">
    <div className="self-center">
      <img alt="logo" src={Logo} className="w-auto"/>
    </div>
    <div className="font-medium self-center text-2xl sm:text-base">
    
      Economize com energia solar!
    </div>
    <div className="font-medium self-center text-xl sm:text-2xl">
      <img alt='ilustration' src={Ilustration} className="w-auto sm:aspect-[9/5]" />
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8 sm:space-y-2">
        <div className="flex flex-col">
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>

            <input { ...register("username", { required: true }) } id="username" type="username" name="username" className="text-xl text-white sm:text-sm placeholder-white bg-blue pl-10 pr-4 rounded-lg border border-gray-400 w-full sm:h-8 py-2 focus:outline-none focus:border-blue-400" placeholder="Enter username" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>

            <input { ...register("password", { required: true }) } id="password" type="password" name="password" className="text-xl text-white sm:text-sm placeholder-white pl-10 pr-4 rounded-lg bg-blue border border-gray-400 w-full sm:h-8 py-2 focus:outline-none focus:border-blue-400" placeholder="Enter password" />
          </div>
        </div>

        <div className="inline-flex">
          <div className="flex ml-auto space-x-2">
            <input type="checkbox" className='border-2 border-blue bg-blue' />
            <div className="inline-flex text-base sm:text-sm text-blue-500 hover:text-blue-700" > Remember-me?</div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-xl sm:text-base bg-green hover:bg-greenHover rounded py-2 sm:h-8 w-60 transition duration-150 ease-in">
            <span className="mr-2 uppercase">Login</span>
            <span>
              <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        </div>
      </form>
  </div>
</div>
    </>

    
  )
}