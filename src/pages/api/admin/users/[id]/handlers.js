const handlerUserId = {};
import userRoleController from "./controllers.js";
import { getProfileInfoId } from "helpers/dbHelpers.js";

handlerUserId.updateRole = async (req, res) => {
    const { id } = req.query;
    const { prevRole, adminRoleSessionId } = req.body;

    try {
        const superAdminInfo = await getProfileInfoId(adminRoleSessionId);
        if (superAdminInfo.role !== 3) {
            throw new Error("Permisos invalidos");
        }
        if (prevRole == 1) {
            const updateUser = await userRoleController.asignAdminRole(id);
            res.json(updateUser);
        } else if (prevRole == 2) {
            const updateUser = await userRoleController.removeAdminRole(id);
            res.json(updateUser);
        } else if (prevRole == 3) {
            res.json({ error: "El superadmin no puede ser modificado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default handlerUserId;
