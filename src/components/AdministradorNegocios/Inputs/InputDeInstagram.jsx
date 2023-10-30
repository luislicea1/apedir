import { Input } from "@nextui-org/react";

export default function InputDeInstagram({ value, setValue }) {
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
      value={value.instagram}
      onChange={(event) => {
        setValue({
          ...value,
          instagram: event.target.value,
        });
      }}
    />
  );
}
