import React,{lazy, Suspense} from 'react'
//import ListadoCompras from "./ListadoCompras";
//import InputsPedido from "./InputsPedido";
import { grid_1_col } from "../styles/styles";
import { useCartStore } from '../../hooks/useStore';

const ListadoCompras = lazy(()=>import ("./ListadoCompras"))
const InputsPedido = lazy(()=>import ("./InputsPedido"))
const renderLoader = () => <p>Loading</p>;


export default function ComprasSection() {
  const carrito = useCartStore((state) => state.cart);
  const setCarrito = useCartStore((state) => state.setCart);
 
  console.log(carrito)
  
  return (
    
    <div style={grid_1_col}>
      <Suspense fallback={renderLoader()}>
        {/* <ListadoCompras lista={carrito}></ListadoCompras> */}
        <div>Compras</div>
        {carrito.map((product, index) => (
             <div key={index}>
              
               <div style={{}}>
                <img src={product.image} alt={product.title} width="50px" />
                <span><p style={{maxWidth: "10ch", overflow: "hidden", textOverflow: "ellipsis"}}>{product.title}</p></span>
                <span>{product.quantity}</span>
                <span>$ {product.price}</span>
               </div>
               
             
             </div>
           ))}

        <InputsPedido></InputsPedido>
      </Suspense>
    </div>
  );
}
