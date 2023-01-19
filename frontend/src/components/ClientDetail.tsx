import { FieldValues, useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useSearchParams } from "react-router-dom"
import { updateClient } from "../api/mutations"
import { getClient } from "../api/queries"
import { Client } from "../types/Client"
import { useAlert } from "./Alert"
import { AiFillSave } from "react-icons/ai"
import { DeleteButton } from "./DeleteButton"
import { InputForm } from "./InputForm"
import {
  validateCPF,
  validateEMail,
  validateTelefone,
} from "../validates/validate"

export const ClientDetail = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")!

  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm()

  useQuery("getClient", () => getClient(id), {
    onSuccess: (data) => reset(data),
  })

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
        <InputForm
          controller={register("nome", {
            required: true,
          })}
          type="text"
          placeholder="Nome"
          error={errors.nome}
        />
        <span className={`${spanCss}`}>Email:</span>
        <InputForm
          controller={register("email", {
            required: true,
            validate: validateEMail,
          })}
          type="text"
          placeholder="Email"
          error={errors.email}
        />

        <span className={`${spanCss}`}>Endereço:</span>
        <InputForm
          controller={register("endereco", {
            required: true,
          })}
          type="text"
          placeholder="Endereço"
          error={errors.endereco}
        />

        <span className={`${spanCss}`}>Telefone:</span>
        <InputForm
          controller={register("telefone", {
            required: true,
            validate: validateTelefone,
          })}
          type="number"
          placeholder="Telefone"
          error={errors.telefone}
        />
        <span className={`${spanCss}`}>CPF:</span>
        <InputForm
          controller={register("cpf", {
            required: true,
            validate: validateCPF,
          })}
          type="number"
          placeholder="CPF"
          error={errors.cpf}
        />
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
