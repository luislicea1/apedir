import { container, section } from "../styles/styles";
import TituloDeSeccion from "../Seccion/TituloDeSeccion";
import React from "react";
import Card from "antd/es/card/Card";
//import ComponenteLugar from "../Seccion/ComponenteLugar";

export default function VipListNegocios(props) {
    const agregarUnNuevoNegocio = {
        width: "100%",
        height: "100px",
        borderRadius: "10px", 
        border: "2px dashed #cacaca",
        display: "grid",
        placeItems: "center",
    }
  return (
    <>
      <div
        style={container}
        className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
      >
        <section className="section px-6" style={section}>
          <TituloDeSeccion title={props.title}></TituloDeSeccion>

          <div style= {agregarUnNuevoNegocio}>
                Agregar Negocio
          </div>
          
        </section>
      </div>
    </>
  );
}
