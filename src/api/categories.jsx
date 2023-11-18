import supabase from "./client";

const getCategories = async (bussiness) => {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("bussiness", bussiness)
    .order("category", { ascending: true });
  console.log(categories);
  console.log(error);
  return categories;
};

const addCategory = async (category) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select();

  console.log(error);
  return data;
};

const updateCategory = async (category) => {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", category.id);

  console.log(error);
};

const deleteCategoryById = async (id) => {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
};

export { getCategories, addCategory, updateCategory, deleteCategoryById };
