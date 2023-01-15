
import { useQuery, useMutation } from 'react-query'
import { getDog } from "../api/queries"


export const Dogs = () => {

  const { data, refetch, isLoading } = useQuery("getDogs", getDog)
  
  return (
    <div className="flex flex-wrap justify-center">

   {
    isLoading ? (
      "Loading"
    ) : (
      <img
      src={data?.url}
      className="p-1 bg-white border rounded max-w-sm"
      alt="not found"
/> 
    )
   }

<button className="bg-[#1da1f2]" onClick={() => refetch()}> get a dog!!</button>
</div>)

}