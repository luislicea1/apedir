import React from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Page from "../pages/Page";
import AyudaInformacion from "../pages/AyudaInformacion";


import {
  RequireUserRole,
  RequireAdminRole,
  RequireMerchantRole,
} from "../components/ProtectRole";
import { CircularProgress } from "@nextui-org/react";
import NotFound from "../pages/NotFound/NotFound";

// Utilizando lazy para importar los componentes diferidos
const LazyPage = lazy(() => import("../pages/Page"));
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

const AdminTabs = lazy(() => import("../components/Admin/AdminTabs"));

const AdminPlans = lazy(() => import("../pages/Admin/AdminPlans"));

const PricingPage = lazy(() => import("../pages/PricingPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Page>
        <Home />
      </Page>
    ),
  },

  {
    path: "/plans",
    element: (
      <Page>
        <Suspense fallback={<CircularProgress />}>
          <PricingPage />,
        </Suspense>
      </Page>
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
        <LazyPage>
          <AyudaInformacion />
        </LazyPage>
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
      <Page>
        <RequireAdminRole>
          <Outlet />
        </RequireAdminRole>
      </Page>
    ),
    children: [
      {
        path: "/admin/",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AdminTabs />
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
      <Page>
        <Suspense fallback={<CircularProgress />}>
          <LazyAyudaInformacionWrapper />
        </Suspense>
      </Page>
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
        path: ":url",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LazyNegocioWrapper />
          </Suspense>
        ),
      },
      {
        path: ":url/producto/:title",
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
      <Page>
        <Suspense
          fallback={<CircularProgress color="secondary" label="Cargando..." />}
        >
          <LazyAdministradorNegocio />
        </Suspense>
      </Page>
    ),
  },

  {
    path: "/carrito",
    element: (
      <Suspense fallback={<CircularProgress color="secondary" />}>
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
