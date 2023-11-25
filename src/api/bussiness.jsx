import supabase from "./client";
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
    // .eq("isActive", true)
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
  if (bussinesses !== null && bussinesses.length > 0) {
    const newBusinesses = businessesWithImages.filter((business) => {
      return !bussinesses.find(
        (prevBusiness) => prevBusiness.id === business.id
      );
    });

    // Combinar los negocios existentes con los nuevos
    const finalBusinesses = [...bussinesses, ...newBusinesses];
    // Actualiza el estado con los nuevos elementos
    setBussiness(finalBusinesses);
  } else {
    setBussiness(businessesWithImages);
    
  }
  // Incrementa el desplazamiento
  setOffset(offset + 19);
  return businessesWithImages.length>0 ? true :  false
};

const fetchAllBussiness = async () => {
  const { data, error } = await supabase.from("bussiness").select("*");
  console.log(data);
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
  console.log(businessesWithImages);
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

export {
  upsertBussiness,
  getOneBussiness,
  getImage,
  loadMoreBussiness,
  fetchAllBussiness,
  fetchBussinessPerProvince,
  fetchBussinessPerName,
  fetchBussinessPerURL,
};
