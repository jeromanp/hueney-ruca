import { getProfileId } from "helpers/dbHelpers";
import { supabase } from "../../../utils/supabase";
import { data } from "autoprefixer";

export const getAllProfile = async () => {
  const { data: rooms, error } = await supabase.from("profiles").select(`*`);
  if (error) {
    throw error;
  }
  return rooms;
};

export const postProfile = async (form) => {
  const { data: postProfile, error } = await supabase
    .from("profiles")
    .insert([form]);
  if (error) {
    throw error;
  }
  return postProfile;
};

export const updateProfile = async (form, id, suspend) => {
  if (suspend === undefined) {
    //console.log(form);
    const { data: updateProfile, error } = await supabase
      .from("profiles")
      .update(form)
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    return updateProfile;
  } else {
    const profile = await getProfileById(id);
    const { data: upProfile, error } = await supabase
      .from("profiles")
      .update({ suspended: !profile.suspended })
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    return true;
  }
};

export async function deleteProfile(id) {
  const { data: delProfile, error } = await supabase
    .from("profiles")
    .update({ deleted_at: new Date() })
    .eq("id", id);
  if (error) {
    throw error;
  }
  return false;
}

export async function getProfileBookings(userId) {
  const { userId: id } = await getProfileId(userId);
  const { data: profileBookings, error } = await supabase
    .from("booking")
    .select(`*,rooms(name, id)`)
    .eq("user_id", id);
  if (error) {
    throw error;
  }
  return profileBookings;
}

//GET/ID

export const getProfileById = async (id) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return profile;
};
