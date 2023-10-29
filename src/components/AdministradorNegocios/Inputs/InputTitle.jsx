import { Input } from "@nextui-org/react";

export default function InputTitle({ value, setValue }) {
  return (
    <Input
      type="text"
      variant="bordered"
      label="Nombre"
      placeholder="Escriba el nombre de su negocio"
      labelPlacement="outside"
      onChange={(event) => {
        setValue({
          ...value,
          name: event.target.value,
        });
      }}
    />
  );
}
