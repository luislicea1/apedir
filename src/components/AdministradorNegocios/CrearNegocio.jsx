import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import { useBussinessStore } from "../../hooks/useStore";

export default function CrearNegocio({ children }) {
  const bussiness = useBussinessStore((state) => state.bussiness);
  const sectionStyle = {
    width: "100%",
    maxWidth: "900px",
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
            {bussiness !== null && bussiness !== undefined && (
              <section style={{display: "flex", }}>
                <Link to="/administrador-negocio/horarios" style={linkColor}>
                  Horario
                </Link>
                <Link to="/administrador-negocio/eventos" style={linkColor}>
                  Eventos
                </Link>
                <Link to="/administrador-negocio/productos" style={linkColor}>
                  Productos
                </Link>
              </section>
            )}
          </div>
          <Card>
            <CardBody>{children}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
