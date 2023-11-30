import React, { useEffect, useRef, Suspense } from "react";
import { getAllEvents } from "../../api/events";
import Eventos from "./Eventos";
import { eventsStore } from "../../hooks/useStore";

const renderLoader = () => <p>Loading</p>;

export default function ListadoDeEventos() {
  const listContainer = useRef(null);
  const events = eventsStore((state) => state.events);
  const setEvents = eventsStore((state) => state.setEvents);

  useEffect(() => {
    const fetchEvents = async () => {
      const e = await getAllEvents();
      setEvents(e);
    };
    fetchEvents();
  }, []);

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

  return (
    <Suspense fallback={renderLoader()}>
      <div
        className="list-container"
        style={listContainerStyle}
        ref={listContainer}
      >
        {events.length > 0 &&
          events.map((evento, index) => (
            <Eventos
              key={index}
              nombre={evento.name}
              // localizacion={evento.localizacion}
              //numeroPersonas = {evento.numeroPersonas}
              imagen={evento.image}
            />
          ))}
      </div>
    </Suspense>
  );
}
