import { useCallback } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Credencial, login } from '../api/mutations'



export const Login = () => {
  const { formState: {errors}, handleSubmit, register} = useForm()
  const { mutate } = useMutation(login)
  const onSubmit = (data : FieldValues) => {
  
    mutate(data as Credencial)

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <input { ...register("username", { required: true }) } type="username" />
      <input { ...register("password", { required: true }) } type="password" />
      {(errors.password || errors.username) && <span>This field is required</span>}
      
      <button type="submit">Submit</button>
    </form>
    
  )
}