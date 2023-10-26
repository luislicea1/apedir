import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Tooltip,
  Checkbox,
} from "@nextui-org/react";

import PropTypes from "prop-types";
import { EditIcon } from "../Icons/Edit/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import { updateAvailability } from "../../api/products";

export default function ProductCard({
  id,
  title,
  img,
  price,
  index,
  productInput,
  setProductInput,
  onProductEditOpen,
  isAvalaible,
}) {
  const [isSelected, setIsSelected] = useState(isAvalaible);
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

  const changeAvailability = async () => {
    setIsSelected(!isSelected);
    await updateAvailability(id, !isSelected);
  };

  return (
    <Card
      shadow="sm"
      key={index}
      isPressable
      style={CardStyles}
      className="producto-card"
    >
      <CardHeader style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="flex">
          <Checkbox
            isSelected={isSelected}
            onValueChange={changeAvailability}
          ></Checkbox>
          <p className="text-sm text-default-500">Activo</p>
        </div>

        <div className="flex" style={{ gap: "10px" }}>
          <Tooltip content="Editar producto">
            <span
              className="text-lg text-default-500 cursor-pointer active:opacity-50"
              onClick={() => {
                setProductInput(productInput);
                onProductEditOpen();
              }}
            >
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar producto">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
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
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
