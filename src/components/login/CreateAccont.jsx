import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import "./login.css";
import ApedirLogoNegro from '../../assets/ApedirLogoNegro.svg'
import {Button} from "@nextui-org/react";

export default function CreateAccont() {
  const variants = ["flat", "bordered", "underlined", "faded"];
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const btnStyle = {
    height : "56px" ,
  }
  return (
    <div className="contenedor-pt-login">
      <div className="login-container">
        <img src={ApedirLogoNegro} alt="" srcSet="" className="logo-img" />
        <Input type="text" variant={"bordered"} label="Nombre" />
        <Input type="email" variant={"bordered"} label="Email" />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <Button  className="text-white" style={btnStyle}>
            Create Accont
        </Button>
      </div>
    </div>
  );
}
