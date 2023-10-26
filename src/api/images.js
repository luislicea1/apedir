import supabase from "./client";
import { v4 as uuidv4 } from "uuid";

const uploadImage = async (image, name, bucket) => {
  const filename = `${uuidv4()}-${name}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, image);

  if (error) {
    console.error("Error subiendo la imagen a Supabase", error);
  } else {
    console.log("Imagen subida a Supabase con éxito", data);
  }
  return data
};



export { uploadImage };
