import { Outlet, useNavigate } from "react-router-dom";
import HomeNavbar from "../components/Navbars/HomeNavbar";
import { useEffect } from "react";
import Cookies from "js-cookie";

import * as UserApi from "../network/user_api";
import { useAppDispatch } from "../hooks/reduxHooks";
import { userActions } from "../store/userStore";
import { User } from "../models/user";

const HomeLayout = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        let user:string | User | undefined = Cookies.get('user');
        if (!user) {
          user = await UserApi.getLoggedInUser();
          console.log("From backend request: ", user);
        } else {
          user = JSON.parse(user);
          console.log("From Cookies: ", user);
        }
        dispatch(userActions.save(user as User));
        navigate(`/user/${(user as User)._id}`);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, [])

  return (
    <>
        <HomeNavbar />
        <Outlet />
    </>
  )
}

export default HomeLayout
