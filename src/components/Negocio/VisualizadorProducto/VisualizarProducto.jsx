import HeaderNegocio from "../HeaderNegocio/HeaderNegocio";
import LogoImg from "../../../assets/img/img (1).png";
import { useState, useEffect } from "react";
import Imagen from "../../../assets/img/img (2).png";
//import Imagen from "../../../assets/comidas/comida (3).png";
import ImagenVisualizador from "./ImagenVisualizador";
import "./visualizarProducto.css"
import DescripcionDeP from "./DescripcionDeP";
import PromoProducto from "./PromoProducto";
import OrdenarProducto from "./OrdenarProducto"

const sectionStyle = {
  width: "100%",
  maxWidth: "450px",
  display: "flex",
  height: "100vh",
  flexDirection: "column",
  background: "linear-gradient(#0B1D1D,#0F0D13)",
  position: "relative",
};

const sectionDescription = {
  width: "100%",
  padding: "20px",
  position: "absolute",
  bottom: "0",
  display: "flex",
  justifyContent: "center",
  
}

const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto reprehenderit vel! Recusandae distinctio laboriosam optio, quam at vero iuret.";


export default function VisualizarProducto({ nombre , title}) {
  
  const top = {
    top: "300px",
    background: "red"
  }

  return (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <section style={sectionStyle}>
        <HeaderNegocio logo={LogoImg} nombre={nombre} horario = {"si"}></HeaderNegocio>
        
        <section  >
          <ImagenVisualizador image = {Imagen}></ImagenVisualizador>
          <div style = {sectionDescription}>
          <DescripcionDeP title={title} text = {text}></DescripcionDeP>
          <PromoProducto title={title}></PromoProducto>
          <OrdenarProducto></OrdenarProducto>
          </div>
         
        </section>
      </section>
    </div>
    );
}
