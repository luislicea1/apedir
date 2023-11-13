import React from "react";
import { Button } from "@nextui-org/react";
import TelefonoIcon from "../../Icons/Llamada/Telefono";
import { Link } from "@nextui-org/react";
import LocationIcon from "../../Icons/Location/Location";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import LocalizacionImg from "../../../assets/img/img (1).jpg"
import { Image } from "@nextui-org/react";
import { fontWhite , MarginTop30} from "../../styles/styles";

export default function BtnDescription(props) {
  
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

  const imagenLocalizacion = {
    maxWidth: "300px",
    marginTop: "30px"
  }
  return (
    <div className="flex gap-4 items-center" style={MarginTop30}>
      {props.contact === "si" ? (
        <Link href="#contact" style={fontWhite}>
          <Button color="secondary" >
            <p>Contactenos</p>
            <TelefonoIcon></TelefonoIcon>
          </Button>
        </Link>
      ) : null}

      {props.domicilio === "si" ? (
        <Link href="#contact" color="foreground">
          <Button color="primary" >
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
                <Image  isZoomed src={LocalizacionImg} alt="" style={imagenLocalizacion}/>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : null}

      
    </div>
  );
}
