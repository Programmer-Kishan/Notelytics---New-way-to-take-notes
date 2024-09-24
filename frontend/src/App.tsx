import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from "./components/InitialPages/HomePage/HomePage"
import SignUp from "./components/InitialPages/SignUp/SignUp"
import Login from "./components/InitialPages/Login/Login"
import HomeLayout from "./Layouts/HomeLayout"
import UserLayout from "./Layouts/UserLayout"
import UserDashboard from "./components/Dashboard/UserDashboard"
import Notes from "./components/Dashboard/Notes/Notes";
import NoteDashboard from "./components/Dashboard/Notes/NoteDashboard"
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <HomePage />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signup",
          element: <SignUp />
        }
      ]
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        {
          path: ":userId",
          children: [
            {
              path: "",
              element: <UserDashboard />
            },
            {
              path: ":notebookId",
              children: [
                {
                  path: "",
                  element: <Notes />
                },
                {
                  path: ":noteId",
                  element: <NoteDashboard />
                }
              ]
            }
          ]
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
