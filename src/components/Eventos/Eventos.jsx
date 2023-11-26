import React from "react";
import { Avatar } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
//import MyAvatar from "./Avatar";
import { EventoCardStyles, eventoMargin } from "../styles/styles";

export default function Eventos(props) {
  const navigate = useNavigate();

  return (
    <div className="" style={eventoMargin}>
      <Link onClick={() => navigate(`/evento/${props.nombre}`)}>
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
