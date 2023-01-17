import React, { useCallback, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { useNavigate, useSearchParams } from "react-router-dom"
import { createClient} from "../api/mutations"
import { NewClient } from "../types/Client"
import { useAlert } from "./Alert"



export const CreateClient = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('id'))

  const navigate = useNavigate()
  const {formState: {errors}, handleSubmit, register, reset } = useForm()
  const { mutate } = useMutation(createClient, {
    onSuccess: () => {
      setTimeout(() => {
        navigate("/clients")
      }, 3000)
    },
  })
  const [showAlert, Alert] = useAlert()
  const onSubmit = (data: FieldValues) => {
    mutate(data as NewClient)
    reset(data)
    showAlert()
  }

  const inputCss = "p-2 bg-blue-design  placeholder-gray-200 w-full focus:outline-none text-white "

  return (
    <div className="flex flex-col justify-center items-center sm:w-1/3 sm:mx-auto sm:shadow-md shadow-gray-300 sm:px-2 sm: py-8 sm:border-2 border-blue-design">
  
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col space-y-4 justify-center sm:w-auto">
      <Alert type="sucess" message={"Usuário cadastrado com sucesso!"} />
      <p className="flex text-bold text-blue-design justify-center text-xl"> Novo Cliente </p>
      <input { ...register("nome", { required: true }) } type="text" placeholder="Nome" className={`${inputCss}`}/>
      <input { ...register("email", { required: true }) } type="email" placeholder="Email" className={`${inputCss}`}/>
      <input { ...register("endereco", { required: true }) } type="text" placeholder="Endereço" className={`${inputCss}`} />
      <input { ...register("telefone", { required: true }) } type="number" placeholder="Telefone" className={`${inputCss}`} />
      <input { ...register("cpf", { required: true }) } type="number" placeholder="CPF" className={`${inputCss}`}/>
      {(errors.nome || errors.email || errors.endereco || errors.telefone || errors.cpf) && <Alert message="Campo obrigatório" type='error' />}
      
      <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-xl sm:text-base bg-green-design hover:bg-green-design-hover rounded py-2 sm:h-8 w-40 transition duration-150 ease-in">
            <span className="mr-2 uppercase">Cadastrar</span>
           
          </button>

    </form>

    </div>
  )
  
  
}