import supabase from "./client";
import {
  getProfileStars,
  updateProfileStars,
  getUserStarsForBussiness,
} from "./profile";

const addStars = async (stars, user, bussiness) => {
  let starRating = await getStarsFromBussiness(bussiness);
  let userPreviousStars = null;
  console.log(starRating);
  if (starRating === null) {
    starRating = {
      bussiness: bussiness,
      stars_num: 0,
      total: 0,
      average: 0,
    };
  } else {
    // Restar las estrellas anteriores del usuario al total de estrellas del negocio
    userPreviousStars = await getUserStarsForBussiness(user, bussiness);
    starRating.stars_num -= userPreviousStars;
  }

  starRating.stars_num += stars;
  if (userPreviousStars === null) {
    starRating.total++;
  }
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

const getStarsAllBussiness = async () => { 
  const {data, err } = await supabase.from("stars_rating").select("*")

  console.log(err)
  

}

export { addStars, getStarsFromBussiness, getStarsAllBussiness };
