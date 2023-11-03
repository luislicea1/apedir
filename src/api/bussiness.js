import supabase from "./client";

const upsertBussiness = async (bussiness) => {
  let bussinessToInsert = Object.keys(bussiness).reduce((acc, key) => {
    if (bussiness[key] !== null && bussiness[key] !== "") {
      acc[key] = bussiness[key];
    }
    return acc;
  }, {});
  if (bussiness.id !== "") {
    const { data, error } = await supabase
      .from("bussiness")
      .upsert(bussinessToInsert);
    return;
  }

  const { data, error } = await supabase
    .from("bussiness")
    .insert(bussinessToInsert);
  console.log({ data });
  console.log({ error });
};

const getImage = async (bucket, path) => {
  let { data, ef } = supabase.storage.from(bucket).getPublicUrl(path);
  console.log(data.publicUrl);
  return data.publicUrl;
};

const getOneBussiness = async (ownerId) => {
  let { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("owner", ownerId);

  const front_pic = await getImage("bussiness_front", data[0].front_pic);
  const perfil_pic = await getImage("bussiness_perfil", data[0].perfil_pic);

  data[0].front_pic = front_pic;
  data[0].perfil_pic = perfil_pic;
  console.log(data[0]);
  return data[0];
};

export { upsertBussiness, getOneBussiness };
