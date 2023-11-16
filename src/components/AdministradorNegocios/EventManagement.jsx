import React, { useState, useEffect } from "react";

import { Tab, Tabs, Card, CardBody } from "@nextui-org/react";
import { getEventsfromBussiness } from "../../api/events";

import EventCard from "./EventCard";

export default function EventManagement({ bussinessId }) {
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
        {events.length > 0 && (
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
        )}
      </Card>
    </div>
  );
}
