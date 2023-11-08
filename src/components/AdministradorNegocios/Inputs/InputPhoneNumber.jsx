import React from 'react'
import { Input } from "@nextui-org/react";
import { PhoneIcon } from "./PhoneIcon";

export default function InputPhoneNumber({ value, setValue }) {
  return (
    <Input
      type="number"
      label="Número Celular"
      variant="bordered"
      placeholder="+53 XXXXXXXX"
      labelPlacement="outside"
      value={value.phone_number}
      endContent={<PhoneIcon w="20px" />}
      onChange={(event) => {
        setValue((prevState) => ({
          ...prevState,
          phone_number: event.target.value,
        }));
      }}
    />
  );
}
