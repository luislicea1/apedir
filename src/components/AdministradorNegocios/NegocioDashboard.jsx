import React, { useEffect, useState, useRef } from "react";
import { Button } from "@nextui-org/react";
import InputDeFaceBook from "./Inputs/InputDeFaceBook";
import InputDeInstagram from "./Inputs/InputDeInstagram";
import InputTelegram from "./Inputs/InputTelegram";
import InputWhatsapp from "./Inputs/InputWhatsapp";
import TextAreaDescription from "./Inputs/TextAreaDescripcion";
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
import { useUserStore, useBussinessStore } from "../../hooks/useStore";
import Loader from "../Loader/Loader";
import supabase from "../../api/client";

import InputTitle from "./Inputs/InputTitle";
import { addNotification } from "../../api/notifications";

export default function NegocioDashboard() {
  const user = useUserStore((state) => state.user);
  const business = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const [isLoading, setIsLoading] = useState(false);

  const fetchBussiness = async () => {
    try {
      if (user === null) return;

      if (business === null) {
        const b = await getOneBussiness(user.id);
        setBussiness(b);
      }
    } catch (error) {
      console.error("Error fetching business:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (business === null) fetchBussiness();
    };
  }, [user]);

  useEffect(() => {
    if (business) {
      const updatedBusiness = { ...defaultBussinessValues };
      for (let key in updatedBusiness) {
        updatedBusiness[key] =
          business[key] !== null && business[key] !== undefined
            ? business[key]
            : "";
      }
      bussinessInput.current = updatedBusiness;
    }
  }, [business]);

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
    province: "Santiago de Cuba",
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
  const bussinessInput = useRef(
    business !== null && business !== undefined
      ? business
      : defaultBussinessValues
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [formError, setFormError] = useState("");

  const handleUpsertBussiness = async () => {
    if (!isFormValid) {
      toast.error(formError);
      return;
    }
    setIsLoading(true); // Activar el loader
    let front_pic = "";
    if (
      bussinessInput.current.front_pic !== null &&
      bussinessInput.current.front_pic !== "" &&
      bussinessInput.current.front_pic instanceof Blob
    ) {
      await removeImage(bussinessInput.current.id, "bussiness_front");

      front_pic = await uploadImage(
        bussinessInput.current.front_pic,
        imageName.front_pic,
        "bussiness_front"
      );
      front_pic = front_pic !== null ? front_pic.path : "";
    }

    let perfil_pic = "";
    if (
      bussinessInput.current.perfil_pic !== null &&
      bussinessInput.current.perfil_pic !== "" &&
      bussinessInput.current.perfil_pic instanceof Blob
    ) {
      await removeImage(
        bussinessInput.current.id,
        "perfil_pic",
        "bussiness_perfil"
      );

      perfil_pic = await uploadImage(
        bussinessInput.current.perfil_pic,
        imageName.perfil_pic,
        "bussiness_perfil"
      );
      perfil_pic = perfil_pic !== null ? perfil_pic.path : "";
    }

    let gps_location = "";
    if (
      bussinessInput.current.gps_location !== null &&
      bussinessInput.current.gps_location !== "" &&
      bussinessInput.current.gps_location instanceof Blob
    ) {
      await removeImage(bussinessInput.current.id, "bussiness_location");

      gps_location = await uploadImage(
        bussinessInput.current.gps_location,
        imageName.gps_location,
        "bussiness_location"
      );
      gps_location = gps_location !== null ? gps_location.path : "";
    }

    const updatedBussinessInput = {
      ...bussinessInput.current,
      owner: user.id,
      front_pic: front_pic,
      perfil_pic: perfil_pic,
      gps_location: gps_location,
    };

    await upsertBussiness(updatedBussinessInput);

    if (business) {
      let notification = {
        message: `El negocio ${bussinessInput.current.name} se ha actualizado.`,
        bussiness: business.id,
        addressee: null,
        bussiness_link: business.value_url,
      };
      addNotification(notification);
    }

    setIsLoading(false); // Desactivar el loader

    toast.success("Actualización exitosa");
    fetchBussiness();
    // window.location.reload();
  };

  useEffect(() => {
    const validateForm = async () => {
      try {
        await BussinessInputSchema.validate(bussinessInput.current);
        setIsFormValid(true);
      } catch (error) {
        setIsFormValid(false);
        setFormError(error.message);
      }
    };
    validateForm();
  }, [bussinessInput.current]);

  return (
    <div>
      <Toaster
        richColors
        theme="dark"
        position="bottom-center"
        duration={3000}
      />
      <InputTitle value={bussinessInput}></InputTitle>
      <ImageUploadButton
        value={bussinessInput}
        imageName={imageName}
        setImageName={setImageName}
      />
      <TextAreaDescription
        value={bussinessInput}
        maxChars={120}
      ></TextAreaDescription>
      <InputLocation
        value={bussinessInput}
        setImageName={setImageName}
      ></InputLocation>
      <div style={grid_2_col} className="mt-2 mb-2">
        <InputGmail value={bussinessInput}></InputGmail>
        <InputPhoneNumber value={bussinessInput}></InputPhoneNumber>
        <InputWhatsapp value={bussinessInput}></InputWhatsapp>
        <InputTelegram value={bussinessInput}></InputTelegram>
        <InputTelefonoLocalNumber
          value={bussinessInput}
        ></InputTelefonoLocalNumber>
        <InputDeFaceBook value={bussinessInput}></InputDeFaceBook>
        <InputDeInstagram value={bussinessInput}></InputDeInstagram>
      </div>

      {isLoading && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Loader text={"Espera mientras se realiza la actualización."} />
        </div>
      )}

      <Button
        color="secondary"
        className="text-white mt-2"
        style={btnHeight}
        onClick={() => {
          bussinessInput.current = {
            ...bussinessInput.current,
            owner: user.id,
          };
          handleUpsertBussiness();
        }}
      >
        Agregar Negocio
      </Button>
    </div>
  );
}
