import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import {  getClients } from "../api/queries";
import { AiOutlineUserAdd, AiOutlineLoading} from 'react-icons/ai'

export const Clients = () => {
  const navigate = useNavigate()
  const [id, setId] = useState("")
  const { data, isLoading } = useQuery("getClients", () => getClients(id));

  return (
    <div className="flex flex-row space-x-4 sm:space-auto ">
      <div className="w-1/6 sm:w-20 ">
        <Link to='/newClient'>
          <div className="flex items-center justify-center w-auto sm:w-auto focus:outline-none text-white text-3xl sm:p-2  bg-green-design hover:bg-green-design-hover  py-2 px-4 transition duration-150 ease-in shadow-sm shadow-gray-400" > 
            <AiOutlineUserAdd />
          </div>
        </Link>
      </div>
     <div className="flex flex-col sm:grid grid-cols-3 gap-4 w-5/6 space-y-4 sm:space-y-0">
     {isLoading
        ? <AiOutlineLoading />
        : 
        data?.clients?.map((client) => (
            <div 
              className="flex flex-col flex-wrap justify-center cursor-pointer bg-blue-design p-4 space-y-2 text-gray-100 shadow-sm shadow-gray-300"
              onClick={() => {
                setId(client.id)
                navigate(`/clients/detail?id=${client.id}`)
              }}
              >

              <p className="text-xl">{client.nome}</p>
              <p>Email: {client.email}</p>
              <p>Telefone: {client.telefone}</p>
            </div>
          ))}
     </div>
    </div>
  );
}