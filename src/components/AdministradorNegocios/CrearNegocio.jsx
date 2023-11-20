import React from "react";
import { Link } from "react-router-dom";
import {Card, CardBody, Chip } from "@nextui-org/react";

export default function CrearNegocio({ children }) {
  const sectionStyle = {
    width: "100%",
    maxWidth: "1000px",
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={sectionStyle}>
        <div className="flex flex-col">
          {/* <br /> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 30px",
            }}
          >
            <Link to="/administrador-negocio/perfil">Perfil</Link>
            <Link to="/administrador-negocio/horarios">Horario</Link>
            <Link to="/administrador-negocio/eventos">Eventos</Link>
            <Link to="/administrador-negocio/productos">Productos</Link>
          </div>
          <Card>
            <CardBody>{children}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
