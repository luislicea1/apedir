import React from "react";
import { Input } from "@nextui-org/react";

export default function InputDeInstagram({ value }) {
  const [render, setRender] = React.useState(0);
  return (
    <Input
      type="url"
      label="Instagram"
      placeholder="https://www.instagram.com/username"
      variant="bordered"
      labelPlacement="outside"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small"></span>
        </div>
      }
      value={
        value.current.instagram !== undefined &&
        value.current.instagram !== null
          ? value.current.instagram
          : ""
      }
      onChange={(event) => {
        value.current = {
          ...value.current,
          instagram: event.target.value,
        };
        setRender((render) => render + 1);
      }}
    />
  );
}
