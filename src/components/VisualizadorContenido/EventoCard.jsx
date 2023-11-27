import React from "react";
import { Image } from "@nextui-org/react";
import "./evento.css";
import Like from "../Like/Like";
import ImgEvento from "../../assets/img/img (2).webp";

export default function EventoCard({ image }) {
  const img = {
    maxHeight: "70vh",
    height: "44vh",
    //width: "100%",
    width: "450px",
    borderRadius: "0px",
    objectFit: "fill",
    zIndex: "50",
  };

  const center = {
    width: "100%",
    height: "70vh",
    maxHeight: "70vh",
    display: "grid",
    placeItems: "start",
    position: "relative",
    justifyContent: "center",
    //background: "red"
    zIndex: "50",
  };
  const like = {
    zIndex: "50",
    position: "absolute",
    right: "15px",
    bottom: "40%",
  };

  return (
    <div style={center}>
      <Image
        style={img}
        src={image}
        alt="NextUI Album Cover Image with delay"
        classNames="m-5"
      />
      {/* <div  className="bgtransparent"></div> */}
      <div style={like}>
        <Like></Like>
      </div>
    </div>
  );
}
