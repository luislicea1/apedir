import React from "react";
import {Input} from "@nextui-org/react";
import TelefonoIcon from "../../Icons/Llamada/Telefono";

export default function InputTelefonoLocalNumber() {
  return (
    <Input
      type="tel"
      label="Telefono del Local"
      variant="bordered"
      placeholder="22666666"
      labelPlacement="outside"
      endContent={
        <TelefonoIcon  w= "20px"/>
   
      }
    />
  );
}
