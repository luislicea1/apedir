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

  if (error) return;
  return data.star_ratings;
};

const updateProfileStars = async (user, bussiness, stars) => {
  const starsRating = [
    {
      bussiness: bussiness,
      stars: stars,
    },
  ];

  const { data, err } = await supabase
    .from("profiles")
    .update({ star_ratings: starsRating })
    .eq("id", user);
  if (err) console.log(err);

  console.log(data);
};

export {
  getRole,
  getUser,
  getUsers,
  updateProfile,
  deleteProfile,
  updateProfileStars,
  getProfileStars,
};
