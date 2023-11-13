import React, { Suspense, useState } from "react";
import "./seccion.css";
import { grid_3_col } from "../styles/styles";
import { useInView } from 'react-intersection-observer';

const ComponenteLugar = React.lazy(() => import("./ComponenteLugar"));

export default function ListadoDeComponentesLugar(props) {
 const lugares = props.lugares;

 return (
  <div className="list-container" style={grid_3_col}>
    {lugares.map((lugar, index) => {
      const { ref, inView } = useInView({
        /* Opciones */
        threshold: 0,
      });

      const [isLoaded, setIsLoaded] = useState(false);

      React.useEffect(() => {
        if (inView && !isLoaded) {
          setIsLoaded(true);
        }
      }, [inView, isLoaded]);

      return (
        <div ref={ref} key={index}>
          {isLoaded && (
            <Suspense fallback={<div>Cargando...</div>}>
              <ComponenteLugar
               nombre={lugar.nombre}
               localizacion={lugar.localizacion}
               numeroPersonas={lugar.numeroPersonas}
               imagen={lugar.imagen}
              />
            </Suspense>
          )}
        </div>
      );
    })}
  </div>
 );
}
