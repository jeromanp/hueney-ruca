import * as Controllers from "./controllers";

export async function handlerGet(req, res) {
  try {
    const comments = await Controllers.getAllComments();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
export async function handlerGetById(req, res) {
  const { id } = req.query;
  try {
    const room = await Controllers.getCommentById(id);
    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handlerPost(req, res) {
  const form = req.body;
  try {
    const postComent = await Controllers.postNewComment(form);
    return res.status(200).json(postComent);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function handlerPut(req, res) {
  const form = req.body;
  const { id, suspend } = req.query;
  try {
    const updateComment = await Controllers.updateComment(form, id, suspend);
    return res.status(200).json(updateComment);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function handlerDelete(req, res) {
  const { id } = req.query;
  try {
    const response = await Controllers.deleteComment(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.mesage });
  }
}
