import { NavLink } from "react-router-dom"
import GeneralButtons from "../Buttons/GeneralButtons"

const HomeNavbar = () => {
  return (
    <nav className="bg-transparent w-full p-4 flex justify-between absolute z-40">
        <ul className="flex items-center justify-around w-1/2 text-white">
            <NavLink to="/" className="nav-text">
                Home
            </NavLink>
            <NavLink to="/" className="nav-text">
                About
            </NavLink>
            <NavLink to="/" className="nav-text">
                Services
            </NavLink>
            <NavLink to="/" className="nav-text">
                Contact
            </NavLink>
            
        </ul>
        <div className="w-1/5 flex justify-evenly">
            <GeneralButtons text="Login" bgColor="#FF2E63" textColor="#fff" to="login" hoverColor="#ed2b5c"/>
            <GeneralButtons text="SignUp" bgColor="#FF2E63" textColor="#fff" to="signup" hoverColor="#ed2b5c"/>
        </div>
    </nav>
  )
}

export default HomeNavbar
