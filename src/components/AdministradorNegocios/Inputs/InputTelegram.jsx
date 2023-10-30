import React from "react";
import { Input } from "@nextui-org/react";
import TelegramIcon from "../../Icons/Telegram/Telegram";

export default function InputTelegram({ value, setValue }) {
  return (
    <Input
      type="tel"
      label="Link de Telegram"
      variant="bordered"
      placeholder="Link de telegram o el link de tu grupo"
      labelPlacement="outside"
      value={value.telegram_link}
      endContent={<TelegramIcon w="20px" />}
      onChange={(event) => {
        setValue({
          ...value,
          telegram_link: event.target.value,
        });
      }}
    />
  );
}
