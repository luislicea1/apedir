import React from "react";
import { Button } from "@nextui-org/react";
import TelefonoIcon from "../../Icons/Llamada/Telefono";
import { Link } from "@nextui-org/react";
import LocationIcon from "../../Icons/Location/Location";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import LocalizacionImg from "../../../assets/img/img (1).jpg";
import { Image } from "@nextui-org/react";
import { fontWhite, MarginTop30 } from "../../styles/styles";
import ShareLink from "../Share/ShareLink";
import { NotificationIcon } from "../../Icons/NotificationIcon";
import { addSubscription } from "../../../api/profile";

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
    marginTop: "30px",
  };
  return (
    <div className="flex gap-4 items-center" style={MarginTop30}>
      {props.suscrito === "no" ? (
        <Button
          color="primary"
          onClick={() => {
            
            addSubscription(props.userId, props.bussinessId);
          }}
        >
          <p>Suscribirse</p>
          <NotificationIcon></NotificationIcon>
        </Button>
      ) : (
        <Button color="primary">
          <p>Suscrito</p>
          <NotificationIcon></NotificationIcon>
        </Button>
      )}

      <ShareLink url={props.url}></ShareLink>

      {props.localizacion !== undefined ? (
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
                {props.localizacion}
                <Image
                  isZoomed
                  src={props.gps_location}
                  alt=""
                  style={imagenLocalizacion}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
}
