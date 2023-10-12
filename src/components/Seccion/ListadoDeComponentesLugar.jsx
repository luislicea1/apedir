import React from "react";
import './seccion.css'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import ComponenteLugar from "./ComponenteLugar";

export default function ListadoDeComponentesLugar(props) {
    const listContainer = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "20px"
    }

    const lugares = props.lugares
  return (
    <div className="list-container" style={listContainer}>
        {lugares.map((lugar, index) => (
        <ComponenteLugar
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
