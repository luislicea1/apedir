import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import InputDeFaceBook from "./Inputs/InputDeFaceBook";
import InputDeInstagram from "./Inputs/InputDeInstagram";
import InputTelegram from "./Inputs/InputTelegram";
import InputWhatsapp from "./Inputs/InputWhatsapp";
import TextAreaDescription from "./Inputs/TextAreaDescripcion";
import InputTitle from "./Inputs/InputTitle";
import ImageUploadButton from "./Inputs/ImagenUploadButton";
import InputGmail from "./Inputs/InputGmail";
import InputLocation from "./Inputs/InputLocation";
import InputPhoneNumber from "./Inputs/InputPhoneNumber";
import InputTelefonoLocalNumber from "./Inputs/InputTelefonoLocal";
import { upsertBussiness } from "../../api/bussiness";
import useUserStore from "../../hooks/useStore";
import BussinessInputSchema from "../../schemas/bussinessInputSchema";
import { Toaster, toast } from "sonner";

const bg = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: "10px",
  padding: "40px 0",
};

export default function NegocioDashboard() {
  const user = useUserStore((state) => state.user);

  const defaultBussinessValues = {
    owner: "",
    name: "",
    perfil_pic: "",
    front_pic: "",
    description: "",
    address: "",
    province: "",
    gps_location: "",
    email: "",
    phone_number: 0,
    whatsapp: 0,
    telegram_link: "",
    local_phone: 0,
    facebook: "",
    instagram: "",
    threads: "",
    linkedin: "",
    youtube: "",
    twitter: "",
  };
  const [bussinessInput, setBussinessInput] = useState(defaultBussinessValues);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formError, setFormError] = useState("");
  const handleUpsertBussiness = async () => {
    
    if (!isFormValid) {
      toast.error(formError);
      return;
    }
    
    await upsertBussiness(bussinessInput)


  };
  const validateForm = async () => {
    try {
      await BussinessInputSchema.validate(bussinessInput);
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
      setFormError(error.message);
    }
  };
  useEffect(() => {
    validateForm();
  }, [bussinessInput]);

  return (
    <>
      <Card>
        <CardBody>
          <InputTitle
            value={bussinessInput}
            setValue={setBussinessInput}
          ></InputTitle>
          <ImageUploadButton></ImageUploadButton>
          <TextAreaDescription
            value={bussinessInput}
            setValue={setBussinessInput}
            maxChars={120}
          ></TextAreaDescription>
          <InputLocation
            value={bussinessInput}
            setValue={setBussinessInput}
          ></InputLocation>
          <div style={bg}>
            <InputGmail
              value={bussinessInput}
              setValue={setBussinessInput}
            ></InputGmail>
            <InputPhoneNumber
              value={bussinessInput}
              setValue={setBussinessInput}
            ></InputPhoneNumber>
            <InputWhatsapp
              value={bussinessInput}
              setValue={setBussinessInput}
            ></InputWhatsapp>
            <InputTelegram
              value={bussinessInput}
              setValue={setBussinessInput}
            ></InputTelegram>
            <InputTelefonoLocalNumber
              value={bussinessInput}
              setValue={setBussinessInput}
            ></InputTelefonoLocalNumber>
            <InputDeFaceBook
              value={bussinessInput}
              setValue={setBussinessInput}
            ></InputDeFaceBook>
            <InputDeInstagram
              value={bussinessInput}
              setValue={setBussinessInput}
            ></InputDeInstagram>
          </div>
          <Toaster
            richColors
            theme="dark"
            position="bottom-center"
            duration={3000}
            closeButton
          />
          <Button
            color="secondary"
            className="text-white"
            onClick={() => {
              console.log(user);
              setBussinessInput((prevState) => {
                const updatedState = {
                  ...prevState,
                  owner: user.id,
                };

                return updatedState;
              });
              handleUpsertBussiness();
            }}
          >
            Agregar Negocio
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
