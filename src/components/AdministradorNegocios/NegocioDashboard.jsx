import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@nextui-org/react";
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
import { removeImage, uploadImage } from "../../api/images";
import { getOneBussiness, upsertBussiness } from "../../api/bussiness";
import BussinessInputSchema from "../../schemas/bussinessInputSchema";
import { Toaster, toast } from "sonner";
import { grid_2_col, btnHeight } from "../styles/styles";

export default function NegocioDashboard({ user, business }) {
  // const [user, setUser] = useState(null);

  const [imageName, setImageName] = useState({
    front_pic: "",
    perfil_pic: "",
    gps_location: "",
  });
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
  // const user = useUserStore((state) => state.user);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchBussiness = async () => {
    if (
      JSON.stringify(bussinessInput) ===
        JSON.stringify(defaultBussinessValues) &&
      bussinessInput !== null &&
      user.id !== ""
    ) {
      const b = await getOneBussiness(user.id);

      if (b !== null && b !== undefined) {
        setBussinessInput(b);
      }
    }
  };

  const handleUpsertBussiness = async () => {
    if (!isFormValid) {
      toast.error(formError);
      return;
    }

    let front_pic = "";
    if (
      bussinessInput.front_pic !== null &&
      bussinessInput.front_pic !== "" &&
      bussinessInput.front_pic instanceof Blob
    ) {
      await removeImage(bussinessInput.id, "bussiness_front");

      front_pic = await uploadImage(
        bussinessInput.front_pic,
        imageName.front_pic,
        "bussiness_front"
      );
      front_pic = front_pic !== null ? front_pic.path : "";
    }

    let perfil_pic = "";
    if (
      bussinessInput.perfil_pic !== null &&
      bussinessInput.perfil_pic !== "" &&
      bussinessInput.perfil_pic instanceof Blob
    ) {
      await removeImage(bussinessInput.id, "perfil_pic", "bussiness_perfil");

      console.info(
        "Perfil blob ",
        bussinessInput.perfil_pic,
        typeof bussinessInput.perfil_pic
      );
      perfil_pic = await uploadImage(
        bussinessInput.perfil_pic,
        imageName.perfil_pic,
        "bussiness_perfil"
      );
      perfil_pic = perfil_pic !== null ? perfil_pic.path : "";
    }

    let gps_location = "";
    if (
      bussinessInput.gps_location !== null &&
      bussinessInput.gps_location !== "" &&
      bussinessInput.gps_location instanceof Blob
    ) {
      await removeImage(bussinessInput.id, "bussiness_location");

      gps_location = await uploadImage(
        bussinessInput.gps_location,
        imageName.gps_location,
        "bussiness_location"
      );
      gps_location = gps_location !== null ? gps_location.path : "";
    }

    const updatedBussinessInput = {
      ...bussinessInput,
      owner: user.id,
      front_pic: front_pic,
      perfil_pic: perfil_pic,
      gps_location: gps_location,
    };

    await upsertBussiness(updatedBussinessInput);
    toast.success("Actualización exitosa");
    fetchBussiness();
  };

  useEffect(() => {
    fetchBussiness();
  });

  useEffect(() => {
    const validateForm = async () => {
      try {
        await BussinessInputSchema.validate(bussinessInput);
        setIsFormValid(true);
      } catch (error) {
        setIsFormValid(false);
        setFormError(error.message);
      }
    };
    validateForm();
  }, [bussinessInput]);

  return (
    <div>
      <Toaster
        richColors
        theme="dark"
        position="bottom-center"
        duration={3000}
      />
      <InputTitle
        value={bussinessInput}
        setValue={setBussinessInput}
      ></InputTitle>
      <ImageUploadButton
        value={bussinessInput}
        setValue={setBussinessInput}
        imageName={imageName}
        setImageName={setImageName}
      />
      <TextAreaDescription
        value={bussinessInput}
        setValue={setBussinessInput}
        maxChars={120}
      ></TextAreaDescription>
      <InputLocation
        value={bussinessInput}
        setValue={setBussinessInput}
        setImageName={setImageName}
      ></InputLocation>
      <div style={grid_2_col} className="mt-2 mb-2">
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

      <Button
        color="secondary"
        className="text-white mt-2"
        style={btnHeight}
        onClick={() => {
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
    </div>
  );
}
