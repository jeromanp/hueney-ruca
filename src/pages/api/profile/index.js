import * as Methods from "../methods";
import * as Handlers from "./handlers";

export default async function handlerProfile(req, res) {
  const method = req.method;
  switch (method) {
    case Methods.GET:
      return await Handlers.handlerGet(req, res);
    case Methods.POST:
      return await Handlers.handlerPost(req, res);
    case Methods.PUT:
      return await Handlers.handlerPut(req, res);
    case Methods.DELETE:
      return await Handlers.handlerDelete(req, res);
    default:
      res.status(400).json({
        message: "400 Bad Request : invalid method",
      });
  }
}
