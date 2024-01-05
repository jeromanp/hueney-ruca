import { supabase } from "utils/supabase";
const controller = {};

controller.asignAdminRole = async (userId) => {
    const updateUser = await supabase
        .from("profiles")
        .update({
            role: 2,
        })
        .eq("id", userId)
        .select(`*`);
    return updateUser;
};

controller.removeAdminRole = async (userId) => {
    const updateUser = await supabase
        .from("profiles")
        .update({
            role: 1,
        })
        .eq("id", userId)
        .select(`*`);
    return updateUser;
};

export default controller;
