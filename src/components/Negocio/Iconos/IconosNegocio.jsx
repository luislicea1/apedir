import React, { useState, useEffect } from "react";
import WhatsappIcons from "../../Icons/whatsapp/WhatsappIcon";
import InstagramIcon from "../../Icons/Instagram/InstagramIcon";
import TelegramIcon from "../../Icons/Telegram/Telegram";
import Correo from "../../Icons/Correo/correo";
import TelefonoIcon from "../../Icons/Llamada/Telefono";
import FaceBookIcon from "../../Icons/Facebook/FaceBookIcon";
import { grid_5_col, flex_center, grid_center } from "../../styles/styles";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { getSocialMedia } from "../../../api/bussiness";

export default function IconosNegocio(props) {
  const idNegocio = props.idNegocio;
  const [socialMedia, setSocialMedia] = useState(null);

  useEffect(() => {
    getSocialMedia(idNegocio).then((data) => {
      setSocialMedia(data[0]); // Accede al primer elemento del array
    });
  }, []);

  const telefono = {
    background: "#5E17EB",
    margin: "10px",
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    padding: "0",
    fontWeight: "0",
    lineHeight: "0",
    maxWidth: "50px",
    minWidth: "50px",
  };

  return (
    <div style={{ ...grid_center, width: "100%" }}>
      {socialMedia && (
        <div
          className="mt-2"
          id="contactenos"
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {socialMedia.phone_number ? (
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button style={telefono}>
                  <TelefonoIcon color="white" w={"30px"}></TelefonoIcon>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Numero de Telefono</div>
                  <div className="text-tiny">{socialMedia.phone_number}</div>
                </div>
              </PopoverContent>
            </Popover>
          ) : null}
          {socialMedia.email ? (
             <a href={`mailto:${socialMedia.email}`} target="_blank">
                <Correo color="white" w={"36px"}></Correo>
              </a>
          ) : null}
          {socialMedia.telegram_link ? (
            <a
              href={`https://t.me/+53${socialMedia.telegram_link}`}
              target="_blank"
            >
              <TelegramIcon color="white" w={"50px"}></TelegramIcon>
            </a>
          ) : null}
          {socialMedia.facebook ? (
            <a href={`https://www.facebook.com/${socialMedia.facebook.replace(/\s+/g, '')}`} target="_blank"> 
              <FaceBookIcon color="white" w={"36px"} h={"36px"}></FaceBookIcon>
            </a>
          ) : null}
          {socialMedia.instagram ? (
            <a href={`https://www.instagram.com/${socialMedia.instagram.replace(/\s+/g, '')}`}  target="_blank">
              <InstagramIcon color="white" w={"36px"}></InstagramIcon>
            </a>
          ) : null}
          {socialMedia.whatsapp ? (
            <a href={`https://wa.me/${socialMedia.whatsapp}`} target="_blank">
              <WhatsappIcons color="white" w={"36px"}></WhatsappIcons>
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}
