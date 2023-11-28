import React from "react";
import { Button } from "@nextui-org/react";
import { grid_2_col_center } from "../../styles/styles";
import { useCartStore } from "../../../hooks/useStore";

export default function DescripcionDeP(props) {
  const glass = {
    width: "90%",
    position: "absolute",
    bottom: "0px",
    height: "32vh",
    background: "rgba(150, 156, 161, 0.411)",
    borderRadius: "20px",
    marginBottom: "3%",
    padding: "10px",
    zIndex: "1000",
    border: "gray 1px solid",
  };
  const center = {
    display: "grid",
    placeItems: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
  };
  const centertext = {
    display: "grid",
    placeItems: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
    height: "15vh",
    overflowY: "scroll",
  };
  const title = {
    color: "#FFD600",
    fontWeight: "bold",
    fontSize: "30px",
  };

  const btn = {
    marginTop: "15px",
    width: "95%",
  };

  const carrito = useCartStore((state) => state.cart);
  const setCarrito = useCartStore((state) => state.setCart);
  const handleClick = () => {
    // props.onAddToCart({ title: props.title, quantity: props.cantidad });
    const newOrder = { title: props.title, quantity: props.cantidad };
    const prevCart = carrito;
    setCarrito([...prevCart, newOrder]);
  };

  return (
    <div
      style={glass}
      className=" backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <div style={center}>
        <h2
          style={{
            ...title,
            maxWidth: "20ch",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1.4rem",
          }}
        >
          {props.title}
        </h2>
      </div>
      <div style={centertext}>
        <article style={{ fontSize: ".9rem" }}>{props.text}</article>
      </div>

      <div style={grid_2_col_center}>
        <Button
          color="primary"
          style={{ zIndex: "100", width: "100%", color: "black" }}
          onClick={handleClick}
        >
          Agregar al Carrito
        </Button>
        <Button
          color="primary"
          variant="bordered"
          onPress={props.onClose} // Usando la función onClose aquí
          style={{
            zIndex: "100",
            width: "100%",
            //color: "white",
          }}
        >
          Volver
        </Button>
      </div>
    </div>
  );
}
