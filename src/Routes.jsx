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
import PrivatePage from "./Pages/PrivatePage";

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
        path: "/property/:id",
        element: (
          <PrivatePage>
            <PropertyDetails></PropertyDetails>
          </PrivatePage>
        ),
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
    element: (
      <PrivatePage>
        <Dashboard></Dashboard>
      </PrivatePage>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivatePage>
            <MyProfile></MyProfile>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/myprofile",
        element: (
          <PrivatePage>
            <MyProfile></MyProfile>{" "}
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivatePage>
            {" "}
            <Wishlist></Wishlist>{" "}
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/make-offer",
        element: (
          <PrivatePage>
            <Offer></Offer>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/property-bought",
        element: (
          <PrivatePage>
            {" "}
            <PropertyBought></PropertyBought>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/my-reviews",
        element: (
          <PrivatePage>
            <MyReviews></MyReviews>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/agent-profile",
        element: (
          <PrivatePage>
            {" "}
            <MyProfile></MyProfile>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/add-property",
        element: (
          <PrivatePage>
            <AddProperty></AddProperty>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/my-property",
        element: (
          <PrivatePage>
            <MyAddedProperties></MyAddedProperties>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/offersList",
        element: (
          <PrivatePage>
            <OffersList></OffersList>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/admin-profile",
        element: (
          <PrivatePage>
            <MyProfile></MyProfile>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/manage-properties",
        element: (
          <PrivatePage>
            {" "}
            <ManageProperties></ManageProperties>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/manage-reviews",
        element: (
          <PrivatePage>
            <ManageReviews></ManageReviews>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivatePage>
            <ManageUsers></ManageUsers>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/updateProperty/:id",
        element: (
          <PrivatePage>
            <UpdateProperty></UpdateProperty>
          </PrivatePage>
        ),
      },
      {
        path: "/dashboard/sold-properties",
        element: (
          <PrivatePage>
            <SoldProperties></SoldProperties>
          </PrivatePage>
        ),
      },
    ],
  },
]);
