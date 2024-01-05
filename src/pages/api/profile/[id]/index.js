import * as Handlers from "../handlers";
import * as Methods from "../../methods";

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case Methods.DELETE:
      return await Handlers.handlerDelete(req, res);
    case Methods.PUT:
      return await Handlers.handlerPut(req, res);
    case Methods.GET:
      return await Handlers.handlerGetById(req, res);
    default:
      res.status(400).json({
        message: "400 Bad Request : invalid method",
      });
  }
}
