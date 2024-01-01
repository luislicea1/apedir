import React, { useRef } from "react";
import SliderEventos from "./SliderEventos/SliderEventos";

export default function ListadoDeEventos() {
  const listContainer = useRef(null);

  const listContainerStyle = {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    whiteSpace: "nowrap",
    gap: "20px",
  };

  return (
    <div className="list-container" style={listContainerStyle} ref={listContainer}>
      <SliderEventos />
    </div>
  );
}
