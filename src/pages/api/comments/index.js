import * as Handlers from "./handlers";
import * as Methods from "../methods";

export default async function handlerComments(req, res) {
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
      return res
        .status(400)
        .json({ message: "400 Bad Request: invalid method" });
  }
}
