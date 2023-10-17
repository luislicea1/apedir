import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import {
  RequireUserRole,
  RequireAdminRole,
  RequireMerchantRole,
} from "../components/ProtectRole";
import {CircularProgress} from "@nextui-org/react";
import verEventoWrapper from "../components/VisualizadorContenido/verEventoWrapper";

// Utilizando lazy para importar los componentes diferidos
const LazyLogin = lazy(() => import("../components/login/Login"));
const LazyCreateAccount = lazy(() =>
  import("../components/login/CreateAccount")
);
const LazyNegocioWrapper = lazy(() =>
  import("../components/Negocio/NegocioWrapper")
);

const LazyverEventoWrapper = lazy(() =>
  import("../components/VisualizadorContenido/verEventoWrapper")
);

const LazyAyudaInformacion = lazy(() => import("../pages/AyudaInformacion"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<CircularProgress aria-label="Loading..." />}>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<CircularProgress aria-label="Loading..." />}>
        <LazyCreateAccount />
      </Suspense>
    ),
  },
  {
    path: "/ayuda_e_informacion",
    element: (
      <Suspense fallback={<CircularProgress aria-label="Loading..." />}>
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
    element: (
      <Suspense fallback={<CircularProgress aria-label="Loading..." />}>
        <LazyNegocioWrapper />
      </Suspense>
    ),
  },
  {
    path: "/evento/:nombre",
    element: (
      <Suspense fallback={<CircularProgress aria-label="Loading..." />}>
        <LazyverEventoWrapper />
      </Suspense>
    ),
  },
]);

export default router;
