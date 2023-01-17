import { useState } from "react";
import { useForm } from "react-hook-form";
import configs from "../configs/configs";



export const Cats = () => {
  const [code, setCode] = useState("500")
  // if (!code) {
  //   return "não encontrado"
  // } 
  
  return (
    <div className="flex flex-wrap justify-center mx-auto space-y-4 sm:w-2/5 sm:shadow-sm shadow-gray-400 sm:p-4">
  <img className="sm:w-2/3"
  src={configs.API_URL + `/cats?code=${code}`} alt= ""/>
  
  <input className="text-xl text-white sm:text-sm placeholder-gray-300 bg-blue-design pl-10 pr-4  border-gray-400 w-5/6 sm:h-8 py-2 focus:outline-none focus:border-blue-400" placeholder="Digite um status" onBlur={(e) => {setCode(e.target.value)}}/>
  </div>)

}
  