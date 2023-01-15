import React, { useState } from "react"
import { useQuery } from "react-query"
import { getUsersSearch } from "../api/queries"
import configs from "../configs/configs"

export const Search = ({ refetchUsers, setSearch, search }:any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <>
     <input
        type="text"
        id="search"
        name="search"
        onChange={handleChange}
        value={search}
      />
      <button onClick={() => refetchUsers()} > Search </button>
    </>
  )

}