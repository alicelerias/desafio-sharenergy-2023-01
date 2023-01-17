
import { useQuery, useMutation } from 'react-query'
import { getDog } from "../api/queries"
import {AiOutlineLoading} from 'react-icons/ai'


export const Dogs = () => {


  const { data, refetch, isLoading } = useQuery("getDogs", getDog)
  
  return (
    <div className="flex flex-wrap justify-center mx-auto space-y-4 sm:w-2/5 sm:shadow-sm shadow-gray-400 sm:p-4">
  
  <button 
        onClick={() => refetch()}
        className="flex items-center justify-center focus:outline-none text-white text-xl sm:text-base bg-green-design hover:bg-green-design-hover rounded py-2 sm:h-8 w-60 transition duration-150 ease-in">
              Get a dog!
           
          </button>
  {
    isLoading ? (
      <AiOutlineLoading />
    ) : (
      <img
      src={data?.url}
      className="sm:w-2/3"
      alt="not found"
/> 
    )
   }
  

</div>)

}