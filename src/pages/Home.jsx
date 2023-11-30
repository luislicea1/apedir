import Seccion from "../components/Seccion/Seccion";
import SeccionEventos from "../components/Eventos/SeccionEventos";
import React from "react";

export default function Home() {
  return (
    <div>
      <SeccionEventos title = "Eventos" ></SeccionEventos>
      <Seccion title="Lugares" ></Seccion>
    </div>
  );
}
