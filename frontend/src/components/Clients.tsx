import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getClients } from "../api/queries";

export const Clients = () => {
  const [search, setSearch] = useState("")
  const { data, isLoading } = useQuery("getClients", () => getClients(search));
  console.log(data);

  return (
    <>
   <Link to='/newClient'>New Client</Link>
      {isLoading
        ? "Loading..."
        : 
        data?.clients?.map((client) => (
            <div className="flex flex-wrap justify-center">

              <h1 className="text-purple">{client.nome}</h1>
              <p>{client.email}</p>
              <p>{client.endereco}</p>
              <p>{client.telefone}</p>
              <p>{client.CPF}</p>
            </div>
          ))}
    </>
  );
}