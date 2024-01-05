import { getProfileId, getProfileInfoId } from "helpers/dbHelpers";
import { supabase } from "../../../utils/supabase";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getAllBooking = async () => {
    const { data: infoBooking, error } = await supabase
        .from("booking")
        .select("*, rooms(name, id)")
        .order("created_at", { ascending: false });

    if (error) {
        throw error;
    }
    return infoBooking;
};

export const getBookingById = async (id) => {
    const { data: room, error } = await supabase
        .from("booking")
        // De preferencia, hacer esta funcion dinamica
        // De forma que pueda pedirte solo los bookings, o bookings con sus rooms,
        // O bookings con sus rooms y sus usuarios, etc, con todas las rutas
        .select(`*, rooms(name), profiles(full_name, email)`)
        .eq("id", id)
        .single();
    if (error) {
        throw error;
    }
    return room;
};

export const postNewBooking = async ({
    checkin,
    checkout,
    user_id,
    room_id,
    payments,
    adults,
    children,
}) => {
    const { userId, error: profileError } = await getProfileId(user_id);

    if (profileError) {
        throw profileError;
    }

    const userVerification = await getProfileInfoId(user_id);
    if (userVerification.suspended === true) {
        throw new Error("Usuario suspendido");
    }
    const { data: postBooking, error } = await supabase
        .from("booking")
        .insert([
            {
                checkin,
                checkout,
                user_id: userId,
                room_id,
                payments,
                adults,
                children,
            },
        ])
        .select();
    if (error) {
        console.log("ERROR", error);
        throw error;
    }
    return postBooking;
};

export const updateBooking = async (
    { checkin, checkout, user_id, room_id, payments, adults, children },
    id,
    suspend
) => {
    if (suspend === undefined) {
        const newDate = new Date();
        const { data: upBooking, error } = await supabase
            .from("booking")
            .update({
                checkin,
                checkout,
                user_id,
                room_id,
                payments,
                adults,
                children,
                update_at: newDate,
            })
            .eq("id", id)
            .select();
        if (error) {
            throw error;
        }
        return upBooking;
    } else {
        const booking = await getBookingById(id);
        const { data: upBooking, error } = await supabase
            .from("booking")
            .update({ suspended: !booking.suspended })
            .eq("id", id)
            .select();
        if (error) {
            throw error;
        }
        return true;
    }
};

export async function deleteBooking(id) {
    const { data, error } = await supabase
        .from("booking")
        .update({ deleted_at: new Date() })
        .eq("id", id);

    if (error) {
        throw error;
    }
    return false;
}

export async function paymentVerification(bookingId, sessionId) {
    //Session de pago
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    //console.log(session);
    if (session.status === "complete" && session.payment_status === "paid") {
        //Se pago correctamente
        //Update booking
        const { data, error } = await supabase
            .from("booking")
            .update({ payments: true })
            .eq("id", bookingId)
            .select();
        if (error) {
            throw error;
        }
        //CABANA DATA
        const { data: cabanaData, error: cabanaError } = await supabase
            .from("rooms")
            .select("*")
            .eq("id", data[0].room_id)
            .single();
        if (cabanaError) {
            throw cabanaError;
        }
        //PRODUCT DATA

        return { booking: data[0], session, cabana: cabanaData };
    } else {
        throw new Error("Problema con el pago");
    }
}
