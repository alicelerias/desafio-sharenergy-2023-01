import { AiOutlineLoading } from "react-icons/ai"

type props = {
  className?: string
}
export const Spinner: React.FC<props> = ({ className }) => {
  return (
    <AiOutlineLoading className={`animate-spin mx-auto mt-8 ${className}`} />
  )
}
