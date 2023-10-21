import { useParams } from "react-router-dom";
import NegocioGratuito from "./NegocioGratuito";

const NegocioGratuitoWrapper = () => {
  const { nombre,localizacion,numeroPersonas } = useParams();
  

  
  const propsAdicionales = {
    
  };

  return <NegocioGratuito nombre={nombre} localizacion={localizacion} numeroPersonas={numeroPersonas} {...propsAdicionales} />;
};

export default NegocioGratuitoWrapper;
