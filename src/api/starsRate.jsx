import supabase from "./client";

const addStars = async () => {};

const getStarsFromBussiness = async (bussinessId) => {
  const { data, error } = await supabase
    .from("stars_rating")
    .select("average")
    .eq("bussiness", bussinessId);
  console.log(data);
  console.log(error)
  return data;
};

export { getStarsFromBussiness };
