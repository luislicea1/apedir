import { lugares } from "../components/Lugares/Lugares";
import { eventos } from "../components/Lugares/Eventos";
import Seccion from "../components/Seccion/Seccion";
import SeccionEventos from "../components/Eventos/SeccionEventos";
import React from "react";

export default function Home() {
  return (
    <div>
      <SeccionEventos title = "Eventos" eventos = {eventos} ></SeccionEventos>
      <Seccion title="Lugares" lugares={lugares}></Seccion>
    </div>
  );
}
