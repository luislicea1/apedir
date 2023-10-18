import React from "react";
import Producto from "./Producto";
import TituloDeProductos from "./TituloDeProductos";
import './productos.css'

export default function ListadoProductos(props) {
  const list = props.lista

  const listContainer = {
    
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "20px",
  };

  return (
    <div>
      <TituloDeProductos title = {props.title}></TituloDeProductos>
      <div
        className="mt-2 list-container"
        style={listContainer}
      >
        {list.map((item, index) => (
          <Producto
            index={index}
            img={item.img}
            price={item.price}
            title={item.title}
            nombre = {props.nombre}
            localizacion = {props.localizacion}
          ></Producto>
        ))}
      </div>
    </div>
  );
}
