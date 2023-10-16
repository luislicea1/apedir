import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/login/Login";
import CreateAccount from "../components/login/CreateAccount";
import NegocioWrapper from "../components/Negocio/NegocioWrapper";
import AyudaInformacion from "../pages/AyudaInformacion";
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
    path: "/ayuda_e_informacion",
    element: <AyudaInformacion/>,
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
    element: <NegocioWrapper/>,
  },
]);

export default router;
