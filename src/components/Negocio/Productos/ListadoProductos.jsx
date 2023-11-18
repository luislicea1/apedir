import React, { memo, useCallback } from "react";
import Producto from "./Producto";
import TituloDeProductos from "./TituloDeProductos";
import "./productos.css";
import { grid_3_col } from "../../styles/styles";

// Envolviendo el componente Producto con React.memo
const ProductoMemo = memo(Producto);

export default function ListadoProductos(props) {
  const list = props.lista;

  // Usando useCallback para evitar la creación de nuevas funciones en cada renderizado
  const renderProducto = useCallback(
    (item, index) => (
      <ProductoMemo
        key={index}
        index={index}
        img={item.image}
        price={item.price}
        currency={item.currency}
        title={item.title}
        nombre={props.nombre}
        localizacion={props.localizacion}
      ></ProductoMemo>
    ),
    [props.nombre, props.localizacion]
  );

  return (
    <>
      <TituloDeProductos title={props.title}></TituloDeProductos>
      <div className="mt-2 list-container" style={grid_3_col}>
        {list.map(renderProducto)}
      </div>
    </>
  );
}
