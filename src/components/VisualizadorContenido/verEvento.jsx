import HeaderNegocio from "../Negocio/HeaderNegocio/HeaderNegocio";
import Imagen from "../../assets/fondo/restaurant.jpg";
import LogoImg from "../../assets/img/img (1).png";
import EventoCard from "./EventoCard";
import BotonesEventos from "./BotonesEventos";
import DescripcionEvento from "./DescripcionDeEvento";

export default function VerEvento({nombre}){

    const text =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto reprehenderit vel! Recusandae distinctio laboriosam optio, quam at vero iure! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto repr";

    const sectionStyle = {
        width: "100%",
        maxWidth: "735px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px"
      };

    return(
        <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
            <section style={sectionStyle}>
                <HeaderNegocio logo={LogoImg} nombre={nombre} horario = {"no"} anterior = {"/"}></HeaderNegocio>
                <EventoCard></EventoCard>
                <DescripcionEvento descripcion = {text}></DescripcionEvento>
                <BotonesEventos></BotonesEventos>
            </section>
            
           
        </div>
    );
}

