import React from "react";
import Header from "../components/header/Header";
import Seccion from "../components/Seccion/Seccion";
import { lugares } from "../components/Lugares/Lugares";
import { lugaresRecomendados } from "../components/Lugares/LugaresRecomendados";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Seccion
        title="Lugares Recomendados"
        lugares={lugaresRecomendados}
      ></Seccion>
      <Seccion title="Lugares" lugares={lugares}></Seccion>
      <Seccion title="Otros Lugares" lugares={lugares}></Seccion>
    </div>
  );
}
