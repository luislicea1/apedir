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

export { upsertEvent };
