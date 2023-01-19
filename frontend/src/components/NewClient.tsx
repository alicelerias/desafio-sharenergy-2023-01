import React from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { createClient } from "../api/mutations"
import { NewClient } from "../types/Client"
import { useAlert } from "./Alert"
import { InputForm } from "./InputForm"
import {
  validateCPF,
  validateEMail,
  validateTelefone,
} from "../validates/validate"

export const CreateClient = () => {
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm()
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

  return (
    <div className="flex flex-col justify-center items-center sm:w-1/3 sm:mx-auto sm:shadow-md shadow-gray-300 sm:px-2 sm: py-8 sm:border-2 border-blue-design">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col space-y-4 justify-center sm:w-auto"
      >
        <Alert type="sucess" message={"Usuário cadastrado com sucesso!"} />
        <p className="flex text-bold text-blue-design justify-center text-xl">
          {" "}
          Novo Cliente{" "}
        </p>

        <InputForm
          controller={register("nome", {
            required: true,
          })}
          type="text"
          placeholder="Nome"
          error={errors.nome}
        />

        <InputForm
          controller={register("email", {
            required: true,
            validate: validateEMail,
          })}
          type="text"
          placeholder="Email"
          error={errors.email}
        />

        <InputForm
          controller={register("endereco", {
            required: true,
          })}
          type="text"
          placeholder="Endereço"
          error={errors.endereco}
        />

        <InputForm
          controller={register("telefone", {
            required: true,
            validate: validateTelefone,
          })}
          type="number"
          placeholder="Telefone"
          error={errors.telefone}
        />

        <InputForm
          controller={register("cpf", {
            required: true,
            validate: validateCPF,
          })}
          type="number"
          placeholder="CPF"
          error={errors.cpf}
        />

        <button
          type="submit"
          className="flex items-center justify-center focus:outline-none text-white text-xl sm:text-base bg-green-design hover:bg-green-design-hover rounded py-2 sm:h-8 w-40 transition duration-150 ease-in"
        >
          <span className="mr-2 uppercase">Cadastrar</span>
        </button>
      </form>
    </div>
  )
}
