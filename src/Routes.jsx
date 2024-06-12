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
import Wishlist from "./Dashboard/Pages_Dashboard/Wishlist";
import Offer from "./Dashboard/Pages_Dashboard/Offer";
import PropertyBought from "./Dashboard/Pages_Dashboard/PropertyBought";
import MyReviews from "./Dashboard/Pages_Dashboard/MyReview";
import AddProperty from "./Dashboard/Pages_Dashboard/Agent_Dashboard/Addproperty";
import MyAddedProperties from "./Dashboard/Pages_Dashboard/Agent_Dashboard/MyAddedProperties";
import OffersList from "./Dashboard/Pages_Dashboard/Agent_Dashboard/OffersList";
import ManageProperties from "./Dashboard/Pages_Dashboard/Admin_Dashboard/ManageProperties";
import ManageReviews from "./Dashboard/Pages_Dashboard/Admin_Dashboard/ManageReviews";
import ManageUsers from "./Dashboard/Pages_Dashboard/Admin_Dashboard/ManageUsers";
import UpdateProperty from "./Dashboard/Pages_Dashboard/Agent_Dashboard/UpdateProperty";
import SoldProperties from "./Dashboard/Pages_Dashboard/Agent_Dashboard/SoldProperties";

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
      { path: "/property/:id", element: <PropertyDetails></PropertyDetails> },
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
      { path: "/dashboard/wishlist", element: <Wishlist></Wishlist> },
      { path: "/dashboard/make-offer", element: <Offer></Offer> },
      {
        path: "/dashboard/property-bought",
        element: <PropertyBought></PropertyBought>,
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReviews></MyReviews>,
      },
      { path: "/dashboard/agent-profile",
       element: <MyProfile></MyProfile> },
       {
        path:"/dashboard/add-property",
        element:<AddProperty></AddProperty>
       },
       {
        path:"/dashboard/my-property",
        element:<MyAddedProperties></MyAddedProperties>
       },
       {
        path:"/dashboard/offersList",
        element:<OffersList></OffersList>
       },
       {path:"/dashboard/admin-profile",
        element:<MyProfile></MyProfile>
       },
       {
        path:"/dashboard/manage-properties",
        element:<ManageProperties></ManageProperties>
       },
       {
        path:"/dashboard/manage-reviews",
        element:<ManageReviews></ManageReviews>
       },
       {
        path:"/dashboard/manage-users",
        element:<ManageUsers></ManageUsers>
       },
       {
        path:"/dashboard/updateProperty/:id",
        element:<UpdateProperty></UpdateProperty>,
       },
       {
        path:"/dashboard/sold-properties",
        element:<SoldProperties></SoldProperties>
       }
    ],
  },
]);
