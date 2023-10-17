import { useParams } from "react-router-dom";
import Negocio from "./Negocio";

const NegocioWrapper = () => {
  const { nombre,localizacion,numeroPersonas } = useParams();
  

  
  const propsAdicionales = {
    
  };

  return <Negocio nombre={nombre} localizacion={localizacion} numeroPersonas={numeroPersonas} {...propsAdicionales} />;
};

export default NegocioWrapper;
