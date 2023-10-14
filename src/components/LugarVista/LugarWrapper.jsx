import * as React from "react";
import { useParams } from "react-router-dom";
import Lugar from "./Lugar";

const LugarWrapper = () => {
  const { nombre,localizacion,numeroPersonas } = useParams();
  

  // Aquí puedes obtener los props adicionales que necesites para la página Lugar
  const propsAdicionales = {
    // Agrega aquí los props adicionales que quieras pasar a Lugar
  };

  return <Lugar nombre={nombre} localizacion={localizacion} numeroPersonas={numeroPersonas} {...propsAdicionales} />;
};

export default LugarWrapper;
