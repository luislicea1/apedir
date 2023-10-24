import supabase from "./client";

const addProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select();
};

const getProducts = async () => {
  let { data: products, error } = await supabase.from("products").select("*");
  console.log(products, error);
  return products;
};

export { addProduct, getProducts };
