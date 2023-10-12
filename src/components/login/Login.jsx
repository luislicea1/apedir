import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import "./login.css";
import ApedirLogoNegro from '../../assets/ApedirLogoNegro.svg'
import {Button} from "@nextui-org/react";
import {Link} from "@nextui-org/react";

export default function Login() {
  const variants = ["flat", "bordered", "underlined", "faded"];
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="contenedor-pt-login">
      <div className="login-container">
        <img src={ApedirLogoNegro} alt="" srcset="" className="logo-img" />
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
        <Button  className="text-white btn-black">
            Login
        </Button>

        <Link isBlock showAnchorIcon href="#" color="secondary">
            Crear cuenta
        </Link>
      </div>
    </div>
  );
}
