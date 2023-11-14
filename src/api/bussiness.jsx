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
    console.log(data, error);
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

  return data.publicUrl;
};

const getOneBussiness = async (ownerId) => {
  let { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("owner", ownerId);

  const front_pic = await getImage("bussiness_front", data[0].front_pic);
  const perfil_pic = await getImage("bussiness_perfil", data[0].perfil_pic);
  const gps_location = await getImage(
    "bussiness_location",
    data[0].gps_location
  );

  data[0].front_pic = front_pic;
  data[0].perfil_pic = perfil_pic;
  data[0].gps_location = gps_location;
  return data[0];
};

const loadMoreBussiness = async (offset, setOffset, setBussiness) => {
  // Carga los elementos desde Supabase usando la paginación
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .range(offset, offset + 9);

  if (error) {
    console.error(error);
    return;
  }

  // Obtener imágenes asociadas a cada negocio
  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      const front_pic = await getImage("bussiness_front", business.front_pic);
      const perfil_pic = await getImage(
        "bussiness_perfil",
        business.perfil_pic
      );
      const gps_location = await getImage(
        "bussiness_location",
        business.gps_location
      );

      return {
        ...business,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );
  console.log(businessesWithImages);
  // Actualiza el estado con los nuevos elementos
  setBussiness((prevBusinesses) => [
    ...prevBusinesses,
    ...businessesWithImages,
  ]);

  // Incrementa el desplazamiento
  setOffset(offset + 10);
};

export { upsertBussiness, getOneBussiness, getImage, loadMoreBussiness };
