import React from "react";
import { Input } from "@nextui-org/react";
import { PhoneIcon } from "./PhoneIcon";

export default function InputPhoneNumber({value, setValue}) {
  return (
    <Input
      type="number"
      label="Número Celular"
      variant="bordered"
      placeholder="+53 XXXXXXXX"
      labelPlacement="outside"
      endContent={<PhoneIcon w="20px" />}
      onChange={(event) => {
        setValue({
          ...value,
          phone_number: event.target.value,
        });
      }}
    />
  );
}
