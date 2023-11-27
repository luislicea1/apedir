import React from "react";
import { Avatar } from "@nextui-org/react";
// import { Link } from "@nextui-org/react";
import { Link } from "react-router-dom";
//import MyAvatar from "./Avatar";
import { EventoCardStyles, eventoMargin } from "../styles/styles";

export default function Eventos(props) {
  return (
    <div style={eventoMargin}>
      <Link to={`/evento/${props.nombre}`}>
        <Avatar
          isBordered
          radius="md"
          color="danger"
          src={props.imagen}
          style={EventoCardStyles}
        />
      </Link>
    </div>
  );
}
