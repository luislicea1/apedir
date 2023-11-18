import React, { lazy, Suspense, memo } from "react";
import { lugares } from "../components/Lugares/Lugares";
//import Prueba from "../components/prueba/Card1";
import { Helmet } from "react-helmet";
import Seccion from "../components/Seccion/Seccion";
// const Header = React.memo(lazy(()=>import ('../components/header/Header')));
// const Seccion = memo(lazy(() => import("../components/Seccion/Seccion")));

export default memo(function Home() {
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

      <Seccion title="Lugares" lugares={lugares}></Seccion>
    </div>
  );
});
