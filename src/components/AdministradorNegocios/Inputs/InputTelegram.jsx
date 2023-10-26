import React from "react";
import {Input} from "@nextui-org/react";
import TelegramIcon from "../../Icons/Telegram/Telegram";

export default function InputTelegram() {
  return (
    <Input
      type="tel"
      label="Número de Telegram"
      variant="bordered"
      placeholder="55555555"
      labelPlacement="outside"
      endContent={
        <TelegramIcon w= "20px"/>
   
      }
    />
  );
}
