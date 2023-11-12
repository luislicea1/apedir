import React, { lazy, Suspense } from "react";
import "./seccion.css";
//import ComponenteLugar from "./ComponenteLugar";
import { grid_3_col } from "../styles/styles";

const ComponenteLugar = lazy(() => import("./ComponenteLugar"));

export default function ListadoDeComponentesLugar(props) {
  const lugares = props.lugares;
  return (
    <div className="list-container" style={grid_3_col}>
      {lugares.map((lugar, index) => (
        <Suspense>
          <ComponenteLugar
            key={index}
            nombre={lugar.nombre}
            localizacion={lugar.localizacion}
            numeroPersonas={lugar.numeroPersonas}
            imagen={lugar.imagen}
          />
        </Suspense>
      ))}
    </div>
  );
}
