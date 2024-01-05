import { supabase } from "../../../utils/supabase";

export const getAllComments = async () => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select(`*, profiles(full_name, email)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    throw error;
  }

  return comments;
};

export const getCommentById = async (id) => {
  const { data: room, error } = await supabase
    .from("comments")
    .select(`*`)
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return room;
};

export const postNewComment = async (form) => {
  const { data: postComment, error } = await supabase
    .from("comments")
    .insert([form])
    .select();
  if (error) {
    throw error;
  }
  return postComment;
};

export const updateComment = async (form, id, suspend) => {
  if (suspend === undefined) {
    const { data: updateComments, error } = await supabase
      .from("comments")
      .update(form)
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    return updateComments;
  } else {
    const comment = await getCommentById(id);
    const { data: upComment, error } = await supabase
      .from("comments")
      .update({ suspended: !comment.suspended })
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    return true;
  }
};

export async function deleteComment(id) {
  const { data, error } = await supabase
    .from("comments")
    .update({ deleted_at: new Date() })
    .eq("id", id);

  if (error) {
    console.log(error);
    throw error;
  }
  return false;
}
