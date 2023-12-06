import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import { useBussinessStore, useUserStore } from "../../hooks/useStore";
import { getOneBussiness } from "../../api/bussiness";
import supabase from "../../api/client";
import CambioDePaquete from "./CambioDePaquete";
import VipListNegocios from "./VipListNegocios";

export default function CrearNegocio({ children }) {
  const user = useUserStore((state) => state.user);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const fetchBussiness = async () => {
    if (user === null) return;

    const b = await getOneBussiness(user.id);
    setBussiness(b);
  };

  useEffect(() => {
    if (bussiness === null) fetchBussiness();
  }, [user, bussiness]);

  const sectionStyle = {
    width: "100%",
    maxWidth: "900px",
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
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
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={sectionStyle}>
        <CambioDePaquete paquete={user?.plan}></CambioDePaquete>

<<<<<<< HEAD
        <CambioDePaquete paquete = {user?.plan}></CambioDePaquete>

        {user?.plan == "premium" ? <VipListNegocios userId = {user.id} title = {"Negocios"}></VipListNegocios>:null}
=======
        {user?.plan == "premium" ? (
          <VipListNegocios userId={user.id}></VipListNegocios>
        ) : null}
>>>>>>> 9c1d11962706c3c71680931fae7f9109b6fdd0ee

        <div>
          {bussiness !== null && bussiness !== undefined ? (
            <section
              className="flex justify-between"
              style={{ margin: "10px" }}
            >
              <Link to="/administrador-negocio/perfil">Perfil</Link>
              <Link to="/administrador-negocio/horarios">Horario</Link>
              <Link to="/administrador-negocio/eventos">Eventos</Link>
              <Link to="/administrador-negocio/productos">Productos</Link>
            </section>
          ) : (
            <section className="flex justify-between mx-8">
              <Link to="/administrador-negocio/perfil">Perfil</Link>
            </section>
          )}
        </div>
        <Card>
          <CardBody>{children}</CardBody>
        </Card>
      </div>
    </div>
  );
}
