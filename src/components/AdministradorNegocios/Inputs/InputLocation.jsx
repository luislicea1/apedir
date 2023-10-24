import React from "react";
import { Input, Button, Image } from "@nextui-org/react";
import SelectorProvincia from "./SelectorDeProvincia";
import { useState } from "react";

export default function InputLocation() {
  const [localizacionImage, setLocalizacionImage] = useState(null);

  const handlelocalizacionImageUpload = (event) => {
    setLocalizacionImage(event.target.files[0]);
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

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "20px",
  };

  return (
    <div style={grid}>
      <Input
        type="text"
        variant="bordered"
        label="Localización"
        placeholder="Inserte la localización de su negocio"
        labelPlacement="outside"
      />
      <div />
      <SelectorProvincia></SelectorProvincia>
      <div />
      <div>
        <div>
          <div style={contenedor}>
            {localizacionImage && (
              <Image
                src={URL.createObjectURL(localizacionImage)}
                style={imagenLogo}
                alt="Logo subido"
              />
            )}
          </div>
          <input
            type="file"
            id="localizacionImageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlelocalizacionImageUpload}
          />
          <Button
            style={white}
            color={"secondary"}
            onClick={() =>
              document.getElementById("localizacionImageUpload").click()
            }
            className="mt-2"
          >
            Subir Localización del Negocio
          </Button>
        </div>
      </div>
    </div>
  );
}
