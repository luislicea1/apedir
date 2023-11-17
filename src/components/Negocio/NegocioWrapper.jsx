import React from 'react'
import { useParams } from "react-router-dom";
import Negocio from "./Negocio";

const NegocioWrapper = () => {
  const { url} = useParams();
  

  
  const propsAdicionales = {
    
  };

  return <Negocio url={url} />;
};

export default NegocioWrapper;
