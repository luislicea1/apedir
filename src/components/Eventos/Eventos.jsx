import React from "react";
import { Badge, Avatar } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Eventos(props) {
  const navigate = useNavigate();
  const CardStyles = {
    width: "140px",
    height: "140px",
    background: "transparent",
  };
  const margin = {
    margin: "30px 5px 30px 5px",
  };
  const newBtn = {
    width: "50px",
  };
  return (
    <div className="" style={margin}>
      <Link onClick={() => navigate(`/evento/${props.nombre}`)}>
        <Badge content="new" color="danger" size="lg" style={newBtn}>
          <Avatar
            isBordered
            radius="md"
            color="danger"
            src={props.imagen}
            style={CardStyles}
          />
        </Badge>
      </Link>
    </div>
  );
}
