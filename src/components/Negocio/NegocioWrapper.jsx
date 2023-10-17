import { useParams } from "react-router-dom";
import Negocio from "./Negocio";
import Imagen from '../../assets/img/img (1).png'

const NegocioWrapper = () => {
  const { nombre,localizacion,numeroPersonas } = useParams();
  

  // Aquí puedes obtener los props adicionales que necesites para la página Lugar
  const propsAdicionales = {
    // Agrega aquí los props adicionales que quieras pasar a Lugar
  };

  return <Negocio nombre={nombre} localizacion={localizacion} numeroPersonas={numeroPersonas} {...propsAdicionales} />;
};

export default NegocioWrapper;
