import React, { useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import "./login.css";
import ApedirLogoNegro from "../../assets/ApedirLogoNegro.svg";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { login, signInWithGoogle } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Login() {
  const variants = ["flat", "bordered", "underlined", "faded"];
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const btnStyle = {
    height: "56px",
  };

  const form = useRef();
  const navigate = useNavigate();

  async function loginSubmit(event) {
    event.preventDefault();
    const { email, password } = form.current;
    if ((email.value === "") | (password.value === ""))
      return toast.error("Los campos no pueden estar vacios");

    const { session, message, isValid } = await login(
      email.value,
      password.value
    );
    if (isValid && session) return navigate("/");
    else toast.error(message);
  }

  return (
    <div className="contenedor-pt-login">
      <div className="login-container">
        <img src={ApedirLogoNegro} alt="" srcSet="" className="logo-img" />
        <form className="login-container" ref={form} onSubmit={loginSubmit}>
          {/* <Input type="text" variant={"bordered"} label="Nombre" /> */}
          <Input type="email" name="email" variant={"bordered"} label="Email" />
          <Input
            label="Password"
            name="password"
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
          <Button
            className="text-white btn-black"
            style={btnStyle}
            type="submit"
          >
            LOGIN
          </Button>
        </form>

        <Link isBlock showAnchorIcon href="/register" color="secondary">
          Crear cuenta
        </Link>
        <Link
          isBlock
          showAnchorIcon
          onClick={signInWithGoogle}
          color="secondary"
        >
          Sign in with Google
        </Link>
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
