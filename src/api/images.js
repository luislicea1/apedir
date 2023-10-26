import supabase from "./client";
import { v4 as uuidv4 } from "uuid";

const uploadImage = async (image, name) => {
  const filename = `${uuidv4()}-${name}`;
  const { data, error } = await supabase.storage
    .from("avatars") // Cambia 'my-bucket' por el nombre de tu bucket
    .upload(filename, image);

  alert("Resized maded");
  if (error) {
    console.error("Error subiendo la imagen a Supabase", error);
  } else {
    console.log("Imagen subida a Supabase con éxito", data);
  }
  return data
};

export { uploadImage };
