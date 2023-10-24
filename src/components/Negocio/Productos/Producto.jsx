import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Producto({
  localizacion,
  nombre,
  title,
  img,
  price,
  index,
}) {
  const navigate = useNavigate();
  const CardStyles = {
    height: "100%",
    //minHeight: "300px",
    maxHeight: "500px",
  };
  const ImgCardStyle = {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    aspectRatio: "16 / 9",
  };
  const ImgStyle = {
    width: "100%",
    height: "100%",
    maxHeight: "400px",
    borderRadius: "10px 10px 0 0",
  };
  return (
    <Link href={`/lugar/${localizacion}/${nombre}/producto/${title}`}>
      <Card
        shadow="sm"
        key={index}
        isPressable
        // onPress={() => console.log("item pressed")}
        style={CardStyles}
        className="producto-card"
      >
        <CardBody className="overflow-visible p-0" style={ImgCardStyle}>
          <Image
            radius="lg"
            width="100%"
            alt="Card background NextUI hero Image with delay"
            className="object-cover rounded-xl"
            src={img}
            style={ImgStyle}
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
