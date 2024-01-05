import handlerUserId from "./handlers";

export default async function handlerUserIdRoles(req, res) {
    const method = req.method;
    switch (method) {
        case "PUT":
            await handlerUserId.updateRole(req, res);
            break;
        default:
            res.status(500).json({ error: "Invalid Method" });
            break;
    }
}
