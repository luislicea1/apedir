import { lugares } from "../components/Lugares/Lugares";
import { Helmet } from "react-helmet";
import Seccion from "../components/Seccion/Seccion";


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
      <Seccion title="Lugares" lugares={lugares}></Seccion>
     
    </div>
  );
}
