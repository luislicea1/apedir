import React from "react";
import { Input } from "@nextui-org/react";
import TelegramIcon from "../../Icons/Telegram/Telegram";

export default function InputTelegram({ value, setValue }) {
  const [render, setRender] = React.useState(0);

  return (
    <Input
      type="tel"
      label="Link de Telegram"
      variant="bordered"
      placeholder="Link de telegram o el link de tu grupo"
      labelPlacement="outside"
      value={
        value.current.telegram_link !== null &&
        value.current.telegram_link !== undefined
          ? value.current.telegram_link
          : ""
      }
      endContent={<TelegramIcon w="20px" />}
      onChange={(event) => {
        value.current = {
          ...value.current,
          telegram_link: event.target.value,
        };
        setRender((render) => render + 1);
      }}
    />
  );
}
