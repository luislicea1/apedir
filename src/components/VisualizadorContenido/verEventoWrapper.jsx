import React from "react";
import { useParams } from "react-router-dom";
import VerEvento from "./verEvento";
// const VerEvento = React.lazy(() => import("./verEvento"));

const verEventoWrapper = () => {
  const { nombre } = useParams();

  return <VerEvento nombre={nombre} />;
};

export default verEventoWrapper;
