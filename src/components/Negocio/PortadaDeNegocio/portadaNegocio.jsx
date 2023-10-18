import React from "react";
import { Image } from "@nextui-org/react";
import Imagen22 from "../../../assets/img/img (1).jpg";

export default function PortadaDeNegocio(props) {
  const container = {
    width: "100%",
    height: "500px",
    display: "grid",
    placeItems: "center",
    background: "#ECECEE",
    borderRadius: "0 0 40px 40px",
    position: "relative",
  };

  const imagenStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const background = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "30%",
    background: "linear-gradient(rgba(255, 255, 255, 0),white)",
  };

  return (
    <div style={container}>
      <img
        style={imagenStyle}
        src={props.imagenPortada}
        alt="Card background"
      />
      <div style={background}></div>
    </div>
  );
}
