import React from "react";
import { Input } from "@nextui-org/react";
import WhatsappIcons from "../../Icons/whatsapp/WhatsappIcon";

export default function InputWhatsapp({ value, setValue }) {
  return (
    <Input
      type="tel"
      label="Número de Whatsapp"
      variant="bordered"
      placeholder="55555555"
      labelPlacement="outside"
      endContent={<WhatsappIcons w="20px" />}
      onChange={(event) => {
        setValue({
          ...value,
          whatsapp: event.target.value,
        });
      }}
    />
  );
}