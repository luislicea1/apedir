import React from "react";
import {Input} from "@nextui-org/react";
import {MailIcon} from './MailIcon';

export default function InputGmail() {
  return (
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        
  );
}