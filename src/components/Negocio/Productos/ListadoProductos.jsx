import React from "react";
import Producto from "./Producto";
import TituloDeProductos from "./TituloDeProductos";
import "./productos.css";
import { grid_3_col } from "../../styles/styles";

export default function ListadoProductos(props) {
  const list = props.lista;

  return (
    <div>
      <TituloDeProductos title={props.title}></TituloDeProductos>
      <div className="mt-2 list-container" style={grid_3_col}>
        {list.map((item, index) => (
          <Producto
            key={index}
            index={index}
            img={item.img}
            price={item.price}
            title={item.title}
            nombre={props.nombre}
            localizacion={props.localizacion}
          ></Producto>
        ))}
      </div>
    </div>
  );
}
