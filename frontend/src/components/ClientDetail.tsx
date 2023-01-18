import React, { useCallback, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useSearchParams } from "react-router-dom"
import { createClient, updateClient } from "../api/mutations"
import { getClient, getClients } from "../api/queries"
import { Client, NewClient } from "../types/Client"
import { useAlert } from "./Alert"
import { AiFillSave } from "react-icons/ai"
import { DeleteButton } from "./DeleteButton"

export const ClientDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id")!

  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm()
  const { data, isLoading, refetch } = useQuery(
    "getClient",
    () => getClient(id),
    {
      onSuccess: (data) => reset(data),
    }
  )

  const { mutate } = useMutation((data: Client) => updateClient(data, id), {
    onSuccess: () => {
      setTimeout(() => {
        navigate("/clients")
      }, 2000)
    },
  })
  const [showAlert, Alert] = useAlert()
  const onSubmit = (data: FieldValues) => {
    mutate(data as Client)
    reset(data)
    showAlert()
  }

  const inputCss =
    "p-2 bg-blue-design  placeholder-gray-200 w-full  focus:outline-none text-white "
  const spanCss = "text-blue-design w-full text-start"
  const buttonCss =
    "focus:outline-none text-white text-3xl bg-green-design hover:bg-green-design-hover rounded p2 w-auto transition duration-150 ease-in"
  return (
    <div className="flex flex-col justify-center items-center sm:w-1/3 sm:mx-auto sm:shadow-md shadow-gray-300 sm:px-2 sm: py-8 sm:border-2 border-blue-design">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col space-y-4 sm:space-y-2 justify-center sm:w-auto"
      >
        <Alert type="sucess" message={"Sucesso"} />
        <p className="flex text-bold text-blue-design justify-center text-xl">
          {" "}
          Cliente{" "}
        </p>
        <span className={`${spanCss}`}>Nome:</span>
        <input
          {...register("nome", { required: true })}
          type="text"
          placeholder="Nome"
          className={`${inputCss}`}
        />
        <span className={`${spanCss}`}>Email:</span>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className={`${inputCss}`}
        />
        <span className={`${spanCss}`}>Endereço:</span>
        <input
          {...register("endereco", { required: true })}
          type="text"
          placeholder="Endereço"
          className={`${inputCss}`}
        />
        <span className={`${spanCss}`}>Telefone:</span>
        <input
          {...register("telefone", { required: true })}
          type="number"
          minLength={11}
          maxLength={11}
          className={`${inputCss}`}
        />
        <span className={`${spanCss}`}>CPF:</span>
        <input
          {...register("cpf", { required: true })}
          type="number"
          placeholder="CPF"
          className={`${inputCss}`}
        />
        {(errors.nome ||
          errors.email ||
          errors.endereco ||
          errors.telefone ||
          errors.cpf) && <Alert message="Campo obrigatório" type="error" />}

        <div className="flex flex-row space-x-4">
          <button type="submit" className={`${buttonCss}`}>
            <AiFillSave />
          </button>
          <DeleteButton id={id} />
        </div>
      </form>
    </div>
  )
}
