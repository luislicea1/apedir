import React from "react";
import Header from "../components/header/Header";
import Seccion from "../components/Seccion/Seccion";
import SeccionMR from "../components/SeccionMasRecomendados/SeccionMR";
import { lugares } from "../components/Lugares/Lugares";
import { lugaresRecomendados } from "../components/Lugares/LugaresRecomendados";


export default function Home() {
  return (
    <div>
      <Header></Header>
      <SeccionMR title="Lugares Recomendados"
        lugares={lugaresRecomendados}></SeccionMR>
      <Seccion title="Lugares" lugares={lugares}></Seccion>
      <Seccion title="Otros Lugares" lugares={lugares}></Seccion>
    </div>
  );
}
