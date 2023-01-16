import React, { useCallback, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { createClient, NewClient } from "../api/mutations"
import { useAlert } from "./Alert"



export const CreateClient = () => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Alert type="sucess" message={"Usuário cadastrado com sucesso!"} />
      <input { ...register("nome", { required: true }) } type="nome" placeholder="nome" />
      <input { ...register("email", { required: true }) } type="email" placeholder="email" />
      <input { ...register("endereco", { required: true }) } type="endereco" placeholder="endereco" />
      <input { ...register("telefone", { required: true }) } type="telefone" placeholder="telefone" />
      <input { ...register("cpf", { required: true }) } type="cpf" placeholder="CPF"  />
      {(errors.nome || errors.email || errors.endereco || errors.telefone || errors.cpf) && <span>This field is required</span>}
      
      <button type="submit">Submit</button>

    </form>
  )
  
  
}