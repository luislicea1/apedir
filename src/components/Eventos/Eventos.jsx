import React from "react";
import { Avatar , Image, Card} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { EventoCardStyles, eventoMargin, badge } from "../styles/styles";

export default function Eventos(props) {
  const navigate = useNavigate();

  return (
    <div className="" style={eventoMargin}>
      <Link onClick={() => navigate(`/evento/${props.nombre}`)}>
        <Card style={{width: "140px"}}>
          <Image
            alt="NextUI hero Image with delay"
            radius="md"
            //color="danger"
            src={props.imagen}
            style={EventoCardStyles}
          />
        </Card>
        {/* <Avatar
          isBordered
          radius="md"
          color="danger"
          src={props.imagen}
          style={EventoCardStyles}
        /> */}
      </Link>
    </div>
  );
}
