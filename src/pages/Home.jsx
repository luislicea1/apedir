import React, { lazy, Suspense } from "react";
import { lugares } from "../components/Lugares/Lugares";
import Prueba from "../components/prueba/Card1";
import { Helmet } from "react-helmet";
// const Header = React.memo(lazy(()=>import ('../components/header/Header')));
const Seccion = React.memo(lazy(() => import("../components/Seccion/Seccion")));


export default function Home() {
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="pagina de promocion de negocios en cuba"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/logo.svg"
          alt="logo apedir"
        />
      </Helmet>

      {/* <Prueba></Prueba> */}

       <Suspense>
        <Seccion title="Lugares" lugares={lugares}></Seccion>
      </Suspense> 
    </div>
  );
}
