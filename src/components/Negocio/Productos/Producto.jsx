import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  ImgCardStyle,
  CardStyles2,
  Imagen100pc400H,
  ProductoStyle
} from "../../styles/styles";

export default function Producto({
  localizacion,
  nombre,
  title,
  img,
  price,
  index,
}) {
  const navigate = useNavigate();

  return (
    <Link href={`/lugar/${localizacion}/${nombre}/producto/${title}`}>
      <Card
        shadow="sm"
        key={index}
        isPressable
        // onPress={() => console.log("item pressed")}
        style={CardStyles2}
        className="producto-card"
      >
        <CardBody className="overflow-visible p-0" style={ImgCardStyle}>
          <Image
            radius="lg"
            width="100%"
            alt="NextUI hero Image with delay"
            className="object-cover rounded-xl"
            src={img}
            //style={Imagen100pc400H}
            style={ProductoStyle}
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b>{title}</b>
          <p className="text-default-500">{price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

Producto.propTypes = {
  localizacion: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
