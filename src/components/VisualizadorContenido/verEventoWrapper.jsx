import { useParams } from "react-router-dom";
import verEvento from "./verEvento";
import Imagen from '../../assets/img/img (1).png'

const verEventoWrapper = () => {
  const { nombre,localizacion,numeroPersonas } = useParams();
  
  const propsAdicionales = {
   
  };

  return <verEvento nombre={nombre} localizacion={localizacion} numeroPersonas={numeroPersonas} {...propsAdicionales} />;
};

export default verEventoWrapper;
