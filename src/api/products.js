import supabase from "./client";

const addProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select();
    console.log({data}, {error})
};

// const getProducts = async () => {
//   let { data: products, error } = await supabase.from("products").select("*");

//   console.log(products, error);
//   return products;
// };

const getProducts = async () => {
  let { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error getting products:", error);
    return [];
  }

  // Obtén la URL pública de cada imagen
  const productsWithPublicUrls = await Promise.all(
    products.map(async (product) => {
      const { data: url, error } = supabase.storage
        .from("avatars")
        .getPublicUrl(product.image);

      if (error) {
        console.error("Error getting public URL for image:", error);
      } else {
        product.image = url.publicUrl;
      }

      return product;
    })
  );

  console.log(productsWithPublicUrls, error);
  return productsWithPublicUrls;
};

export { addProduct, getProducts };
