import React from "react";
import { PortadaDeNegocioStyles} from "../../styles/styles";
import { Imagen100pcCover, Degradado1 } from "../../styles/styles";

export default function PortadaDeNegocio(props) {
  return (
    <div style={PortadaDeNegocioStyles}>
      <img
        style={Imagen100pcCover}
        src={props.imagenPortada}
        alt="Card background"
      />
      <div style={Degradado1}></div>
    </div>
  );
}
