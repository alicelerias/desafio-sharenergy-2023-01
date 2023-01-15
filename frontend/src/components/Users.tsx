import { useState } from "react";
import { useQuery } from "react-query";
import { getUsersSearch } from "../api/queries";
import { Search } from "./Search";

export const Users = () => {
  const [search, setSearch] = useState("")
  const { data, isLoading, refetch } = useQuery("getUsers", () => getUsersSearch(search));
  console.log(data);

  return (
    <>
    <Search refetchUsers={refetch} search={search} setSearch={setSearch} />
      {isLoading
        ? "Loading..."
        : 
        data?.results?.map((user) => (
            <div className="flex flex-wrap justify-center">
              <img
                src={user.picture.medium}
                className="p-1 bg-white border rounded max-w-sm"
                alt="not found"
              />
              <h1 className="text-purple">{user.name.first}</h1>
              <p>{user.email}</p>
              <p>{user.login.username}</p>
              <p>{user.dob.age}</p>
            </div>
          ))}
    </>
  );
};
