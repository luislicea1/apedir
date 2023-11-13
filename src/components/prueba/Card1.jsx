import React from 'react';
import { useInView } from 'react-intersection-observer';

const Prueba = () => {
 const { ref, inView, entry } = useInView({
   /* Opciones */
   threshold: 0,
 });

 React.useEffect(() => {
   if (inView) {
     console.log('El elemento está en el viewport');
   } else {
     console.log('El elemento está fuera del viewport');
   }
 }, [inView]);

 return (
   <div ref={ref}>
     <h2>{`Header inside viewport ${inView}.`}</h2>
   </div>
 );
};

export default Prueba;
