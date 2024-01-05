import { supabase } from "../../../utils/supabase";

export const getAllImages = async () => {
  const { data: images, error } = await supabase.from("images").select();

  if (error) {
    throw error;
  }
  return images;
};

export const postNewImage = async ({ alt, url }) => {
  const { data: postImage, error } = await supabase
    .from("images")
    .insert([
      {
        alt,
        url,
      },
    ])
    .select();
  if (error) {
    throw error;
  }
  return postImage;
};

export const updateImage = async ({ id, alt, url }) => {
  const update_at = new Date();
  const { data: upImage, error } = await supabase
    .from("images")
    .update({
      alt,
      url,
      update_at,
    })
    .eq("id", id)
    .select();
  if (error) {
    throw error;
  }
  return upImage;
};

export async function deleteImage({ id }) {
  const { data, error } = await supabase.from("images").delete().eq("id", id);

  if (error) {
    throw error;
  }
  return data;
}
