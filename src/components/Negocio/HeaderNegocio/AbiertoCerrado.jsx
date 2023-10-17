import { useState, useEffect } from "react";
import { horarios } from "../../Lugares/Horarios.jsx";

export default function AbiertoCerrado(){
    const [estaAbierto, setEstaAbierto] = useState(false);
    const green = {
        color: "green"
    }

    const red = {
        color: "red"
    }

    useEffect(() => {
      const actualizarEstatus = () => {
        const dia = new Date().getDay();
        const hora = new Date().getHours() + ":" + new Date().getMinutes();
        const diaSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"][dia];
        const [horaApertura, horaCierre] = horarios[diaSemana];
        
        if (horaApertura === "cerrado" || horaCierre === "cerrado") {
          setEstaAbierto(false);
        } else if (hora >= horaApertura && hora <= horaCierre) {
          setEstaAbierto(true);
        } else {
          setEstaAbierto(false);
        }
      };
      
      actualizarEstatus();
      const intervalo = setInterval(actualizarEstatus, 60000);
      
      return () => clearInterval(intervalo);
    }, []);
    return (
        <div>
          <h2>{estaAbierto ? <h2 style={green}>Abierto</h2> : <h2 style={red}>Cerrado</h2>}</h2>
        </div>
      );
      
}