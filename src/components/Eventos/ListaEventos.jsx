import React, { useEffect, useRef } from "react";
import { getAllEvents } from "../../api/events";
import { eventsStore } from "../../hooks/useStore";
import SliderEventos from "./SliderEventos/SliderEventos";

export default function ListadoDeEventos() {
  const listContainer = useRef(null);
  const setEvents = eventsStore((state) => state.setEvents);

  useEffect(() => {
    const fetchEvents = async () => {
      const e = await getAllEvents();
      setEvents(e);
    };
    fetchEvents();
  }, [setEvents]);


  const listContainerStyle = {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    whiteSpace: "nowrap",
    gap: "20px",
  };

  return (
    <div className="list-container" style={listContainerStyle} ref={listContainer}>
      <SliderEventos />
    </div>
  );
}
