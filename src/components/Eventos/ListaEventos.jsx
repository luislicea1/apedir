import React, { useEffect, useRef, lazy, Suspense } from "react";
//import Eventos from "./Eventos";

const Eventos = lazy(() => import("./Eventos"));
const renderLoader = () => <p>Loading</p>;

export default function ListadoDeEventos(props) {
  const listContainer = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      let scrollAmount = 0;
      if (e.deltaY < 0) {
        scrollAmount = Math.max(-30, e.deltaY);
      } else {
        scrollAmount = Math.min(30, e.deltaY);
      }
      listContainer.current.scrollLeft += scrollAmount;
    };

    if (listContainer.current) {
      listContainer.current.addEventListener("wheel", handleScroll, {
        passive: false,
      });
    }

    return () => {
      if (listContainer.current) {
        listContainer.current.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  const listContainerStyle = {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    whiteSpace: "nowrap",
    gap: "20px",
  };

  const eventos = props.eventos;
  return (
    <Suspense fallback={renderLoader()}>
      <div
        className="list-container"
        style={listContainerStyle}
        ref={listContainer}
      >
        {eventos.map((evento, index) => (
          <Eventos
            key={index}
            nombre={evento.nombre}
            localizacion={evento.localizacion}
            //numeroPersonas = {evento.numeroPersonas}
            imagen={evento.imagen}
          />
        ))}
      </div>
    </Suspense>
  );
}
