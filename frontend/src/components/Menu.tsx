import { Link } from "react-router-dom"
import { logout } from "../api/mutations"

export const Menu: React.FC<{}> = () => {
  const cssMenu =
    "px-2 text-blue-design text-bold border-b-2 border-blue-design hover:text-green-design hover:border-green-design transition duration-150 ease-in"
  return (
    <div className="flex flex-row py-8 sm:py-4 space-x-6 justify-center ">
      <Link to="/cats">
        <div className={cssMenu}>Cats</div>
      </Link>

      <Link to="/dogs">
        <div className={cssMenu}>Dogs</div>
      </Link>

      <Link to="/users">
        <div className={cssMenu}>Users</div>
      </Link>

      <Link to="/clients">
        <div className={cssMenu}>Clients</div>
      </Link>

      <Link
        to="/login"
        onClick={() => {
          logout()
        }}
      >
        <div className=" px-2 text-gray-400 text-bold border-b-2 border-gray-400 hover:text-green-design hover:border-green-design transition duration-150 ease-in">
          Logout
        </div>
      </Link>
    </div>
  )
}
