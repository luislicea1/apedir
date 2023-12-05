import React, { useEffect } from "react";

import { Tab, Tabs } from "@nextui-org/react";
import { getEventsfromBussiness } from "../../api/events";
import {
  merchantEvents,
  useBussinessStore,
  useUserStore,
} from "../../hooks/useStore";
import { getOneBussiness } from "../../api/bussiness";

import EventCard from "./EventCard";

export default function EventManagement() {
  const user = useUserStore((state) => state.user);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const fetchBussiness = async () => {
    if (user === null) return;
    const b = await getOneBussiness(user.id);
    setBussiness(b);
  };

  useEffect(
    () => {
      return () => {
        if (bussiness === null) fetchBussiness();
      };
    },
    [
      // user, bussiness
    ]
  );

  // const [events, setEvents] = useState([]);
  const events = merchantEvents((state) => state.events);
  const setEvents = merchantEvents((state) => state.setEvents);

  const fetchEvents = async () => {
    let b = bussiness;
    if (bussiness === null) {
      b = await getOneBussiness(user.id);
    }
    const eventList = await getEventsfromBussiness(b.id);

    setEvents(eventList !== null ? eventList : []);
  };

  useEffect(() => {
    return () => {
      if (events.length === 0) fetchEvents();
    };
  }, []);

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
