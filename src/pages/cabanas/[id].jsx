import Layout from "../../layouts/Layout.jsx";
import Link from "next/link";
import NavSliders from "components/NavSliders.jsx";
import Datepicker from "react-tailwindcss-datepicker";
import { supabase } from "utils/supabase";
import { useState } from "react";

export default function Room({ room }) {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });
    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <Layout>
            {room.images ? (
                <NavSliders cabanas={room} />
            ) : (
                <div className="h-10 overflow-hidden shadow-lg">
                    <h1 className="text-center">No se cargaron imagenes</h1>
                </div>
            )}

            <div
                className="max-w-md px-6 pt-10 mx-auto pointer-events-none
				md:max-w-4xl 
				lg:relative lg:z-30 2xl:px-0"
            >
                <div className="grid lg:grid-cols-2 lg:gap-x-20">
                    <div className="pointer-events-auto">
                        <h2 className="text-brand-green text-3xl font-semibold select-none md:text-4xl">
                            {room.name}
                        </h2>

                        <div
                            className="bg-brand-olive text-white text-xs font-medium px-3 
							py-3 mt-4 rounded-xl grid gap-2 grid-cols-2"
                        >
                            <div className="bg-black bg-opacity-20 px-3 py-1.5 rounded-lg">
                                {room.capacity > 1
                                    ? `${room.capacity} huespedes`
                                    : `${room.capacity} huesped`}
                            </div>
                            <div className="bg-black bg-opacity-20 px-3 py-1.5 rounded-lg">
                                {room.rooms > 1
                                    ? `${room.rooms} dormitorios`
                                    : `${room.rooms} dormitorio`}
                            </div>
                            <div className="bg-black bg-opacity-20 px-3 py-1.5 rounded-lg">
                                {room.beds > 1
                                    ? `${room.beds} camas`
                                    : `${room.beds} cama`}
                            </div>
                            <div className="bg-black bg-opacity-20 px-3 py-1.5 rounded-lg">
                                {room.bathrooms > 1
                                    ? `${room.bathrooms} baños`
                                    : `${room.bathrooms} baño`}
                            </div>
                        </div>

                        <ul className="my-5">
                            <h1 className="text-lg font-semibold">Incluye:</h1>
                            {room.services.map((service, i) => (
                                <li
                                    className="whitespace-pre-wrap text-sm ml-2"
                                    key={`iiii-id-${i}`}
                                >
                                    <p>-{service}</p>
                                </li>
                            ))}
                        </ul>

                        <h1 className="text-lg font-semibold">Detalles:</h1>
                        <p>{room.description}</p>

                        <div className="mt-6">
                            <div className="text-lg font-semibold leading-none">
                                Disponibilidad:{" "}
                            </div>
                            <div className="border border-brand-green mt-2 rounded-lg">
                                {/* <Datepicker
									disabledDates={getAllDisabledDates(room.booking)}/> */}
                                <Datepicker
                                    disabledDates={room.booking
                                        .filter(
                                            (el) =>
                                                el.payments === true &&
                                                el.suspended === false &&
                                                el.deleted_at === null
                                        )
                                        .map((el) => {
                                            return {
                                                startDate: el.checkin,
                                                endDate: el.checkout,
                                            };
                                        })}
                                    minDate={new Date()}
                                    useRange={false}
                                    asSingle={true}
                                    value={value}
                                    onChange={handleValueChange}
                                    readOnly={true}
                                ></Datepicker>
                            </div>
                        </div>

                        <div className="space-x-1 leading-none font-semibold mt-6 flex items-start">
                            {/* <span className="text-brand-green text-opacity-80 relative top-1">Precio</span> */}
                            <span className="text-brand-green text-4xl">
                                ${room.price}
                            </span>
                            <span className="text-brand-green text-opacity-60 relative top-1.5">
                                /Noche
                            </span>
                        </div>

                        <div className="self-center mt-6">
                            {room.available && !room.suspended ? (
                                <Link
                                    className="btn-yellow"
                                    href={`/checkout/${room.id}`}
                                >
                                    <span className="px-4 py-1.5">
                                        Resérvalo ahora
                                    </span>
                                </Link>
                            ) : (
                                <div className="btn-yellow">
                                    <span className="px-4 py-1.5">
                                        No disponible
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row md:justify-center md:mx-auto md:max-w-7xl md:pb-10 lg:px-10">
                <div className="flex flex-col lg:pr-10 mb-10 lg:mb-0 text-brand-green m-auto"></div>

                <div className="w-5/6 md:w-1/3 m-auto md:m-0 md:mx-auto"></div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const { id } = params;

    const { data: room, error } = await supabase
        .from("rooms")
        .select(`*,booking(checkin,checkout,payments)`)
        .eq("id", id);

    if (error) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            room: room[0],
        },
    };
}
