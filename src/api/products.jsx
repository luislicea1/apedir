import supabase from "./client";
import { uploadImage } from "./images";

const addProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select();
  console.log(error);
};

const updateAvailability = async (id, status) => {
  const { data, error } = await supabase
    .from("products")
    .update({ isAvalaible: status })
    .eq("id", id)
    .select();
};

const updateProduct = async (product, imageName) => {
  if (imageName.length > 0 && product.image instanceof Blob) {
    const { data: oldData, error: oldError } = await supabase
      .from("products")
      .select("image")
      .eq("id", product.id);

    if (oldError) {
      console.error("Error al obtener el valor antiguo: ", oldError);
      return;
    }
    console.log({ oldData });
    if (oldData[0].image)
      await supabase.storage.from("products").remove(oldData[0].image);
  }

  let updatedProduct = Object.keys(product).reduce((acc, key) => {
    if (
      product[key] !== null &&
      product[key] !== "" &&
      key !== "image" &&
      product["image"] instanceof Blob === false
    ) {
      acc[key] = product[key];
    }
    return acc;
  }, {});

  if (product.image instanceof Blob) {
    let img;
    try {
      img = await uploadImage(product.image, imageName, "products");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return;
    }

    updatedProduct.image = img.path;
  }

  const { data, error } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", product.id)
    .select("*");

  console.log(error);
};

const getProducts = async (categories, isAvalaible) => {
  // Extrae los ID de las categorías

  const categoryIds = categories.map((category) => category.id);
  let data, error;

  if (isAvalaible !== undefined && isAvalaible !== null) {
    ({ data, error } = await supabase
      .from("products")
      .select("*")
      .in("category", categoryIds)
      .eq("isAvalaible", true)
      .order("name", { ascending: true }));
  } else {
    ({ data, error } = await supabase
      .from("products")
      .select("*")
      .in("category", categoryIds)
      .order("name", { ascending: true }));
  }

  if (error) {
    console.error("Error getting products: ", error);
    return [];
  }
  const products = data;
  // Obtén la URL pública de cada imagen
  const productsWithPublicUrls = await Promise.all(
    products.map(async (product) => {
      const { data: url, error } = supabase.storage
        .from("products")
        .getPublicUrl(product.image);

      if (error) {
        console.error("Error getting public URL for image:", error);
      } else {
        product.image = url.publicUrl;
      }

      return product;
    })
  );
  return productsWithPublicUrls;
};

const deleteProductById = async (id) => {
  const { data: oldData, error: oldError } = await supabase
    .from("products")
    .select("image")
    .eq("id", id);

  if (oldError) {
    console.error("Error al obtener el valor antiguo: ", oldError);
    return;
  }
  await supabase.storage.from("products").remove(oldData[0].image);
  await supabase.from("products").delete().eq("id", id);
};

export {
  addProduct,
  getProducts,
  updateAvailability,
  updateProduct,
  deleteProductById,
};
