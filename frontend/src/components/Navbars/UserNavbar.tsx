import { useAppSelector } from "../../hooks/reduxHooks"

const UserNavbar = () => {

  const name = useAppSelector(state => state.user.username);

  return (
    <nav className="bg-transparent w-full absolute flex justify-end p-8 text-[#EAEAEA]">
        <h3 className="font-roboto text-xl font-normal">Welcome {name}</h3>
    </nav>
  )
}

export default UserNavbar
