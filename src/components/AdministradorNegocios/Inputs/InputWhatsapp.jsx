import React from "react";
import { Input } from "@nextui-org/react";
import WhatsappIcons from "../../Icons/whatsapp/WhatsappIcon";

export default function InputWhatsapp({ value, setValue }) {
  const [render, setRender] = React.useState(0);

  return (
    <Input
      type="tel"
      label="Número de Whatsapp"
      variant="bordered"
      placeholder="55555555"
      labelPlacement="outside"
      value={value.current.whatsapp}
      endContent={<WhatsappIcons w="20px" />}
      onChange={(event) => {
        value.current = {
          ...value.current,
          whatsapp: event.target.value,
        };
        setRender((render) => render + 1);
      }}
    />
  );
}
