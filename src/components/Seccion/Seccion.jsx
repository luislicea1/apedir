import React, { lazy, useState, useEffect } from "react";
import TituloDeSeccion from "./TituloDeSeccion";
import ListadoDeComponentesLugar from "./ListadoDeComponentesLugar";
import { container, section } from "../styles/styles";

// import { loadMoreBussiness } from "../../api/bussiness";

export default function Seccion(props) {
  // const [bussiness, setBussiness] = useState([]);
  // const [offset, setOffset] = useState(1);

  // useEffect(() => {
  //   const fetchValues = async () => {
  //     await loadMoreBussiness(offset, setOffset, setBussiness);
  //   };
  //   fetchValues();
  // }, [bussiness]);

  return (
    <div
      style={container}
      className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <section className="section px-6" style={section}>
        <TituloDeSeccion title={props.title}></TituloDeSeccion>
        <ListadoDeComponentesLugar
          lugares={props.lugares}
        ></ListadoDeComponentesLugar>
      </section>
    </div>
  );
}
