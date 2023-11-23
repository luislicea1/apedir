import { banUser } from "./auth";
import supabase from "./client";

const getRole = async (email) => {
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("email", email);

  if (error) {
    console.log(error);
    return null;
  }
  if (profiles[0] !== null && profiles[0] !== undefined) {
    return profiles[0].role;
  }
};

const getUser = async (email) => {
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (error) {
    console.log(error);
    return null;
  }
  if (profiles[0] !== null && profiles[0] !== undefined) {
    return profiles[0];
  }
};

const getUsers = async () => {
  let { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) {
    return null;
  }
  return profiles;
};

const updateProfile = async (profile) => {
  let updatedProfile = Object.keys(profile).reduce((acc, key) => {
    if (profile[key] !== null && profile[key] !== "") {
      acc[key] = profile[key];
    }
    return acc;
  }, {});
  if ("isActive" in updatedProfile) {
    await banUser(profile.id, updatedProfile.isActive);
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfile)
    .eq("id", profile.id)
    .select();
  console.log(error);
};

const deleteProfile = async (id) => {
  const { error } = await supabase.from("profiles").delete().eq("id", id);
};

const getProfileStars = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("star_ratings")
    .eq("id", userId)
    .single();
  if (error) {
    console.log(error);
    return;
  }
  return data.star_ratings;
};

const getProfileStarsFromBussiness = async (userId, bussinessId) => {
  let { data: userStars, err } = await supabase
    .from("profiles")
    .select("star_ratings")
    .eq("id", userId)
    .single();
  userStars = userStars.star_ratings;
  const bussinessIndex = userStars.findIndex(
    (element) => element.bussiness === bussinessId
  );
  console.log(bussinessIndex);
  if (bussinessIndex > -1) {
    // If business exists in userStars, update the stars rating
    const stars = userStars[bussinessIndex].stars;
    return stars;
  } else {
    // If business doesn't exist in userStars, add it to the list
    return 0;
  }
};

const updateProfileStars = async (user, bussiness, stars) => {
  let userStars = await getProfileStars(user);

  const bussinessIndex = userStars.findIndex(
    (element) => element.bussiness === bussiness
  );

  if (bussinessIndex > -1) {
    // If business exists in userStars, update the stars rating
    userStars[bussinessIndex].stars = stars;
  } else {
    // If business doesn't exist in userStars, add it to the list
    userStars.push({
      bussiness: bussiness,
      stars: stars,
    });
  }

  const { data, err } = await supabase
    .from("profiles")
    .update({ star_ratings: userStars })
    .eq("id", user);
  if (err) console.log(err);
};

export {
  getRole,
  getUser,
  getUsers,
  updateProfile,
  deleteProfile,
  updateProfileStars,
  getProfileStarsFromBussiness,
  getProfileStars,
};
