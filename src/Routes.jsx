import { createBrowserRouter } from "react-router-dom";
import Root from "./Root/Root";
import Home from "./Pages/Home/Home";
import AllProperties from "./Pages/All.properties/AllProperties";
import NotFound from "./Pages/Notfound";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path:"/allproperties",
        element:<AllProperties></AllProperties>
      }
    ],
  },{
    path:"*",
    element:<NotFound></NotFound>
  }
]);
