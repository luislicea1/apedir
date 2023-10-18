import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home";

import {
  RequireUserRole,
  RequireAdminRole,
  RequireMerchantRole,
} from "../components/ProtectRole";
import Example from "../pages/Example";
// Utilizando lazy para importar los componentes diferidos
const LazyLogin = lazy(() => import("../components/login/Login"));
const LazyCreateAccount = lazy(() =>
  import("../components/login/CreateAccount")
);
const LazyNegocioWrapper = lazy(() =>
  import("../components/Negocio/NegocioWrapper")
);
const LazyAyudaInformacion = lazy(() => import("../pages/AyudaInformacion"));

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Home />,
    element: <Example/>
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyCreateAccount />
      </Suspense>
    ),
  },
  {
    path: "/ayuda_e_informacion",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAyudaInformacion />
      </Suspense>
    ),
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
        <Outlet />
      </RequireAdminRole>
    ),
    children: [
      {
        path: "/admin/",
        element: <AdminDashboard />,
      },

      // { path: "/dashboard", element: <Dashboard /> },
      // { path: "/settings", element: <Settings /> },
      // Agrega aquí más rutas hijas según sea necesario
    ],
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
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyNegocioWrapper />
      </Suspense>
    ),
  },
]);

export default router;
