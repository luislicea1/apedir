import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home";

import {
  RequireUserRole,
  RequireAdminRole,
  RequireMerchantRole,
} from "../components/ProtectRole";
import { CircularProgress } from "@nextui-org/react";
import NotFound from "../pages/NotFound/NotFound";

// Utilizando lazy para importar los componentes diferidos
const LazyLogin = lazy(() => import("../components/login/Login"));
const LazyCreateAccount = lazy(() =>
  import("../components/login/CreateAccount")
);
const LazyNegocioWrapper = lazy(() =>
  import("../components/Negocio/NegocioWrapper")
);
const LazyAdministradorNegocio = lazy(() =>
  import("../pages/AdministradorNegocio")
);
const LazyAdministradorNegocioGratuito = lazy(() =>
  import("../pages/AdministradorNegocioGratuito")
);
const LazyVerEventoWrapper = lazy(() =>
  import("../components/VisualizadorContenido/verEventoWrapper")
);
const LazyNegocioTableWrapper = lazy(() =>
  import("../pages/Admin/AdminBussiness")
);
const LazyAyudaInformacionWrapper = lazy(() =>
  import("../pages/AyudaInformacion")
);
const LazyVisualizarProductoWrapper = lazy(() =>
  import("../components/Negocio/VisualizadorProducto/VisualizarProductoWrapper")
);

const LazyNegocioGratuitoWrapper = lazy(() =>
  import("../components/NegociosGratuitos/NegocioGratuitoWrapper")
);
const LazyComprasWrapper = lazy(() => import("../pages/Compras"));

const LazyAyudaInformacion = lazy(() => import("../pages/AyudaInformacion"));

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const AdminPlans = lazy(() => import("../pages/Admin/AdminPlans"));

const PricingPage = lazy(() => import("../pages/PricingPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/plans",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <PricingPage />,
      </Suspense>
    ),
  },

  {
    path: "/login",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <LazyCreateAccount />
      </Suspense>
    ),
  },
  {
    path: "/ayuda_e_informacion",
    element: (
      <Suspense fallback={<CircularProgress />}>
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
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "/admin/plans",

        element: (
          <Suspense fallback={<CircularProgress />}>
            <AdminPlans />
          </Suspense>
        ),
      },
      {
        path: "/admin/businesses",

        element: (
          <Suspense fallback={<CircularProgress />}>
            <LazyNegocioTableWrapper />
          </Suspense>
        ),
      },
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
    path: "/ayudaInformacion",
    element: (
      <Suspense fallback={<CircularProgress />}>
            <LazyAyudaInformacionWrapper />
        </Suspense>
    ),
  },
  {
    path: "/lugar",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: ":localizacion/:nombre/",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LazyNegocioWrapper />
          </Suspense>
        ),
      },
      {
        path: ":localizacion/:nombre/producto/:title",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LazyVisualizarProductoWrapper />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/lugarGratuito",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: ":localizacion/:nombre/",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LazyNegocioGratuitoWrapper />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/evento/:nombre",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <LazyVerEventoWrapper />
      </Suspense>
    ),
  },
  {
    path: "/administrador-negocio",
    element: (
      <Suspense
        fallback={<CircularProgress color="secondary" label="Cargando..." />}
      >
        <LazyAdministradorNegocio />
      </Suspense>
    ),
  },
 
  {
    path: "/carrito",
    element: (
      <Suspense
        fallback={
          <CircularProgress color="secondary" />
        }
      >
        <LazyComprasWrapper />
      </Suspense>
    ),
  },
  
  {
    path: "/administrador-negocio-gratuito",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <LazyAdministradorNegocioGratuito />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
