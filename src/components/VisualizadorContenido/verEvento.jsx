import React from 'react'
import HeaderNegocio from "../Negocio/HeaderNegocio/HeaderNegocio";
import Imagen from "../../assets/fondo/restaurant.jpg";
import LogoImg from "../../assets/img/img (1).png";
import ImgEvento from "../../assets/img/img (1).jpg";
import EventoCard from "./EventoCard";
import BotonesEventos from "./BotonesEventos";
import DescripcionEvento from "./DescripcionDeEvento";
import HorarioEvento from "./HorarioEvento";
import TituloEvento from "./TituloEvento";
import Mapa from "./Mapa";

export default function VerEvento({nombre}){

    const text =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto reprehenderit vel! Recusandae distinctio laboriosam optio, quam at vero iure! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto repr";

        const sectionStyle2 = {
  
            width: "100%",
            maxWidth: "450px",
           
            height: "100vh",
            
            background: "#202632",
           
          };
        const sectionStyle = {
  
            width: "100%",
            maxWidth: "450px",
            display: "flex",
            height: "calc(100vh - 64px)",
            flexDirection: "column",
            background: "#202632",
            position: "relative",
          };
          
          const sectionDescription = {
            width: "100%",
            padding: "20px",
            position: "absolute",
            bottom: "0",
            display: "flex",
            flexDirection: "column",
            //justifyContent: "center",
            height: "55vh",
            
            
            
          }

          const overflow ={
            marginTop: "20px",
            zIndex: "50",
            overflowY: "scroll"
          }

    return(
        <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
            <div style={sectionStyle2}>
            <section style={sectionStyle}>
                <HeaderNegocio logo={LogoImg} nombre={nombre} horario = {"no"} anterior = {"/"}></HeaderNegocio>
                <section style={{}}>
                    <EventoCard evento = {ImgEvento}></EventoCard> 
                     <div style={sectionDescription}>
                        <TituloEvento title="Tomorrowland"></TituloEvento>
                        <HorarioEvento></HorarioEvento>
                        
                        <div style={overflow}>
                            <DescripcionEvento descripcion = {text}></DescripcionEvento>
                            <Mapa></Mapa>
                        </div>
                        
                        <BotonesEventos></BotonesEventos>
                    </div> 
                  
                </section>
                
            </section>
            </div>
           
            
           
        </div>
    );
}

