import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Sigup";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {path: "/:username",
  element: <Profile />,
},
]);

export const Router = () =>(
  <RouterProvider router={router} />
)