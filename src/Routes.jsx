import { createBrowserRouter } from "react-router-dom";
import Root from "./Root/Root";
import Home from "./Pages/Home/Home";
import AllProperties from "./Pages/All.properties/AllProperties";
import NotFound from "./Pages/Notfound";
import Login from "./Pages/Firebase/Auth/Login";
import Register from "./Pages/Firebase/Auth/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allproperties",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <AllProperties></AllProperties>,
      },
      { path: "/dashboard/lol", element: <Login></Login> },
    ],
  },
]);
