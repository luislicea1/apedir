import React from "react";
import { Divider } from "@nextui-org/react";

export default function Horario(props) {
  const bussiness = props.bussiness;
  return (
    <>
      {bussiness !== null && bussiness.schedules !== null && (
        <div style={{ display: "grid", placeItems: "center" }}>
          <strong style={{ fontSize: "20px", margin: "10px" }}>Horarios</strong>
          <Divider></Divider>
        </div>
      )}
      {bussiness !== null &&
        bussiness.schedules !== null &&
        bussiness.schedules.map((schedule) => {
          let dia = <h6>{schedule.dia}</h6>;
          if (!schedule.trabaja) {
            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                    margin: "10px",
                  }}
                >
                  {dia}
                  <span>No se trabaja</span>
                </div>
                <Divider></Divider>
              </div>
            );
          }

          let entrada = schedule.entrada ? (
            <span>Horario apertura: {schedule.entrada}</span>
          ) : (
            <span>-</span>
          );
          let salida = schedule.salida ? (
            <span>Horario cierre: {schedule.salida}</span>
          ) : (
            <span>-</span>
          );

          return (
            <div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                  margin: "10px",
                }}
              >
                {dia}: {entrada} {salida}
              </div>
              <Divider></Divider>
            </div>
          );
        })}
    </>
  );
}
