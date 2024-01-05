import * as Controllers from "./controllers";

export async function handlerGet(req, res) {
  try {
    const rooms = await Controllers.getAllRooms(req.query);
    return res.status(200).json(rooms.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handlerGetById(req, res) {
  const { id } = req.query;
  try {
    const room = await Controllers.getRoomById(id);
    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handlerPost(req, res) {
  const body = req.body;
  try {
    const postRoom = await Controllers.postRoom(body);
    return res.status(200).json(postRoom);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function handlerPut(req, res) {
  const { form, idRoom } = req.body;
  const { id, suspend } = req.query;
  try {
    const updateRoom = await Controllers.upRoom(
      id === undefined ? idRoom : id,
      form,
      suspend
    );
    return res.status(200).json(updateRoom);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function handlerDelete(req, res) {
  const { id } = req.query;

  try {
    const response = await Controllers.deleteRoom(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
