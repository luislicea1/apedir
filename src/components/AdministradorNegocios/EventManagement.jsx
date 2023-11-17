import React, { useState, useEffect } from "react";

import { Tab, Tabs, Card, CardBody } from "@nextui-org/react";
import { getEventsfromBussiness } from "../../api/events";

import EventCard from "./EventCard";

export default function EventManagement({ bussinessId }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (bussinessId === null) return;
      const eventList = await getEventsfromBussiness(bussinessId);
      setEvents(eventList !== null ? eventList : []);
    };

    let eventSubscription = null;

    const timer = setTimeout(
      () => (eventSubscription = subscribeToEvents()),
      1000
    );

    const subscribeToEvents = () => {
      return supabase
        .channel("event-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "events" },
          () => {
            fetchEvents();
          }
        )
        .subscribe();
    };

    fetchEvents();

    return () => {
      if (eventSubscription) eventSubscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [events]);

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     const events = await getEventsfromBussiness(bussinessId);
  //     setEvents(events);
  //   };
  //   if (bussinessId !== null) fetchEvent();
  // }, [bussinessId]);

  return (
    <div>
      <Card>
        <Tabs aria-label="seleccion de eventos" fullWidth>
          <Tab key="create" title="Crear Evento">
            <EventCard bussinessId={bussinessId} />
          </Tab>
          {events.map((item) => (
            <Tab key={item.id} title={item.name}>
              <EventCard event={item} />
            </Tab>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
