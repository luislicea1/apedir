import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import { useBussinessStore, useUserStore } from "../../hooks/useStore";
import { getOneBussiness } from "../../api/bussiness";
import supabase from "../../api/client";

export default function CrearNegocio({ children }) {
  const user = useUserStore((state) => state.user);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const sectionStyle = {
    width: "100%",
    maxWidth: "900px",
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
  };

  const linkColor = {
    margin: "10px 20px",
  };

  const channels = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "bussiness" },
      async (payload) => {
        try {
          if (user === null) return;
          const b = await getOneBussiness(user.id);
          setBussiness(b);
        } catch (error) {
          console.error("Error fetching business:", error);
        }
      }
    )
    .subscribe();

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
              <section style={{ display: "flex" }}>
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
