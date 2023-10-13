import React from "react";
import '../Seccion/seccion.css'
import ComponenteMR from "./ComponenteMR";



export default function ListadoDeComponentesMR(props) {
    const listContainer = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "20px"
    }

    const lugares = props.lugares
  return (
    <div className="list-container-recomend" style={listContainer}>
        {lugares.map((lugar, index) => (
        <ComponenteMR
          key={index}
          nombre={lugar.nombre}
          localizacion={lugar.localizacion}
          numeroPersonas = {lugar.numeroPersonas}
          imagen = {lugar.imagen}
        />
      ))}
    </div>
  );
}
