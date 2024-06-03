import { createBrowserRouter } from "react-router-dom";
import Root from "./Root/Root";
import Home from "./Pages/Home/Home";
import AllProperties from "./Pages/All.properties/AllProperties";
import NotFound from "./Pages/Notfound";
import Login from "./Pages/Firebase/Auth/Login";
import Register from "./Pages/Firebase/Auth/Register";
import Dashboard from "./Dashboard/Dashboard";
import MyProfile from "./Dashboard/Pages_Dashboard/MyProfile";
import PropertyDetails from "./Pages/PropertyDetails";
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
      {path:"/property/:id",
        element:<PropertyDetails></PropertyDetails>,
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
        element: <MyProfile></MyProfile>,
      },
      { path: "/dashboard/myprofile", element: <MyProfile></MyProfile> },
    ],
  },
]);
