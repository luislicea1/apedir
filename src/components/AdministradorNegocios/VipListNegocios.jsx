import React, { useEffect, useRef, useState } from "react";
import { container, section } from "../styles/styles";
import TituloDeSeccion from "../Seccion/TituloDeSeccion";
import Card from "antd/es/card/Card";
import { getAllBussinessFromUser } from "../../api/bussiness";
import NegocioIdVip from "./NegocioIdVip";
import { grid_2_col } from "../styles/styles";
import { useBussinessStore } from "../../hooks/useStore";
import supabase from "../../api/client";

export default function VipListNegocios({ userId, ...props }) {
  const setBussiness = useBussinessStore((state) => state.setBussiness);
  const agregarUnNuevoNegocio = {
    width: "100%",
    height: "100px",
    borderRadius: "10px",
    border: "2px dashed #cacaca",
    display: "grid",
    placeItems: "center",
  };

  const [render, setRender] = useState(0);
  const businesses = useRef([]);
  const fetchBusinesses = async () => {
    const data = await getAllBussinessFromUser(userId);
    businesses.current = data;
    setRender((render) => render + 1);
  };
  useEffect(() => {
    fetchBusinesses();
  }, [userId]);

  const channels = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bussiness",
        filter: `owner=eq.${userId}`,
      },
      (payload) => {
        fetchBusinesses();
      }
    )
    .subscribe();

  return (
    <>
      <div
        style={container}
        // className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
      >
        <section className="section px-6" style={section}>
          <TituloDeSeccion title={props.title}></TituloDeSeccion>
          <div style={{ ...grid_2_col, marginBottom: "40px" }}>
            {businesses.current.map((business, index) => (
              <NegocioIdVip
                key={business.id}
                id={business.id}
                imagen={business.perfil_pic}
                localizacion={business.province}
                gps_location={business.gps_location}
                nombre={business.name}
                bussiness={business}
              ></NegocioIdVip>
            ))}
          </div>

          <div
            style={{ ...agregarUnNuevoNegocio, marginBottom: "40px" }}
            onClick={() => {
              setBussiness(null);
            }}
          >
            Agregar Negocio
          </div>
        </section>
      </div>
    </>
  );
}
