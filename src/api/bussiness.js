import supabase from "./client";

const upsertBussiness = async (bussiness) => {
  console.log(bussiness);
  const { data, error } = await supabase.from("bussiness").upsert(bussiness);
  console.log({ data });
  console.log({ error });
};

const getOneBussiness = async (ownerId) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("owner", ownerId);

  console.log(error !== null ? error : null);
  return data[0];
};

export { upsertBussiness, getOneBussiness };
