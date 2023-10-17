import { useParams } from "react-router-dom";
import VerEvento from "./verEvento";


const verEventoWrapper = () => {
  const { nombre,localizacion,numeroPersonas } = useParams();
  
  const propsAdicionales = {
    
  };

  return <VerEvento nombre={nombre} />;
};

export default verEventoWrapper;