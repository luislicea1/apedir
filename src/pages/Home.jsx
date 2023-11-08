import React from 'react'
import Header from "../components/header/Header";
import SeccionMR from "../components/SeccionMasRecomendados/SeccionMR";
import { lugaresRecomendados } from "../components/Lugares/LugaresRecomendados";
import SeccionEventos from "../components/Eventos/SeccionEventos";
import { eventos } from "../components/Lugares/Eventos";

export default function Home() {
    return (
    <div>
      <Header></Header>
      <SeccionEventos title = {"Eventos"} eventos = {eventos}></SeccionEventos>
      <SeccionMR
        title="Lugares Recomendados"
        lugares={lugaresRecomendados}
      ></SeccionMR>
      {/* <Seccion title="Lugares" lugares={lugares} ></Seccion> */}
      {/* <SeccionGratuita title="Otros Lugares" lugares={lugares} ></SeccionGratuita> */}
    </div>
  );
}
