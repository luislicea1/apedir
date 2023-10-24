import React from "react";
import { Button } from "@nextui-org/react";
import TelefonoIcon from "../../Icons/Llamada/Telefono";
import { Link } from "@nextui-org/react";
import Like from "../../Like/Like";
import LocationIcon from "../../Icons/Location/Location";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

export default function BtnDescription(props) {
  const white = {
    color: "white",
  };
  const black = {
    color: "white",
  };
  const margin = {
    marginTop: "30px",
  };

  const location = {
    background: "transparent",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    padding: "0",
    fontWeight: "0",
    lineHeight: "0",
    maxWidth: "40px",
    minWidth: "40px",
  };
  return (
    <div className="flex gap-4 items-center" style={margin}>
      {props.contact === "si" ? (
        <Link href="#contact" style={white}>
          <Button color="secondary" variant="shadow">
            <p>Contactenos</p>
            <TelefonoIcon></TelefonoIcon>
          </Button>
        </Link>
      ) : null}

      {props.domicilio === "si" ? (
        <Link href="#contact" color="foreground">
          <Button color="primary" variant="shadow">
            <p>Domicilio</p>
            <TelefonoIcon></TelefonoIcon>
          </Button>
        </Link>
      ) : null}

      {props.localizacion === "si" ? (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button color="secondary" style={location}>
              <LocationIcon w={"24px"} h={"24px"}></LocationIcon>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Direccion</div>
              <div className="text-tiny">
                Edificio 64 casa 14 entre Corona y Paseo Plaza de Marte
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : null}

      {props.like === "si" ? <Like></Like> : null}
    </div>
  );
}
