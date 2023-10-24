import React from "react";
import {Input} from "@nextui-org/react";

export default function InputTitle(){
    return(
        <Input type="text" variant="bordered" label="Nombre" placeholder="Inserte el nombre de su negocio" labelPlacement="outside"/>
    );
}