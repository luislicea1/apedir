import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/login/Login";
import CreateAccont from "../components/login/CreateAccont";

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
    path: "/register",
    element: <CreateAccont />,
  },
]);

export default router;
