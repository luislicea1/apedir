import { getImage } from "./bussiness";
import supabase from "./client";

const upsertEvent = async (event) => {
  let eventToInsert = Object.keys(event).reduce((acc, key) => {
    if (event[key] !== null && event[key] !== "") {
      acc[key] = event[key];
    }
    return acc;
  }, {});
  if (event.id !== "") {
    const { data, error } = await supabase.from("events").upsert(eventToInsert);
    console.log(error);
    return;
  }

  const { data, error } = await supabase.from("events").insert(eventToInsert);
  console.log({ error });
};

const getEventsfromBussiness = async (bussinessId) => {
  let { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("bussiness", bussinessId);

  const eventsWithImages = await Promise.all(
    data.map(async (event) => {
      const image = await getImage("events", event.image);
      return {
        ...event,
        image,
      };
    })
  );

  return eventsWithImages;
};

const deleteEvent = async (eventId) => {
  console.log(eventId);
  await supabase.from("events").delete().eq("id", eventId);
};

const getAllEvents = async () => {
  const { data: events, err } = await supabase.from("events").select("*");

  const eventsWithImages = await Promise.all(
    events.map(async (event) => {
      const image = await getImage("events", event.image);
      return {
        ...event,
        image,
      };
    })
  );
  console.log(eventsWithImages);
  return eventsWithImages;
};

export { upsertEvent, getEventsfromBussiness, deleteEvent, getAllEvents };
