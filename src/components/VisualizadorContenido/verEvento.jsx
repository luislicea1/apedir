import React from "react";
//import HeaderNegocio from "../Negocio/HeaderNegocio/HeaderNegocio";
import Imagen from "../../assets/fondo/restaurant.webp";
import LogoImg from "../../assets/img/img (1).webp";
import ImgEvento from "../../assets/img/img (1).jpg";
//import EventoCard from "./EventoCard";
//import BotonesEventos from "./BotonesEventos";
//import DescripcionEvento from "./DescripcionDeEvento";
//import HorarioEvento from "./HorarioEvento";
//import TituloEvento from "./TituloEvento";
//import Mapa from "./Mapa";

const HeaderNegocio = lazy(() =>
  import("../Negocio/HeaderNegocio/HeaderNegocio")
);
const EventoCard = lazy(() => import("./EventoCard"));
const BotonesEventos = lazy(() => import("./BotonesEventos"));
const DescripcionEvento = lazy(() => import("./DescripcionDeEvento"));
const HorarioEvento = lazy(() => import("./HorarioEvento"));
const TituloEvento = lazy(() => import("./TituloEvento"));
const Mapa = lazy(() => import("./Mapa"));

export default function VerEvento({ nombre }) {
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
  };

  const overflow = {
    marginTop: "20px",
    zIndex: "50",
    overflowY: "scroll",
  };

  return (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <div style={sectionStyle2}>
        <section style={sectionStyle}>
          <Suspense>
            <HeaderNegocio
              logo={LogoImg}
              nombre={nombre}
              horario={"no"}
              anterior={"/"}
            ></HeaderNegocio>
          </Suspense>

          <section style={{}}>
            <Suspense>
              <EventoCard evento={ImgEvento}></EventoCard>
            </Suspense>

            <div style={sectionDescription}>
              <Suspense>
                <TituloEvento title="Tomorrowland"></TituloEvento>
                <HorarioEvento></HorarioEvento>
              </Suspense>

              <div style={overflow}>
                <Suspense>
                  <DescripcionEvento descripcion={text}></DescripcionEvento>
                  <Mapa></Mapa>
                </Suspense>
              </div>
              <Suspense>
                <BotonesEventos></BotonesEventos>
              </Suspense>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
