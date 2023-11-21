import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Chip } from "@nextui-org/react";

export default function CrearNegocio({ children }) {
  const sectionStyle = {
    width: "100%",
    maxWidth: "1000px",
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
  };

  const linkColor = {
    margin: "10px 20px",
    
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
              margin: "0px 20px",
            }}
          >
            <Link to="/administrador-negocio/perfil" style={linkColor}>
              Perfil
            </Link>
            <Link to="/administrador-negocio/horarios" style={linkColor}>
              Horario
            </Link>
            <Link to="/administrador-negocio/eventos" style={linkColor}>
              Eventos
            </Link>
            <Link to="/administrador-negocio/productos" style={linkColor}>
              Productos
            </Link>
          </div>
          <Card>
            <CardBody>{children}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
