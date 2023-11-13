import React,{lazy, Suspense} from 'react'
import Imagen2 from "../../assets/comidas/comida (3).webp";
import Imagen3 from "../../assets/comidas/comida (4).webp";
//import ListadoCompras from "./ListadoCompras";
//import InputsPedido from "./InputsPedido";
import { grid_1_col } from "../styles/styles";

const ListadoCompras = lazy(()=>import ("./ListadoCompras"))
const InputsPedido = lazy(()=>import ("./InputsPedido"))
const renderLoader = () => <p>Loading</p>;

const carrito = [
  {
    title: "Brochetas",
    img: Imagen3,
    cantidad: 1,
    price: 5,
  },
  {
    title: "Carne",
    img: Imagen2,
    cantidad: 3,
    price: 10,
  },
];
export default function ComprasSection() {
  
  return (
    
    <div style={grid_1_col}>
      <Suspense fallback={renderLoader()}>
        <ListadoCompras lista={carrito}></ListadoCompras>
        <InputsPedido></InputsPedido>
      </Suspense>
    </div>
  );
}
