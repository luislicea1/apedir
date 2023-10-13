import React, { useState, useRef } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import "./login.css";
import ApedirLogoNegro from "../../assets/ApedirLogoNegro.svg";
import { Button } from "@nextui-org/react";
import { register } from "../../api/auth";
import { Toaster, toast } from "sonner";

export default function CreateAccont() {
  const variants = ["flat", "bordered", "underlined", "faded"];
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password, confirmPassword } = form.current;
    console.log(email.value, password.value, confirmPassword.value);
    if (
      (email.value === "") |
      (password.value === "") |
      (confirmPassword.value === "")
    ) {
      return toast.error("Los campos no pueden estar vacios");
    }
    const { message, isValid } = await register(
      email.value,
      password.value,
      confirmPassword.value
    );
    if (isValid) toast.success("message");
    else toast.error(message);
  }

  return (
    <div className="contenedor-pt-login">
      <div className="login-container">
        <img src={ApedirLogoNegro} alt="" srcSet="" className="logo-img" />
        <form ref={form} className="login-container" onSubmit={handleSubmit}>
          <Input type="email" name="email" variant={"bordered"} label="Email" />
          <Input
            name="password"
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
          <Input
            name="confirmPassword"
            label="Confirm Password"
            variant="bordered"
            placeholder="Confirm your password"
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
          <Button className="text-white btn-black" type="submit">
            Create Accont
          </Button>
        </form>
        <Toaster
          position="bottom-center"
          duration={3000}
          expand={false}
          richColors
        />
      </div>
    </div>
  );
}
