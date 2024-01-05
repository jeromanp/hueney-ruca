import * as Controllers from "./controllers";

export async function handlerGet(req, res) {
  try {
    const allRoles = await Controllers.getAllRoles();
    return res.status(200).json(allRoles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handlerPost(req, res) {
  const body = req.body;
  try {
    const postRoles = await Controllers.postNewRoles(body);
    return res.status(200).json(postRoles);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function handlerPut(req, res) {
  const body = req.body;
  try {
    const updateRoles = await Controllers.updateRoles(body);
    return res.status(200).json(updateRoles);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function handlerDelete(req, res) {
  const body = req.body;
  try {
    const response = await Controllers.deleteRoles(body);
    return res.status(200).json({ message: "Rol successfully removed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
