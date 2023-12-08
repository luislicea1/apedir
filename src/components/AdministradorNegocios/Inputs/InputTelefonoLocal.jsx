import React from "react";
import { Input } from "@nextui-org/react";
import TelefonoIcon from "../../Icons/Llamada/Telefono";

export default function InputTelefonoLocalNumber({ value }) {
  const [render, setRender] = React.useState(0);
  return (
    <Input
      type="tel"
      label="Telefono del Local"
      variant="bordered"
      placeholder="22666666"
      labelPlacement="outside"
      value={value.current.local_phone}
      endContent={<TelefonoIcon w="20px" />}
      onChange={(event) => {
        value.current = {
          ...value.current,
          local_phone: parseInt(event.target.value),
        };
        setRender((render) => render + 1);
      }}
    />
  );
}
