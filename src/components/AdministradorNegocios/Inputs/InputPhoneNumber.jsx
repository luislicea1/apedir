import React from "react";
import { Input } from "@nextui-org/react";
import { PhoneIcon } from "./PhoneIcon";

export default function InputPhoneNumber({ value, setValue }) {
  const [render, setRender] = React.useState(0);

  return (
    <Input
      type="number"
      label="Número Celular"
      variant="bordered"
      placeholder="+53 XXXXXXXX"
      labelPlacement="outside"
      value={value.current.phone_number}
      endContent={<PhoneIcon w="20px" />}
      onChange={(event) => {
        value.current = {
          ...value.current,
          phone_number: parseInt(event.target.value),
        };
        setRender((render) => render + 1);
      }}
    />
  );
}
