import { Card } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import React, { useState } from "react";


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

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    placeItems: "center",
  };
  const grid2 = {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    placeItems: "center",
  };
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
    <Card style={grid}>
      <div>
        <Image src={props.img}></Image>
      </div>
      <div>{props.title}</div>
      <div style={grid2}>
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
