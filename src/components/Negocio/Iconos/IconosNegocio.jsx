import UserIcon from "../../Icons/user/UserIcon";
import WhatsappIcons from "../../Icons/whatsapp/WhatsappIcon";
import InstagramIcon from "../../Icons/Instagram/InstagramIcon";
import TelegramIcon from "../../Icons/Telegram/Telegram";
import Correo from "../../Icons/Correo/correo";
import TelefonoIcon from "../../Icons/Llamada/Telefono";
import HeartIconContainer from "../../Icons/HeartIcon/HeartIconContainer";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

export default function IconosNegocio() {

  const telefono = {
    background: "#5e17eb",
    margin: "10px",
    height: "70px"
  }
  const whatsapp = {
    background: "#25D366",
    margin: "10px",
    height: "70px"
  }
  const instagram = {
    background: "linear-gradient(#405DE6, #5B51D8, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #FCAF45, #FFDC80)",
    margin: "10px",
    height: "70px"
  }
  const telegram = {
    background: " #229ED9",
    margin: "10px",
    height: "70px"
  }
  const correo = {
    background: "#f2a60c",
    margin: "10px",
    height: "70px"
  }

  return (
    <div className="mt-2" id="contactenos">
      <Popover placement="bottom">
        <PopoverTrigger>
          <Button style={telefono}>
            <TelefonoIcon color="white"></TelefonoIcon>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>
      <Popover placement="bottom">
        <PopoverTrigger>
          <Button style={whatsapp}>
            <WhatsappIcons color="white"></WhatsappIcons>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover placement="bottom">
        <PopoverTrigger>
          <Button style={telegram}>
            <TelegramIcon color="white" ></TelegramIcon>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover placement="bottom">
        <PopoverTrigger>
          <Button style={instagram}>
            <InstagramIcon color="white"></InstagramIcon>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover placement="bottom">
        <PopoverTrigger>
          <Button style={correo}>
            <Correo color="white"></Correo>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
