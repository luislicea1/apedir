import supabase from "./client";

import { v4 as uuidv4 } from "uuid";

const uploadImage = async (image, name, bucket) => {
  const filename = `${uuidv4()}-${name}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, image);
  console.log({ data });
  console.log({ error });
  return data;
};

export { uploadImage };
