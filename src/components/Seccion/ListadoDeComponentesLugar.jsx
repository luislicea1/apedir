import React, { useState } from "react";
import "./seccion.css";
import ComponenteLugar from "./ComponenteLugar";
import { grid_3_col } from "../styles/styles";
import { useInView } from 'react-intersection-observer';

export default function ListadoDeComponentesLugar(props) {
 const lugares = props.lugares;

 return (
   <div className="list-container" style={grid_3_col}>
     {lugares.map((lugar, index) => {
       const { ref, inView } = useInView({
         /* Opciones */
         threshold: 0,
       });

       const [isVisible, setIsVisible] = useState(false);

       React.useEffect(() => {
         if (inView) {
           setIsVisible(true);
         }
       }, [inView]);

       return (
         <div ref={ref} key={index}>
           {isVisible && (
             <ComponenteLugar
               nombre={lugar.nombre}
               localizacion={lugar.localizacion}
               numeroPersonas={lugar.numeroPersonas}
               imagen={lugar.imagen}
             />
           )}
         </div>
       );
     })}
   </div>
 );
}
