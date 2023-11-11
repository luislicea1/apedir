import React from 'react'
import Header from "../components/header/Header";
//import SeccionMR from "../components/SeccionMasRecomendados/SeccionMR";
//import { lugaresRecomendados } from "../components/Lugares/LugaresRecomendados";
import { lugares } from '../components/Lugares/Lugares';
//import SeccionEventos from "../components/Eventos/SeccionEventos";
//import { eventos } from "../components/Lugares/Eventos";
//import Seccion from '../components/Seccion/Seccion';
import { Suspense,lazy } from 'react';
const Seccion = lazy(() => import("../components/Seccion/Seccion"))

export default function Home() {
    return (
    <div>
      <Header></Header>
      {/* <SeccionEventos title = {"Eventos"} eventos = {eventos}></SeccionEventos> */}
      {/* <SeccionMR
        title="Lugares Recomendados"
        lugares={lugaresRecomendados}
      ></SeccionMR> */}
      <Suspense>
        <Seccion title="Lugares 2" lugares={lugares} ></Seccion> 
      </Suspense>
      
      {/* <SeccionGratuita title="Otros Lugares" lugares={lugares} ></SeccionGratuita> */}
    </div>
  );
}
