import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUsersSearch } from "../api/queries";
import { Search } from "./Search";
import { AiOutlineLoading } from "react-icons/ai";
import { User } from "../types/Users";
import { Spinner } from "./Spinner";

export const Users = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<User[]>([]);
  const { isFetching, refetch } = useQuery(
    "getUsers",
    () => getUsersSearch({ search, currentPage }),
    {
      onSuccess: (newData) => {
        setData([...data, ...newData.results]);
      },
    }
  );

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentPageInsideState) => currentPageInsideState + 1);
        refetch();
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinela")!);

    return () => intersectionObserver.disconnect();
  }, []);

  const onSearch = useCallback(() => {
    setData([]);
    setCurrentPage(1);
    refetch();
  }, []);

  return (
    <>
      <Search refetchUsers={onSearch} search={search} setSearch={setSearch} />
        <div className="flex flex-col sm:grid grid-cols-2 mt-2 sm:mt-4 gap-2 sm:gap-4 w-full space-y-4 sm:space-y-0">
          {data && data?.map((user) => (
            <div
              key={user.login.username}
              className="flex flex-row space-x-4 bg-blue-design p-4 text-gray-100 shadow-sm shadow-gray-300"
            >
              <img
                src={user.picture.medium}
                className="w-24 h-24 sm:w-16 sm:h-16 rounded-full"
                alt="not found"
              />
              <div>
                <p className="text-xl ">
                  {user.name.title} {user.name.first} {user.name.last}
                </p>

                <p className="text-sm ">Email: {user.email}</p>
                <p className="text-sm">Username: {user.login.username}</p>
                <p className="text-sm">Idade: {user.dob.age} anos</p>
              </div>
            </div>
          ))}
        </div>

        { isFetching && <Spinner /> }
      <li id="sentinela" className="text-gray-100" />
    </>
  );
};
