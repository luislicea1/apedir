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

export { getRole, getUser };
