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

const removeImage = async (id, column, bucket) => {
  const { data: oldData, error: oldError } = await supabase
    .from("bussiness")
    .select(column)
    .eq("id", id);
  console.log(oldData);
  if (oldData) {
    let { data, error } = await supabase.storage
      .from(bucket)
      .remove(oldData[0].image);
    console.log(data, error);
  }
};

export { uploadImage, removeImage };