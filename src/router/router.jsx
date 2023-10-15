import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/login/Login";
import CreateAccount from "../components/login/CreateAccount";
import LugarWrapper from "../components/LugarVista/LugarWrapper";
import {
  RequireUserRole,
  RequireAdminRole,
  RequireMerchantRole,
} from "../components/ProtectRole";

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
    element: <CreateAccount />,
  },
  {
    path: "/user",
    element: (
      <RequireUserRole>
        <h1>Welcome to protected role user</h1>
      </RequireUserRole>
    ),
  },
  {
    path: "/admin",
    element: (
      <RequireAdminRole>
        <h1>Welcome to protected role admin</h1>
      </RequireAdminRole>
    ),
  },
  {
    path: "/merchant",
    element: (
      <RequireMerchantRole>
        <h1>Welcome to protected role merchant</h1>
      </RequireMerchantRole>
    ),
  },
  {
    path: "/lugar/:localizacion/:nombre",
    element: <LugarWrapper />,
  },
]);

export default router;
