import VisualizarProducto from "./VisualizarProducto";
import { useParams } from "react-router-dom";

const VisualizarProductoWrapper = () => {
  const { nombre, localizacion, numeroPersonas } = useParams();

  return <VisualizarProducto nombre={nombre} />;
};

export default VisualizarProductoWrapper;
