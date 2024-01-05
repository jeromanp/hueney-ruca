import { useSession } from "@supabase/auth-helpers-react";
import Datepicker from "./form/Datepicker";
import GuestsSelector from "./form/GuestsSelector";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { addDays } from "helpers/dateProcessing";
import DatePicker from "./DatePicker";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function CheckOutForm({
    name,
    price,
    night,
    extra,
    default_price,
    room,
    filters,
    setFilters,
}) {
    // Este estado solo lo copie y pegue, para que no me de error el GuestSelector
    const session = useSession();
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState("none");
    const [disableButton, setdisableButton] = useState(false);

    const clickHandler = async () => {
        setdisableButton(true);
    if (filters.checkin === null || filters.checkout === null) {
            setError("Faltan registrar fechas");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setdisableButton(false);
            }, 2000);
            return;
        }
        if (filters.checkin == filters.checkout) {
            setError("Minimo 1 noche");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setdisableButton(false);
      }, 2000);
            return;
        }
        const bodyData = {
            checkin: new Date(filters.checkin),
            checkout: new Date(filters.checkout),
            adults: filters.guests,
            user_id: session.user.id,
            room_id: room.id,
        };

        const response = await fetch("/api/booking", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
        });

        const data = await response.json();

        if (data.error === "Usuario suspendido") {
            setError("Usuario suspendido");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setdisableButton(false);
            }, 2000);
            return;
        }

        const checkOutBodyData = {
            roomId: room.id,
            price_id: default_price,
            night: night,
            subscription: true,
            booking_id: data[0].id,
        };
        const checkoutSessionResponse = await fetch(`/api/checkout_sessions`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkOutBodyData),
        });
        const checkoutSessionData = await checkoutSessionResponse.json();
        window.location.href = checkoutSessionData.url;
    };

    return (
        <div className="w-full md:w-1/3 px-4">
            <div className="pt-4">
                <div className="pb-2">
                    <h2 className="font-medium text-3xl text-black pb-6">
                        Tu viaje
                    </h2>
                    <div className="border-2 border-brand-light-green rounded-full"></div>
                    <div className="pt-6">
                        <div>
                            <p className="text-lg text-black font-base pb-0.5">
                                Registre su Fecha
                            </p>
                            <div className="border-2 rounded-xl border-brand-light-green p-0.5">
                                <DatePicker
                                    filters={filters}
                                    setFilters={setFilters}
                                    disabledDates={room.booking.filter(
                                        (el) => el.payments === true
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 pb-6 w-full">
                        <p className="text-lg text-black font-base pb-0.5">
                            Cantidad de personas
                        </p>
                        <div className="border-2 rounded-xl border-brand-light-green p-1">
                            <GuestsSelector
                                bottom="10"
                                filterSetter={setFilters}
                                filters={filters}
                            />
                        </div>
                    </div>

                    <div className="bg-brand-light-green rounded-xl text-center w-full">
                        <button
                            className={`text-white text-xl font-medium p-4 w-full border-2 border-brand-light-green rounded-xl ${
                                showAlert
                                    ? "bg-red-500 border-2 border-red-600"
                                    : ""
                            }`}
                            onClick={clickHandler}
                            type="submit"
                            role="link"
                            disabled={showAlert || disableButton}
                        >
                            {showAlert ? error : "Reservar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
