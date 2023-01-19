import { useEffect, useState } from "react"
import configs from "../configs/configs"

export const Cats = () => {
  const [code, setCode] = useState("500")
  const [url, setURL] = useState("404")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setURL(configs.API_URL + `/cats?code=${code}`)
    }, 500)
    return () => clearTimeout(timeout)
  }, [code])

  return (
    <div className="flex flex-col min-h-[16em] justify-start mx-auto space-y-4 sm:w-2/5 sm:shadow-lg shadow-gray-400 sm:p-4">
      <input
        type="text"
        id="inputCats"
        className="appearance-none mx-auto text-xl text-white sm:text-sm  placeholder-gray-300 bg-blue-design pl-10 pr-4  border-gray-400 w-5/6 sm:h-8 py-2 focus:outline-none focus:border-blue-400"
        placeholder="Digite um status"
        onChange={(e) => setCode(e.target.value)}
      />
      <img className="sm:w-2/3 mx-auto" src={url} alt="" />
    </div>
  )
}
