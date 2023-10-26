import React from "react";
import {Input} from "@nextui-org/react";
import {PhoneIcon} from './PhoneIcon';

export default function InputPhoneNumber() {
  return (
    <Input
      type="tel"
      label="Número Celular"
      variant="bordered"
      placeholder="55555555"
      labelPlacement="outside"
      endContent={
        <PhoneIcon w= "20px"/>
   
      }
    />
  );
}
