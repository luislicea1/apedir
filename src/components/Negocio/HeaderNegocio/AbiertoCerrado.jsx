import React, { useState, useEffect } from "react";

export default function AbiertoCerrado(props) {
 const [estaAbierto, setEstaAbierto] = useState(false);
 const green = {
   color: "green",
 };

 const red = {
   color: "red",
 };

 const horario = props.horario
 console.log(horario)

 useEffect(() => {
   const actualizarEstatus = () => {
    if (!horario) {
      setEstaAbierto(false);
      return;
    }
     const dia = new Date().getDay();
     const horaActual = new Date();
     const diaSemana = [
       "domingo",
       "lunes",
       "martes",
       "miercoles",
       "jueves",
       "viernes",
       "sabado",
     ][dia];
     const horarioDia = horario.find(h => h.dia.toLowerCase() === diaSemana);

     if (!horarioDia) {
       setEstaAbierto(false);
       return;
     }

     const [horaApertura, horaCierre] = [horarioDia.entrada, horarioDia.salida];

     const horaAperturaObj = new Date();
     horaAperturaObj.setHours(
       parseInt(horaApertura.split(":")[0]),
       parseInt(horaApertura.split(":")[1])
     );
     const horaCierreObj = new Date();
     horaCierreObj.setHours(
       parseInt(horaCierre.split(":")[0]),
       parseInt(horaCierre.split(":")[1])
     );

     if (horaActual >= horaAperturaObj && horaActual <= horaCierreObj) {
       setEstaAbierto(true);
     } else {
       setEstaAbierto(false);
     }
   };

   actualizarEstatus();
   const intervalo = setInterval(actualizarEstatus, 60000);

   return () => clearInterval(intervalo);
 }, [horario]);

 return (
   <div>
     {estaAbierto ? (
       <h2 style={green}>Abierto</h2>
     ) : (
       <h2 style={red}>Cerrado</h2>
     )}
   </div>
 );
}
