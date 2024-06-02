import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./main.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import Firebaseprovider from "../src/Pages/Firebase/Firebaseprovider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {" "}
      <Firebaseprovider>
        {" "}
        <Toaster />
        <RouterProvider router={router}></RouterProvider>{" "}
      </Firebaseprovider>
    </QueryClientProvider>
  </React.StrictMode>
);
