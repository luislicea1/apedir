
import WhatsappIcons from "../../Icons/whatsapp/WhatsappIcon";
import InstagramIcon from "../../Icons/Instagram/InstagramIcon";
import TelegramIcon from "../../Icons/Telegram/Telegram";
import Correo from "../../Icons/Correo/correo";
import TelefonoIcon from "../../Icons/Llamada/Telefono";
import { grid_5_col } from "../../styles/styles";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

export default function IconosNegocio() {

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
    minWidth: "50px"
  }
  
  return (
    <div className="mt-2" id="contactenos" style={grid_5_col}>
      <Popover placement="bottom">
        <PopoverTrigger>
          <Button style={telefono}>
            <TelefonoIcon color="white" w = {"30px"}></TelefonoIcon>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>
    
            <WhatsappIcons color="white" w = {"36px"}></WhatsappIcons>
            <TelegramIcon color="white" w = {"50px"}></TelegramIcon>
            <InstagramIcon color="white" w = {"36px"}></InstagramIcon>
            <Correo color="white"w = {"36px"}></Correo>
          
        
    </div>
  );
}
