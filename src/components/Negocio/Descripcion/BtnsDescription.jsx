import React from "react";
import {Button} from "@nextui-org/react";
import TelefonoIcon from "../../Icons/Llamada/Telefono";
import { Link } from "@nextui-org/react";
import Like from "../../Like/Like";

export default function BtnDescription() {

   const white ={
    color: "white"
   }
   const black ={
    color: "white"
   }
   const margin ={
    marginTop: "30px",
   }
  return (
    <div className="flex gap-4 items-center" style={margin}>
        <Link href = "#contact"  style={white}>
        <Button color="secondary" variant="shadow">
            <p>Contactenos</p>
            <TelefonoIcon></TelefonoIcon>
        </Button>
        </Link>
        
        <Link href = "#contact"  color="foreground">
        <Button color="primary" variant="shadow">
            <p>Domicilio</p>
            <TelefonoIcon></TelefonoIcon>
        </Button>
        </Link>

        <Like></Like>
    </div>
  );
}
