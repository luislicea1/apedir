import React from "react";
import {Textarea} from "@nextui-org/react";

export default function TextAreaDescription() {
  return (
    <Textarea
        variant="bordered"
        label="Descripción"
        labelPlacement="outside"
        placeholder="Inserte la descripción de su negocio"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
    />
  );
}
