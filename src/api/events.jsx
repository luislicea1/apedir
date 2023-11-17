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

  console.log(error);
  const eventsWithImages = await Promise.all(
    data.map(async (event) => {
      const image = await getImage("bussiness_event", event.image);
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

export { upsertEvent, getEventsfromBussiness, deleteEvent };
