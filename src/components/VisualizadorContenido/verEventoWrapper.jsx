import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
// import VerEvento from "./verEvento";
const VerEvento = React.lazy(() => import("./verEvento"));

const verEventoWrapper = () => {
  const { nombre, localizacion, numeroPersonas } = useParams();

  return (
    <React.Suspense fallback={Loader}>
      <VerEvento nombre={nombre} />
    </React.Suspense>
  );
};

export default verEventoWrapper;
