import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getClients } from "../api/queries";
import { AiOutlineUserAdd} from 'react-icons/ai'

export const Clients = () => {
  const [search, setSearch] = useState("")
  const { data, isLoading } = useQuery("getClients", () => getClients(search));
  console.log(data);

  return (
    <div className="flex flex-row space-x-4 sm:space-x-36 ">
      <div className="w-1/6 sm:w-20 ">
        <Link to='/newClient'>
          <div className="flex items-center justify-center w-auto sm:w-auto focus:outline-none text-white text-3xl sm:p-2  bg-green-design hover:bg-green-design-hover  py-2 px-4 transition duration-150 ease-in shadow-sm shadow-gray-400" > 
            <AiOutlineUserAdd />
          </div>
        </Link>
      </div>
     <div className="flex flex-col sm:grid grid-cols-4 gap-4 w-5/6 space-y-4 sm:space-y-0">
     {isLoading
        ? "Loading..."
        : 
        data?.clients?.map((client) => (
            <div className="flex flex-col justify-center bg-blue-design p-4 space-y-2 text-gray-200 shadow-sm shadow-gray-300">

              <p className="text-xl">{client.nome}</p>
              <p>Email: {client.email}</p>
              <p>Telefone: {client.telefone}</p>
            </div>
          ))}
     </div>
    </div>
  );
}