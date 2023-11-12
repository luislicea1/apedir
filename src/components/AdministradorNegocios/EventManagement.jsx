import React, { useState, lazy } from "react";
import { Card, CardBody, Button, Textarea, Image } from "@nextui-org/react";
//import InputTitle from "./Inputs/InputTitle";
//import InputGmail from "./Inputs/InputGmail";
//import InputPhoneNumber from "./Inputs/InputPhoneNumber";
import { grid_1_col, grid_2_col } from "../styles/styles";

const InputTitle = lazy(()=>import ("./Inputs/InputTitle"));
const InputGmail = lazy(()=> import("./Inputs/InputGmail"));
const InputPhoneNumber = lazy(()=> import("./Inputs/InputPhoneNumber"));

export default function EventManagement() {
  const defaultBussinessValues = {
    id: "",
    owner: "",
    name: "",
    perfil_pic: "",
    front_pic: "",
    description: "",
    address: "",
    province: "",
    gps_location: "",
    email: "",
    phone_number: "",
    whatsapp: "",
    telegram_link: "",
    local_phone: "",
    facebook: "",
    instagram: "",
    threads: "",
    linkedin: "",
    youtube: "",
    twitter: "",
  };
  const [bussinessInput, setBussinessInput] = useState(defaultBussinessValues);
  return (
    <div>
      <InputTitle
        value={bussinessInput}
        setValue={setBussinessInput}
      ></InputTitle>

      <div>
        <input
          type="file"
          id="logoImageUpload"
          accept="image/*"
          style={{ display: "none" }}
        // onChange={handleLogoImageUpload}
        />
        <br />
        <div style={grid_1_col}>
          <Image
            width={400}
            height={200}
            alt="NextUI hero Image with delay"
            src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          />
        </div>

        <Button
          style={{ color: "white" }}
          // style={white}
          color={"secondary"}
          onClick={() => document.getElementById("logoImageUpload").click()}
          className="mt-2"
        >
          Subir foto del evento
        </Button>
        <br />
        <br />
        <Textarea
          label="Descripción"
          labelPlacement="outside"
          style={{ width: "300px", height: "230px" }}
          placeholder="Escribe la descripción del evento"
          variant="bordered"
        />
      </div>

      <br />

      <div style={grid_2_col} className="mt-2 mb-2">
        <InputGmail
          value={bussinessInput}
          setValue={setBussinessInput}
        ></InputGmail>
        <InputPhoneNumber
          value={bussinessInput}
          setValue={setBussinessInput}
        ></InputPhoneNumber>
      </div>
      <br />
      <Button
        color="secondary"
        className="text-white mt-2"
      // style={btnHeight}
      >
        Agregar Evento
      </Button>
    </div>
  );
}
