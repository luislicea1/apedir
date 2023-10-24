import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import './input.css'

function ImageUploadButton(props) {
  const [logoImage, setLogoImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleLogoImageUpload = (event) => {
    setLogoImage(event.target.files[0]);
  };

  const handleCoverImageUpload = (event) => {
    setCoverImage(event.target.files[0]);
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
          {logoImage && (
            <Image
              src={URL.createObjectURL(logoImage)}
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
            {coverImage && (
              <Image
                src={URL.createObjectURL(coverImage)}
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
