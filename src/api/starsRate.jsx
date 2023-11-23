import supabase from "./client";
import { getProfileStars, updateProfileStars } from "./profile";

const addStars = async (stars, user, bussiness) => {
  let starRating = await getStarsFromBussiness(bussiness);

  console.log(starRating)
  if (starRating === null) {
    starRating = {
      bussiness: bussiness,
      stars_num: 0,
      total: 0,
      average: 0,
    };
  }
  starRating.stars_num += stars;
  starRating.total++;
  starRating.average = starRating.stars_num / starRating.total;

  console.log(starRating);

  const { data, error } = await supabase
    .from("stars_rating")
    .upsert(starRating)
    .eq("bussiness", bussiness);

  console.log(error);

  await updateProfileStars(user, bussiness, stars);
};

const getStarsFromBussiness = async (bussinessId) => {
  const { data, error } = await supabase
    .from("stars_rating")
    .select("*")
    .eq("bussiness", bussinessId)
    .single();
  console.log(error);
  return data;
};

export { addStars, getStarsFromBussiness };
