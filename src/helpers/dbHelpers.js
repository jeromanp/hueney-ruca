import { supabase } from "../utils/supabase.js";

export const getProfileId = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`id`)
    .eq(`auth_id`, id)
    .single();

  return { userId: data.id, error };
};

export const getProfileInfoId  = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`*`)
    .eq(`auth_id`, id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};