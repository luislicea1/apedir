import supabase from "./client";

const getPlans = async () => {
  const { data, error } = await supabase.from("plans").select("*");

  if (error) {
    console.log(error);
  }
  return data;
};

const updatePlan = async (plan) => {
  let updatedPlan = Object.keys(plan).reduce((acc, key) => {
    if (plan[key] !== null && plan[key] !== "" && key !== "id") {
      acc[key] = plan[key];
    }

    return acc;
  }, {});
  console.log(updatedPlan);

    const { data, error } = await supabase
      .from("plans")
      .update(updatedPlan)
      .eq("id", plan.id);
    if(error) return error
};

const deletePlan = async (id) => {
  const { error } = await supabase.from("plans").delete().eq("id", id);
  console.log(error);
};

export { getPlans, updatePlan, deletePlan };
