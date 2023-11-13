import TituloDeSeccion from "../Seccion/TituloDeSeccion";
import ListadoDeComponentesLugarGratis from "./ListadoDeComponentesLugaresGratis";
import { container, section } from "../styles/styles";
import React, { lazy, Suspense } from "react";

const Header = lazy(() => import("../components/header/Header"));
const Seccion = lazy(() => import("../components/Seccion/Seccion"));

export default function SeccionGratuita(props) {
  return (
    <div
      style={container}
      className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <section className="section px-6" style={section}>
        <Suspense>
          <TituloDeSeccion title={props.title}></TituloDeSeccion>
          <ListadoDeComponentesLugarGratis
            lugares={props.lugares}
          ></ListadoDeComponentesLugarGratis>
        </Suspense>
      </section>
    </div>
  );
}
