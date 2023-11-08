import React, { useState, useEffect } from "react";
import { horarios } from "../../Lugares/Horarios.jsx";

export default function AbiertoCerrado() {
  const [estaAbierto, setEstaAbierto] = useState(false);
  const green = {
    color: "green",
  };

  const red = {
    color: "red",
  };

  useEffect(() => {
    const actualizarEstatus = () => {
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
      const [horaApertura, horaCierre] = horarios[diaSemana];

      if (horaApertura === "cerrado" || horaCierre === "cerrado") {
        setEstaAbierto(false);
      } else {
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
      }
    };

    actualizarEstatus();
    const intervalo = setInterval(actualizarEstatus, 60000);

    return () => clearInterval(intervalo);
  }, []);
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
