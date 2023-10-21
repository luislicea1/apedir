import Header from "../components/header/Header";
import Seccion from "../components/Seccion/Seccion";
import SeccionMR from "../components/SeccionMasRecomendados/SeccionMR";
import { lugares } from "../components/Lugares/Lugares";
import { lugaresRecomendados } from "../components/Lugares/LugaresRecomendados";
import SeccionEventos from "../components/Eventos/SeccionEventos";
import { eventos } from "../components/Lugares/Eventos";
import SeccionGratuita from "../components/SeccionGratuita/SeccionGratuita";

export default function Home() {
    return (
    <div>
      <Header></Header>
      <SeccionEventos title = {"Eventos"} eventos = {eventos}></SeccionEventos>
      <SeccionMR
        title="Lugares Recomendados"
        lugares={lugaresRecomendados}
      ></SeccionMR>
      <Seccion title="Lugares" lugares={lugares} ></Seccion>
      <SeccionGratuita title="Otros Lugares" lugares={lugares} ></SeccionGratuita>
    </div>
  );
}
