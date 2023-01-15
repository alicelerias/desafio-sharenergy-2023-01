import { useState } from "react";
import { useForm } from "react-hook-form";
import configs from "../configs/configs";



export const Cats = () => {
  const [code, setCode] = useState("500")
  
  return (
    <div className="flex flex-wrap justify-center">
  <img className="p-1 bg-white border rounded max-w-sm"
  src={configs.API_URL + `/cats?code=${code}`} alt= ""/>
  
  <input className="bg-purple border roundend" onBlur={(e) => {setCode(e.target.value)}}/>
  </div>)

}
  