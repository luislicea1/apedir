import supabase from "./client";

const getCategories = async (bussiness) => {
    let { data: categories, error } = await supabase
      .from("categories")
      .select("category")
      .eq("bussiness", bussiness);
  
    categories = categories.map(category => category.category);

    return categories;
  };

const addCategory = async (category) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select();
    console.log(error)
  return data;
};

export { getCategories, addCategory };
