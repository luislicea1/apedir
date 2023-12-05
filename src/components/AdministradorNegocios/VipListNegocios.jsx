import { container, section } from "../styles/styles";
import TituloDeSeccion from "../Seccion/TituloDeSeccion";
import React, { useEffect, useState } from 'react';
import Card from "antd/es/card/Card";
import { getAllBussinessFromUser } from "../../api/bussiness";
import NegocioIdVip from "./NegocioIdVip";
import { grid_2_col } from "../styles/styles";

export default function VipListNegocios(props) {
    const agregarUnNuevoNegocio = {
        width: "100%",
        height: "100px",
        borderRadius: "10px", 
        border: "2px dashed #cacaca",
        display: "grid",
        placeItems: "center",
    }
    const [businesses, setBusinesses] = useState([]);
    useEffect(() => {
        const fetchBusinesses = async () => {
          const data = await getAllBussinessFromUser(props.userId);
          setBusinesses(data);
        };
       
        fetchBusinesses();
       }, [props.userId]);
       

  return (
    <>
      <div
        style={container}
        className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
      >
        <section className="section px-6" style={section}>
          <TituloDeSeccion title={props.title}></TituloDeSeccion>
          <div style={{...grid_2_col, marginBottom: "40px"}}>
            {businesses.map((business, index) => (
                

                <NegocioIdVip
                id={business.id}
                imagen={business.perfil_pic}
                localizacion={business.province}
                gps_location={business.gps_location}
                nombre={business.name}
                //numeroPersonas={business.numeroPersonas}
            // url={business.value_url}
            ></NegocioIdVip>
            ))}
          </div>

          


          <div style= {{...agregarUnNuevoNegocio, marginBottom: "40px"}}>
                Agregar Negocio
          </div>
          
        </section>
      </div>
    </>
  );
}
