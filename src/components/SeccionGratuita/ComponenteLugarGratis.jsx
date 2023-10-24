import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ComponenteLugarGratis(props) {
  const navigate = useNavigate();
  const CardStyles = {
    height: "100%",
    maxHeight: "400px",
  };
  const ImgCardStyle = {
    height: "100%",
    display: "grid",
    placeItems: "center",
  };
  const ImgStyle = {
    maxHeight: "300px",
    borderRadius: "20px",
  };

  ComponenteLugarGratis.propTypes = {
    localizacion: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    numeroPersonas: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  };
  
  return (
    <a onClick={() => navigate(`/lugarGratuito/${props.localizacion}/${props.nombre}`)}>
      <Card className="py-4" style={CardStyles}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{props.localizacion}</p>
          <small className="text-default-500">
            {props.numeroPersonas} personas les gusta este lugar
          </small>
          <h4 className="font-bold text-large">{props.nombre}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2" style={ImgCardStyle}>
          <Image
            alt="Card background NextUI hero Image with delay"
            className="object-cover rounded-xl"
            // src={props.imagen}
            src={props.imagen}
            style={ImgStyle}
          />
        </CardBody>
      </Card>
    </a>
  );
}
