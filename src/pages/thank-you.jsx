import LayoutMain from "layouts/Layout";
import Swal from "sweetalert2";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { diffDays } from "helpers/dateProcessing";
import { useSession } from "@supabase/auth-helpers-react";

export default function ThankYou() {
    const mock = {
        title: "Cabana B2",
        full_name: "Fabian Gonzalez",
        email: "fabian.gonza89@gmail.com",
        persons: 3,
        price: 19,
        night: 7,
        extra: 25,
    };

    const router = useRouter();
    const session = useSession();
    const [thankYouData, setThankYouData] = useState({ null: true });
    const { session_id, booking_id } = router.query;
    const [checkoutSession, setCheckoutSession] = useState({ null: true });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    useEffect(() => {
        const getCheckOutSession = async () => {
            if (session_id === undefined) {
                return;
            }
            const response = await fetch(
                `/api/checkout_sessions?session_id=${session_id}`
            );
            const data = await response.json();
            setCheckoutSession(data);
        };
        getCheckOutSession();
    }, [session_id]);
    useEffect(() => {
        const verifiedRoomPaid = async () => {
            if (
                session_id === undefined ||
                booking_id === undefined ||
                checkoutSession.null === true
            ) {
                return;
            }
            if (
                checkoutSession.status === "complete" &&
                checkoutSession.payment_status === "paid"
            ) {
                //El pago se realizo correctamente
                //Se debe realizar el cambio en la base de datos de q el booking payment=true
                const response = await fetch(
                    `/api/booking/${booking_id}?session_id=${session_id}`,
                    {
                        method: "PUT",
                    }
                );
                const data = await response.json();
                setThankYouData(data);
            }
        };
        verifiedRoomPaid();
    }, [checkoutSession]);

    useEffect(() => {
        console.log(thankYouData);
    }, [thankYouData]);

    const sendEmail = async () => {
        setButtonDisabled(true);
        const username = thankYouData.session.customer_details.name;
        // envío de email, message es lo que va dentro de él
        emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_GENERIC,
                {
                    user_name: username,
                    user_email: thankYouData.session.customer_details.email,
                    message: `Hola ${username}, gracias por elegirnos para unas vacaciones! 
                Ya casi está todo listo, solo faltas vos! Junto a este mail
                te compartimos la información de la reserva que hiciste. Te esperamos!
                
                Detalles de la compra:
                Email: ${thankYouData.session.customer_details.email}
                Nombre: ${thankYouData.session.customer_details.name}
                Cabaña reservada: ${thankYouData.cabana.name}
                Detalles del precio:
                Cantidad de adultos: ${thankYouData.booking.adults}
                Cantidad de niños: ${
                    thankYouData.booking.children === null
                        ? 0
                        : thankYouData.booking.children
                }
                Precio por noche ($${thankYouData.cabana.price}) x ${diffDays(
                        new Date(thankYouData.booking.checkin),
                        new Date(thankYouData.booking.checkout)
                    )} noches...........................................${
                        thankYouData.cabana.price *
                        diffDays(
                            new Date(thankYouData.booking.checkin),
                            new Date(thankYouData.booking.checkout)
                        )
                    }
                Total..............................................................................................${
                    thankYouData.cabana.price *
                    diffDays(
                        new Date(thankYouData.booking.checkin),
                        new Date(thankYouData.booking.checkout)
                    )
                }
                `,
                },
                process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
            )
            .then((response) => {
                Swal.fire(
                    "Ya te enviamos un email con la información pedida",
                    "",
                    "success"
                );
                setButtonDisabled(false);
            })
            .catch((error) => {
                Swal.fire(
                    "Hubo un error al enviarte los datos",
                    "Intenta de nuevo más tarde",
                    "error"
                );
                setButtonDisabled(false);
            });
    };

    return (
        <LayoutMain>
            <div className="min-h-screen pt-2 px-4 sm:px-6 lg:px-8">
                <div className="space-y-4">
                    <div className="flex flex-col items-center pt-4 sm:pt-8 md:flex-row md:justify-between md:pl-6 md:pr-6 lg:pl-18 lg:pr-18 container mx-auto">
                        <section className="text-center flex flex-col justify-center items-center mb-4 md:mb-0 md:mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-brand-light-green w-80 h-80"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h2 className="text-3xl font-bold text-brand-green uppercase">
                                ¡Gracias por tu reserva!
                            </h2>
                        </section>

                        <section className="w-full md:w-1/2">
                            <div>
                                <h1 className="uppercase font-semibold text-xl text-brand-green my-2">
                                    {/* DATOS DEL PAGO CON TARJETA NO DE LA SESSION */}
                                    Resumen de compra
                                </h1>
                                <h3 className="flex justify-between text-black text-lg">
                                    Cabaña:{" "}
                                    <span>
                                        {thankYouData.null === true
                                            ? "..."
                                            : thankYouData.cabana.name}
                                    </span>
                                </h3>
                                <h3 className="flex justify-between text-black text-lg">
                                    Cliente:{" "}
                                    <span>
                                        {thankYouData.null === true
                                            ? "..."
                                            : thankYouData.session
                                                  .customer_details.name}
                                    </span>
                                </h3>
                                <h3 className="flex justify-between text-black text-lg">
                                    Email:{" "}
                                    <span>
                                        {thankYouData.null === true
                                            ? "..."
                                            : thankYouData.session
                                                  .customer_details.email}
                                    </span>
                                </h3>
                            </div>
                            <div className="border border-solid border-brand-light-green border-t-2 my-4 rounded-full ml-1 mr-1"></div>

                            <div>
                                <h1 className="uppercase font-semibold text-xl text-brand-green my-2">
                                    Detalles del precio
                                </h1>
                                <h3 className="flex justify-between text-black text-lg">
                                    Cant. adultos:{" "}
                                    <span>
                                        {thankYouData.null === true
                                            ? "..."
                                            : thankYouData.booking.adults}
                                    </span>
                                </h3>
                                <h3 className="flex justify-between text-black text-lg">
                                    Cant. niños:{" "}
                                    <span>
                                        {thankYouData.null === true
                                            ? "..."
                                            : thankYouData.booking.children ??
                                              0}
                                    </span>
                                </h3>
                                <h3 className="flex justify-between text-black text-lg">
                                    $
                                    {thankYouData.null === true
                                        ? "..."
                                        : thankYouData.cabana.price}{" "}
                                    por{" "}
                                    {thankYouData.null === true
                                        ? "..."
                                        : diffDays(
                                              new Date(
                                                  thankYouData.booking.checkin
                                              ),
                                              new Date(
                                                  thankYouData.booking.checkout
                                              )
                                          )}{" "}
                                    noches:
                                    <span>
                                        $
                                        {thankYouData.null === true
                                            ? "..."
                                            : thankYouData.session
                                                  .amount_subtotal / 100}
                                    </span>
                                </h3>
                                <h3 className="flex justify-between text-black text-lg">
                                    {/* ACA LO MISMO QUEDA A VER LO DE EXTRAS / DESCUENTOS */}
                                    Extras: <span>${0}</span>
                                </h3>
                                <div className="border border-solid border-brand-light-green border-t-2 my-4 rounded-full ml-1 mr-1"></div>

                                <h3 className="flex justify-between uppercase text-black font-medium text-xl">
                                    Total:{" "}
                                    <span>
                                        $
                                        {thankYouData.null === true
                                            ? "..."
                                            : thankYouData.session
                                                  .amount_total / 100}
                                    </span>
                                </h3>
                            </div>

                            {/* <p className="mt-2 text-lg text-gray-600">
                Hemos recibido tu reserva y te hemos enviado un correo
                electrónico con los detalles de tu reserva. Esperamos que
                disfrutes tu estadía con nosotros.
              </p> */}

                            <div className="flex justify-center pt-10">
                                <button
                                    onClick={sendEmail}
                                    disabled={buttonDisabled}
                                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-lg text-base font-medium text-white bg-brand-yellow hover:bg-opacity-80 transition duration-150 ease-in-out sm:w-auto"
                                >
                                    Enviar resumen de compra
                                </button>
                            </div>
                        </section>
                    </div>

                    <div className="w-full flex justify-center">
                        <Link href="/">
                            <div className="flex justify-center items-center pt-14 pb-18">
                                <img
                                    src="/back.svg"
                                    alt=""
                                    className="w-5 mr-2"
                                />
                                <p className="text-2xl font-medium text-black">
                                    Volver al inicio
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </LayoutMain>
    );
}
