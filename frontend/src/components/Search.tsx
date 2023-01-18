import React from "react"

export const Search = ({ refetchUsers, setSearch, search }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim())
  }

  return (
    <div className="flex flex-row sm:px-60">
      <input
        className="text-xl text-white sm:text-sm placeholder-gray-300 bg-blue-design pl-10 pr-4  border-gray-400 w-5/6 sm:h-8 py-2 focus:outline-none focus:border-blue-400"
        placeholder="Busque um cliente"
        type="text"
        id="search"
        name="search"
        onChange={handleChange}
        value={search}
      />
      <button
        onClick={() => refetchUsers()}
        className="flex items-center justify-center w-1/6 focus:outline-none text-white text-xl sm:text-base bg-green-design hover:bg-green-design-hover  py-2 sm:h-8 transition duration-150 ease-in"
      >
        {" "}
        Ir{" "}
      </button>
    </div>
  )
}
