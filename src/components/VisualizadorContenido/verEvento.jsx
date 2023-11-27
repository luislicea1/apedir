import React, { lazy, Suspense } from "react";
import LogoImg from "../../assets/img/img (1).webp";
import { getEventByName } from "../../api/events";
import HeaderNegocio from "../Negocio/HeaderNegocio/HeaderNegocio";
import EventoCard from "./EventoCard";
import BotonesEventos from "./BotonesEventos";
import DescripcionEvento from "./DescripcionDeEvento";
import HorarioEvento from "./HorarioEvento";
import TituloEvento from "./TituloEvento";

// const HeaderNegocio = lazy(() =>
//   import("../Negocio/HeaderNegocio/HeaderNegocio")
// );
// const EventoCard = lazy(() => import("./EventoCard"));
// const BotonesEventos = lazy(() => import("./BotonesEventos"));
// const DescripcionEvento = lazy(() => import("./DescripcionDeEvento"));
// const HorarioEvento = lazy(() => import("./HorarioEvento"));
// const TituloEvento = lazy(() => import("./TituloEvento"));
//const Mapa = lazy(() => import("./Mapa"));

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
    marginTop: "20px",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    //justifyContent: "center",
    height: "45vh",
  };

  const overflow = {
    marginTop: "20px",
    zIndex: "50",
    overflowY: "scroll",
  };

  const [event, setEvent] = React.useState(null);

  React.useEffect(() => {
    const fetchEvent = async () => {
      const e = await getEventByName(nombre);
      setEvent(e);
    };
    fetchEvent();
  }, []);

  return event !== null ? (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <div style={sectionStyle2}>
        <section style={sectionStyle}>
          <HeaderNegocio
            logo={LogoImg}
            nombre={nombre}
            horario={"no"}
            anterior={"/"}
            event={nombre}
          ></HeaderNegocio>

          <section>
            <EventoCard image={event.image} />

            <div style={sectionDescription}>
              <TituloEvento title={event.name}></TituloEvento>
              <HorarioEvento></HorarioEvento>

              <div style={overflow}>
                <DescripcionEvento
                  descripcion={event.description}
                ></DescripcionEvento>
              </div>
              <p className="text-white">Teléfono: {event.phone_number}</p>
              <BotonesEventos></BotonesEventos>
            </div>
          </section>
        </section>
      </div>
    </div>
  ) : null;
}
