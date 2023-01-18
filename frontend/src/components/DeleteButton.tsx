import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { deleteClient } from "../api/mutations"
import { useAlert } from "./Alert"
import { AiFillDelete } from "react-icons/ai"

type props = {
  id: string
}
export const DeleteButton: React.FC<props> = ({ id }) => {
  const navigate = useNavigate()

  const { mutate } = useMutation(() => deleteClient(id), {
    onSuccess: () => {
      setTimeout(() => {
        navigate("/clients")
      }, 2000)
    },
  })
  const [showAlert, Alert] = useAlert()
  const onDelete = () => {
    mutate()

    showAlert()
  }
  const buttonCss =
    "focus:outline-none text-white text-3xl bg-green-design hover:bg-green-design-hover rounded p2 w-auto transition duration-150 ease-in"

  return (
    <>
      <button onClick={onDelete} className={buttonCss}>
        <AiFillDelete />
      </button>
    </>
  )
}
