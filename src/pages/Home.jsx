import { lugares } from "../components/Lugares/Lugares";
import { Helmet } from "react-helmet";
import Seccion from "../components/Seccion/Seccion";
import Prueba2 from "../components/prueba/Prueba2";
import Prueba3 from "../components/prueba/Prueba3";

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
      {/* <Seccion title="Lugares" lugares={lugares}></Seccion> */}
      <Prueba3 title = "lugares" lugares = {lugares}></Prueba3>
    </div>
  );
}
