import React, { useState } from "react";
import { Button, VisuallyHidden } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { resizeImage } from "../../../api/helpers/image";
import "./input.css";

function ImageUploadButton({ imageName, setImageName, value, setValue }) {
  const [logoImage, setLogoImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleImageChange = async (event, imageType) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const extension = file.name.split(".").pop();
      const lowerCaseExtension = extension.toLowerCase();
      const newFileName = file.name.replace(extension, lowerCaseExtension);

      const resizedImage = await resizeImage(file);

      if (imageType === "logo") {
        setImageName((prevState) => {
          const updatedState = {
            ...prevState,
            perfil_pic: newFileName,
          };

          return updatedState;
        });
        setValue((prevState) => {
          const updatedState = {
            ...prevState,
            perfil_pic: resizedImage,
          };

          return updatedState;
        });
      } else if (imageType === "cover") {
        setImageName((prevState) => {
          const updatedState = {
            ...prevState,
            front_pic: newFileName,
          };

          return updatedState;
        });

        setValue((prevState) => {
          const updatedState = {
            ...prevState,
            front_pic: resizedImage,
          };
          return updatedState;
        });
      }
    }
  };

  const handleLogoImageUpload = (event) => {
    handleImageChange(event, "logo");
  };

  const handleCoverImageUpload = (event) => {
    handleImageChange(event, "cover");
  };

  const white = {
    color: "white",
  };
  const contenedor = {
    background: "#ECECEE",
    borderRadius: "10px",
    width: "100%",
    height: "200px",
    maxHeight: "200px",
    display: "grid",
    placeItems: "center",
  };

  const imagenLogo = {
    maxHeight: "200px",
  };
  const contenedorRow = {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "10px",
    padding: "20px 0",
  };

  return (
    
    <div style={contenedorRow} className="contenedor-logos-portada">
      <div>
        <div style={contenedor}>
          {value?.perfil_pic && (
            <Image
              src={value.perfil_pic}
              style={imagenLogo}
              alt="Logo subido"
            />
          )}
        </div>
        <div>
          <input
            type="file"
            id="logoImageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleLogoImageUpload}
          />
          <Button
            style={white}
            color={"secondary"}
            onClick={() => document.getElementById("logoImageUpload").click()}
            className="mt-2"
          >
            Subir Logo del Negocio
          </Button>
        </div>
      </div>
      <div>
        <div>
          <div style={contenedor}>
            {value?.front_pic && (
              <Image
                src={value.front_pic}
                style={imagenLogo}
                alt="Portada subida"
              />
            )}
          </div>
          <input
            type="file"
            id="coverImageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleCoverImageUpload}
          />
          <Button
            style={white}
            color={"secondary"}
            onClick={() => document.getElementById("coverImageUpload").click()}
            className="mt-2"
          >
            Subir Portada del Negocio
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadButton;
