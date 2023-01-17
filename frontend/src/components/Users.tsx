import { useState } from "react";
import { useQuery } from "react-query";
import { getUsersSearch } from "../api/queries";
import { Search } from "./Search";
import { AiOutlineLoading} from 'react-icons/ai'

export const Users = () => {
  const [search, setSearch] = useState("")
  const { data, isLoading, refetch } = useQuery("getUsers", () => getUsersSearch(search));

  return (
    <>
    <Search refetchUsers={refetch} search={search} setSearch={setSearch} />
     <div className="flex flex-col sm:grid grid-cols-3 mt-2 sm:mt-4 gap-2 sm:gap-4 w-full space-y-4 sm:space-y-0">
     {isLoading
        ? <AiOutlineLoading />
        : 
        data?.results?.map((user) => (
            <div 
            className="flex flex-row space-x-4 bg-blue-design p-4 text-gray-100 shadow-sm shadow-gray-300"
              >
                <img
                src={user.picture.medium}
                className="w-24 h-24 rounded-full"
                alt="not found"
              />

              

              <div>
              <p className="text-xl ">{user.name.title} {user.name.first} {user.name.last}</p>
            
            <p className="text-sm ">Email: {user.email}</p>
            <p className="text-sm">Username: {user.login.username}</p>
            <p className="text-sm">Idade: {user.dob.age} anos</p>
              </div>
            </div>
          ))}
      </div> 
    </>
  );
};
