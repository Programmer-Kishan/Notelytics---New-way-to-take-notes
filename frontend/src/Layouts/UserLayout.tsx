import { Outlet } from "react-router-dom";
import UserNavbar from "../components/Navbars/UserNavbar";

const UserLayout = () => {

    console.log("Hello from user layout");

    return (
        <>
            <UserNavbar />
            <Outlet />
        </>
    )
}

export default UserLayout;