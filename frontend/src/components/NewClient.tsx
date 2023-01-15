import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { createClient, NewClient } from "../api/mutations"

export const CreateClient = () => {
  const {formState: {errors}, handleSubmit, register, reset } = useForm()
  const { mutate } = useMutation(createClient)
  const onSubmit = (data: FieldValues) => {
    mutate(data as NewClient)
    reset(data)
    alert('Usuário cadastrado com sucesso!!' + JSON.stringify(data, null, 4));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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