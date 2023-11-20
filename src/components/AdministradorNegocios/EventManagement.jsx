import React, { useState, useEffect } from "react";

import { Tab, Tabs, Card, CardBody } from "@nextui-org/react";
import { getEventsfromBussiness } from "../../api/events";
import { useBussinessStore, useUserStore } from "../../hooks/useStore";
import { getOneBussiness } from "../../api/bussiness";

import EventCard from "./EventCard";
import supabase from "../../api/client";

export default function EventManagement() {
  const user = useUserStore((state) => state.user);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const fetchBussiness = async () => {
    if (user === null ) return;
    const b = await getOneBussiness(user.id);
    setBussiness(b);
  };

  useEffect(() => {
    if (bussiness === null) fetchBussiness();
  }, [user, bussiness]);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (bussiness === null) return;
      const eventList = await getEventsfromBussiness(bussiness.id);
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

  return (
    <div>
      <Card>
        <Tabs aria-label="seleccion de eventos" fullWidth>
          <Tab key="create" title="Crear Evento">
            <EventCard bussinessId={bussiness.id} />
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
