import { supabase } from "../../../utils/supabase";

export const getAllRoles = async () => {
  const { data: roles, error } = await supabase.from("roles").select();
  if (error) {
    throw error;
  }
  return roles;
};

export const postNewRoles = async ({ name, type, user_id }) => {
  const { data: postRoles, error } = await supabase
    .from("roles")
    .insert([
      {
        name,
        type,
        user_id,
      },
    ])
    .select();
  if (error) {
    throw error;
  }
  return postRoles;
};

export const updateRoles = async ({ id, name, type, user_id }) => {
  const { data: upRoles, error } = await supabase
    .from("roles")
    .update({
      name,
      type,
      user_id,
    })
    .eq("id", id)
    .select();
  if (error) {
    throw error;
  }
  return upRoles;
};

export async function deleteRoles({ id }) {
  const { data, error } = await supabase.from("roles").delete().eq("id", id);

  if (error) {
    throw error;
  }
  return data;
}
