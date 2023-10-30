import React from "react";
import { Input } from "@nextui-org/react";
import TelefonoIcon from "../../Icons/Llamada/Telefono";

export default function InputTelefonoLocalNumber({ value, setValue }) {
  return (
    <Input
      type="tel"
      label="Telefono del Local"
      variant="bordered"
      placeholder="22666666"
      labelPlacement="outside"
      value={value.local_phone}
      endContent={<TelefonoIcon w="20px" />}
      onChange={(event) => {
        setValue({
          ...value,
          local_phone: event.target.value,
        });
      }}
    />
  );
}
