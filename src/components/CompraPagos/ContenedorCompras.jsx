import { Card } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import React, { useState } from "react";
import { grid_2_col, grid_3_col_center , grid_4_col_center} from "../styles/styles";

export default function ContenedorCompras(props) {
  const [cantidad, setCantidad] = useState(props.cantidad);

  const incrementar = () => {
    setCantidad(prevCantidad => {
      const newCantidad = prevCantidad + 1;
      props.onQuantityChange(newCantidad);
      return newCantidad;
    });
  };

  const disminuir = () => {
    if (cantidad > 0) {
      setCantidad(prevCantidad => {
        const newCantidad = prevCantidad - 1;
        props.onQuantityChange(newCantidad);
        return newCantidad;
      });
    }
  };

  const precio = isNaN(props.price) ? 0 : props.price;
  const precioTotal = cantidad * precio;

  
  const btn = {
    background: "white",
    color: "black",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "grid",
    placeItems: "center",
  };
  return (
    <Card style={grid_4_col_center}>
      <div>
        <Image src={props.img}></Image>
      </div>
      <div>{props.title}</div>
      <div style={grid_3_col_center}>
        <button style={btn} onClick={disminuir}>
          -
        </button>
        {cantidad}
        <button style={btn} onClick={incrementar}>
          +
        </button>
      </div>
      <div>{precioTotal} $</div>

    </Card>
  );
}
