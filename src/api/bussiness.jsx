import supabase from "./client";
import { getUserByID } from "./profile";
// import { getStarsFromBussiness } from "./starsRate";

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
    console.log(error);
    return;
  }

  const { data, error } = await supabase
    .from("bussiness")
    .insert(bussinessToInsert);
  console.log({ error });
};

const getImage = async (bucket, path) => {
  let { data, ef } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

const getBussinessImage = async (id) => {
  let { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("id", id);

  console.error(error)
  if (data && data[0]) {
    if (data[0].perfil_pic) {
      const perfil_pic = await getImage("bussiness_perfil", data[0].perfil_pic);
      
      return perfil_pic;
    }
  }
};

const getOneBussiness = async (ownerId) => {
  let { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("owner", ownerId);

  if (data && data[0]) {
    if (data[0].front_pic) {
      const front_pic = await getImage("bussiness_front", data[0].front_pic);
      data[0].front_pic = front_pic;
    }

    if (data[0].perfil_pic) {
      const perfil_pic = await getImage("bussiness_perfil", data[0].perfil_pic);
      data[0].perfil_pic = perfil_pic;
    }

    if (data[0].gps_location) {
      const gps_location = await getImage(
        "bussiness_location",
        data[0].gps_location
      );
      data[0].gps_location = gps_location;
    }

    return data[0];
  }
};

const updateBussinessSchedule = async (bussinessId, schedules) => {
  const { data, error } = await supabase
    .from("bussiness")
    .update({ schedules: schedules })
    .eq("id", bussinessId);

  console.log({ data });
  console.log({ error });
};

const loadMoreBussiness = async (
  offset,
  setOffset,
  bussinesses,
  setBussiness
) => {
  // Carga los elementos desde Supabase usando la paginación
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("isActive", true)
    .range(offset, offset + 19);

  if (error) {
    console.error(error);
    return;
  }
  if (data.length === 0) {
    return;
  }
  // Obtener imágenes asociadas a cada negocio
  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      const perfil_pic = await getImage(
        "bussiness_perfil",
        business.perfil_pic
      );
      return {
        ...business,
        perfil_pic,
      };
    })
  );
  if (bussinesses !== null && bussinesses.length > 0) {
    const newBusinesses = businessesWithImages.filter((business) => {
      return !bussinesses.find(
        (prevBusiness) => prevBusiness.id === business.id
      );
    });

    const finalBusinesses = [...bussinesses, ...newBusinesses];
    setBussiness(finalBusinesses);
  } else {
    setBussiness(businessesWithImages);
  }

  const newOf = offset + 19;
  setOffset(newOf);
  return businessesWithImages.length > 0 ? true : false;
};

const fetchAllBussiness = async () => {
  const { data, error } = await supabase.from("bussiness").select("*");

  if (error) {
    console.error(error);
    return;
  }
  if (data.length === 0) {
    return;
  }
  // Obtener imágenes asociadas a cada negocio
  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      const owner = await getUserByID(business.owner);
      // const stars = await getStarsFromBussiness(business.id);
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
        owner,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );

  // Actualiza el estado con los nuevos elementos
  return businessesWithImages;
};

const fetchBussinessPerProvince = async (province) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("province", province);
  if (error) return;

  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      // const stars = await getStarsFromBussiness(business.id);
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
        // stars,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );
  return businessesWithImages;
};

const fetchBussinessPerName = async (name) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("name", name);
  if (error) return;

  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      // const stars = await getStarsFromBussiness(business.id);
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
        // stars,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );
  return businessesWithImages;
};

const fetchBussinessPerURL = async (valueUrl) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("value_url", valueUrl);
  if (error) return;
  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      // const stars = await getStarsFromBussiness(business.id);
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
        // stars,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );
  return businessesWithImages[0];
};

const getSchedule = async (bussinessId) => {
  let { data, error } = await supabase
    .from("bussiness")
    .select("schedules")
    .eq("id", bussinessId);

  data = data[0].schedules;
  if (error) console.log(error);
  if (data) return data;
  else return null;
};

const setIsActive = async (bussinessId, isActive) => {
  const { data, error } = await supabase
    .from("bussiness")
    .update({ isActive: isActive })
    .eq("id", bussinessId);
  if (error) console.error(error);
};

export {
  setIsActive,
  upsertBussiness,
  getOneBussiness,
  getImage,
  loadMoreBussiness,
  fetchAllBussiness,
  fetchBussinessPerProvince,
  fetchBussinessPerName,
  fetchBussinessPerURL,
  updateBussinessSchedule,
  getSchedule,
  getBussinessImage,
};
