import React from "react";
import { Input } from "@nextui-org/react";

export default function InputDeFaceBook({ value, setValue }) {
  const [render, setRender] = React.useState(0);
  return (
    <Input
      type="url"
      label="Facebook"
      placeholder="https://www.facebook.com/username"
      variant="bordered"
      labelPlacement="outside"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small"></span>
        </div>
      }
      value={
        value.current.facebook !== null && value.current.facebook !== undefined
          ? value.current.facebook
          : ""
      }
      onChange={(event) => {
        value.current = {
          ...value.current,
          facebook: event.target.value,
        };
        setRender((render) => render + 1);
      }}
    />
  );
}
