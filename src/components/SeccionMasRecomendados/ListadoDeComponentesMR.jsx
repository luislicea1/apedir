import React, { lazy, Suspense } from "react";
import "../Seccion/seccion.css";
//import ComponenteMR from "./ComponenteMR";
import { grid_2_col } from "../styles/styles";

const ComponenteMR = lazy(() => import("./ComponenteMR"));

export default function ListadoDeComponentesMR(props) {
  const lugares = props.lugares;
  return (
    <div className="list-container-recomend" style={grid_2_col}>
      {lugares.map((lugar, index) => (
        <Suspense>
          <ComponenteMR
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
