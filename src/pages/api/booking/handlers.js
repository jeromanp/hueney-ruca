import * as Controllers from "./controllers";

export async function handlerGet(req, res) {
  try {
    const booking = await Controllers.getAllBooking();
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handlerGetById(req, res) {
  const { id } = req.query;
  try {
    const room = await Controllers.getBookingById(id);
    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handlerPost(req, res) {
  const body = req.body;
  try {
    const postBooking = await Controllers.postNewBooking(body);
    return res.status(200).json(postBooking);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function handlerPut(req, res) {
  const body = req.body;
  const { id, suspend } = req.query;
  try {
    const updateBooking = await Controllers.updateBooking(body, id, suspend);
    return res.status(200).json(updateBooking);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function handlerDelete(req, res) {
  const { id } = req.query;

  try {
    const response = await Controllers.deleteBooking(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handlerUpdateById(req, res) {
  const { id, session_id } = req.query;
  try {
    if (session_id === undefined) {
      handlerPut(req, res);
    } else {
      //Si se paso un session_id entonces es verificaicon de pago
      const response = await Controllers.paymentVerification(id, session_id);
      res.json(response);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
