import React from 'react'
import VisualizarProducto from "./VisualizarProducto";
import { useParams } from "react-router-dom";

const VisualizarProductoWrapper = () => {
  const { nombre, localizacion, numeroPersonas , title} = useParams();

  return <VisualizarProducto nombre={nombre} title = {title}/>;
};

export default VisualizarProductoWrapper;
 