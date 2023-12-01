import React, { useState, useEffect } from "react";

import { Tab, Tabs, Card, CardBody } from "@nextui-org/react";
import { getEventsfromBussiness } from "../../api/events";
import {
  merchantEvents,
  useBussinessStore,
  useUserStore,
} from "../../hooks/useStore";
import { getOneBussiness } from "../../api/bussiness";

import EventCard from "./EventCard";
import supabase from "../../api/client";

export default function EventManagement() {
  const user = useUserStore((state) => state.user);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const fetchBussiness = async () => {
    if (user === null) return;
    const b = await getOneBussiness(user.id);
    setBussiness(b);
  };

  useEffect(() => {
    if (bussiness === null) fetchBussiness();
  }, [user, bussiness]);

  // const [events, setEvents] = useState([]);
  const events = merchantEvents((state) => state.events);
  const setEvents = merchantEvents((state) => state.setEvents);

  const fetchEvents = async () => {
    if (bussiness === null) return;
    const eventList = await getEventsfromBussiness(bussiness.id);

    setEvents(eventList !== null ? eventList : []);
  };

  useEffect(() => {
    if (events.length === 0) fetchEvents();
  }, [bussiness]);

  // const channels = supabase
  //   .channel("custom-delete-channel")
  //   .on(
  //     "postgres_changes",
  //     { event: "*", schema: "public", table: "events" },
  //     (payload) => {
  //       fetchEvents();
  //     }
  //   )
  //   .subscribe();

  return (
    <Tabs aria-label="seleccion de eventos" fullWidth>
      <Tab key="create" title="Crear Evento">
        {bussiness?.id && <EventCard bussinessId={bussiness.id} />}
      </Tab>
      {events.map((item) => (
        <Tab key={item.id} title={item.name}>
          <EventCard bussinessId={bussiness.id} event={item} />
        </Tab>
      ))}
    </Tabs>
  );
}
