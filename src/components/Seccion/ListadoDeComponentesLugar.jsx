import React from "react";
import './seccion.css'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import ComponenteLugar from "./ComponenteLugar";
import imagen1 from "../../assets/img/img (1).png"
import imagen2 from "../../assets/img/img (2).png"
import imagen3 from "../../assets/img/img (3).png"
import imagen4 from "../../assets/img/img (4).png"
import imagen5 from "../../assets/img/img (5).png"
import imagen6 from "../../assets/img/img (1).jpg"
import imagen7 from "../../assets/img/lg.jpg"


export default function ListadoDeComponentesLugar() {
    const listContainer = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "20px"
    }

    const lugares = [
        { nombre: "Club LED", localizacion: "Santiago de Cuba", numeroPersonas: 30, imagen: imagen1},
        { nombre: "Hamburguesas", localizacion: "Santiago de Cuba", numeroPersonas: 35, imagen: imagen2},
        { nombre: "Lugar 3", localizacion: "Santiago de Cuba", numeroPersonas: 20, imagen: imagen3},
        
        { nombre: "Club LED", localizacion: "Santiago de Cuba", numeroPersonas: 30, imagen: imagen4},
         { nombre: "Hamburguesas", localizacion: "Santiago de Cuba", numeroPersonas: 35, imagen: imagen5},
         { nombre: "Lugar 3", localizacion: "Santiago de Cuba", numeroPersonas: 20, imagen: imagen7},
         { nombre: "Club LED", localizacion: "Santiago de Cuba", numeroPersonas: 30, imagen: imagen4},
         { nombre: "Hamburguesas", localizacion: "Santiago de Cuba", numeroPersonas: 35, imagen: imagen5},
         { nombre: "Lugar 3", localizacion: "Santiago de Cuba", numeroPersonas: 20, imagen: imagen6}
      ];

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
