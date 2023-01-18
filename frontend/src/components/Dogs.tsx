import { useQuery } from "react-query"
import { getDog } from "../api/queries"
import { AiOutlineLoading } from "react-icons/ai"
import { Spinner } from "./Spinner"

export const Dogs = () => {
  const { data, refetch, isFetching } = useQuery("getDogs", getDog)

  return (
    <div className="flex flex-col min-h-[16em] justify-start mx-auto space-y-4 sm:w-2/5 sm:shadow-lg shadow-gray-400 sm:p-4">
      <button
        onClick={() => refetch()}
        className="flex items-center justify-center focus:outline-none mx-auto text-white text-xl sm:text-base bg-green-design hover:bg-green-design-hover rounded py-2 sm:h-8 w-60 transition duration-150 ease-in"
      >
        Get a dog!
      </button>
      {isFetching ? (
        <Spinner />
      ) : data?.url.includes(".mp4") ? (
        <video className="sm:w-2/3 mx-auto">
          {" "}
          <source src={data?.url} type="video/mp4" />
        </video>
      ) : (
        <img src={data?.url} className="sm:w-2/3 mx-auto" alt="not found" />
      )}
    </div>
  )
}
