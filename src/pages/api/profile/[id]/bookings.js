import * as Handlers from "../handlers";

export default async function handler(req, res) {
    const method = req.method;
    switch (method) {
        case "GET":
            return await Handlers.handlerGetProfileBookings(req, res);
        default:
            res.status(400).json({
                message: "400 Bad Request : invalid method",
            });
            break;
    }
}
