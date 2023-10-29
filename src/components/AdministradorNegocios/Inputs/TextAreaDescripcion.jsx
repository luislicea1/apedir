import React from "react";
import { Textarea } from "@nextui-org/react";

export default function TextAreaDescription({ value, setValue, maxChars }) {
  const [charCount, setCharCount] = React.useState(0);

  return (
    <>
      <Textarea
        color={charCount > maxChars ? "danger" : "default"}
        variant="bordered"
        label="Descripción"
        labelPlacement="outside"
        placeholder="Inserte la descripción de su negocio, no puede sobrepasar la cantidad de caracteres establecidos"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        onChange={(event) => {
          const newCharCount = event.target.value.length;
          setCharCount(newCharCount);
          if (newCharCount < maxChars) {
            setValue({
              ...value,
              description: event.target.value,
            });
          }
        }}
      />
      <section className="flex justify-end">
        <p>
          {charCount} / {maxChars}
        </p>
      </section>
    </>
  );
}
