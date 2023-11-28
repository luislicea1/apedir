import supabase from "./client";
import { updateProfileStars, getUserStarsForBussiness } from "./profile";

const addStars = async (stars, user, bussiness) => {
  let starRating = await getStarsFromBussiness(bussiness);

  let userPreviousStars = 0;
  if (starRating === null || starRating === undefined) {
    starRating = {
      bussiness: bussiness,
      stars_num: 0,
      total: 0,
      average: 0,
    };
  } else {
    userPreviousStars = await getUserStarsForBussiness(user, bussiness);
    starRating.stars_num -= userPreviousStars;
  }
  starRating.stars_num += stars;

  if (userPreviousStars === 0) {
    starRating.total += 1;
  }

  starRating.average =
    starRating.total === 0 ? 0 : starRating.stars_num / starRating.total;

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
    .limit(1);
  return data[0];
};

const getStarsAllBussiness = async () => {
  const { data, err } = await supabase.from("stars_rating").select("*");

  console.log(err);
};

export { addStars, getStarsFromBussiness, getStarsAllBussiness };
