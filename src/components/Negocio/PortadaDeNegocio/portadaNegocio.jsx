import React from "react";
import {Image} from "@nextui-org/react";


export default function PortadaDeNegocio(props) {

  const container = {
    width: "100%",
    height: "500px",
    display: "grid",
    placeItems: "center"
  }

  const imagenStyle = {
   /* width: "100%",*/
    height: "100%",
    objectFit: "cover",
  }

  return (
    <div style={container}>
        <img
          style={imagenStyle}
          src={props.imagenPortada}
        />
        
    </div>
    
  );
}
