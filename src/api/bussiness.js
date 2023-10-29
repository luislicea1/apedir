import supabase from "./client";

const upsertBussiness = async (bussiness) => {
  const { data, error } = await supabase.from("bussiness").upsert(bussiness);
  console.log({ data });
  console.log({ error });
};

export { upsertBussiness };
