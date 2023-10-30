import React from "react";
import { Badge, Avatar } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { EventoCardStyles, eventoMargin, badge } from "../styles/styles";

export default function Eventos(props) {
  const navigate = useNavigate();
  
  return (
    <div className="" style={eventoMargin}>
      <Link onClick={() => navigate(`/evento/${props.nombre}`)}>
        <Badge content="new" color="danger" size="lg" style={badge}>
          <Avatar
            isBordered
            radius="md"
            color="danger"
            src={props.imagen}
            style={EventoCardStyles}
          />
        </Badge>
      </Link>
    </div>
  );
}
