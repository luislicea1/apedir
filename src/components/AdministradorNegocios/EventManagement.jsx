import React, { useState, useEffect } from "react";

import { Tab, Tabs, Card, CardBody } from "@nextui-org/react";
import { getEventsfromBussiness } from "../../api/events";

import EventCard from "./EventCard";




export default function EventManagement({ bussinessId }) {

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     if (bussinessId === null) return;
  //     const categorylist = await getCategories(bussiness.id);
  //     setCategories(categorylist !== null ? categorylist : []);
  //   };

  //   let categorySubscription = null;

  //   const timer = setTimeout(
  //     () => (categorySubscription = subscribeToCategories()),
  //     1000
  //   );

  //   const subscribeToCategories = () => {
  //     return supabase
  //       .channel("category-channel")
  //       .on(
  //         "postgres_changes",
  //         { event: "*", schema: "public", table: "categories" },
  //         () => {
  //           fetchCategories();
  //         }
  //       )
  //       .subscribe();
  //   };

  //   fetchCategories();

  //   return () => {
  //     if (categorySubscription) categorySubscription.unsubscribe();
  //     clearTimeout(timer);
  //   };
  // }, []);



  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvent = async () => {
      const events = await getEventsfromBussiness(bussinessId);
      setEvents(events);
    };
    if (bussinessId !== null) fetchEvent();
  }, [bussinessId]);

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
