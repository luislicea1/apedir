import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Tooltip,
} from "@nextui-org/react";

import PropTypes from "prop-types";
import { EditIcon } from "../Icons/Edit/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";

export default function ProductCard({
  localizacion,
  nombre,
  title,
  img,
  price,
  index,
}) {
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
    <Card
      shadow="sm"
      key={index}
      isPressable
      style={CardStyles}
      className="producto-card"
    >
      <CardHeader style={{ display: "flex", justifyContent: "flex-end" }}>
        <Tooltip content="Edit user">
          <span className="text-lg text-default-500 cursor-pointer active:opacity-50">
            <EditIcon />
          </span>
        </Tooltip>
        <Tooltip color="danger" content="Delete user">
          <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <DeleteIcon />
          </span>
        </Tooltip>
      </CardHeader>
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
  );
}

ProductCard.propTypes = {
  localizacion: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
