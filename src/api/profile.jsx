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
  console.log(profile);
  if (!updatedProfile.isActive) {
    await banUser(profile.id);
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfile)
    .eq("id", profile.id)
    .select();
};

const deleteProfile = async (id) => {
  const { error } = await supabase.from("profiles").delete().eq("id", id);
};

export { getRole, getUser, getUsers, updateProfile, deleteProfile };
