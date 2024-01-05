import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import swalAction from "components/dashboard/swalAction";
import dayjs from "dayjs";
import emailjs from "@emailjs/browser";

import Layout from "../../../layouts/DashboardLayout";
import Header from "../../../components/dashboard/PageHeader";
import TableHead from "../../../components/dashboard/tables/TableHead";
import FilterBarCabanas from "components/FilterBarCabanas";
import Pagination from "components/Pagination";

const table_head = [
    { idx: "date", title: "Fecha", width: "min-w-[220px]" },
    { idx: "cabin", title: "Cabaña", width: "min-w-[150px]" },
    { idx: "check-in", title: "Check-in", width: "min-w-120px" },
    { idx: "check-out", title: "Check-out", width: "min-w-[120px]" },
    { idx: "actions", title: "Acciones" },
];

const guests = (adults, children) =>
    `${adults ? adults + " adultos" : ""}${
        children ? " / " + children + " niños" : ""
    }`;

export default function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [displayedBookings, setDisplayedBookings] = useState([]);

    useEffect(() => {
        axios
            .get("/api/booking")
            .then((response) => {
                setBookings(response.data);
                setFilteredBookings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("/api/cabanas")
            .then((response) => {
                setRooms(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleRoom = (id) => {
        const room = rooms.find((room) => room.id === id);
        return room.name;
    };

    const deleteHandler = async (booking) => {
        const { id, suspended } = booking;
        const response = await swalAction(
            "reserva",
            id,
            setBookings,
            bookings,
            "booking",
            suspended
        );

        if (response.realizado) {
            const user = (await axios(`/api/profile/${booking.user_id}`)).data;
            const username = user.username ? user.username : user.full_name;
            const usermail = user.email;
            const accion = response.result ? suspended ?
            'habilitado nuevamente' : 'suspendido indefinidamente'
            : 'eliminado permanentemente';
            emailjs.send(
                process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_GENERIC,
                {
                    user_name: username,
                    user_email: usermail,
                    message: `Hola${
                        username ? ` ${username}` : ""
                    }, nos urge informarte que hemos tomado acciones
          sobre la reserva que has hecho, ahora está ${accion}. Puedes ponerte en contacto con hueneyruca@gmail.com
          para más información.`,
                },
                process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
            );
        }
    };

    return (
        <Layout>
            <Header
                title="Reservas"
                breadcrumbs={
                    <>
                        <li>/</li>
                        <li className="text-primary">Reservas</li>
                    </>
                }
            >
                {/* <Link
          href="/admin/booking/create"
          className="inline-flex items-center justify-center rounded-md bg-primary bg-opacity-70 py-1.5 px-4 text-sm text-center font-medium text-white hover:bg-opacity-90"
        >
          Nueva reserva
        </Link> */}
            </Header>

            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default  sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <FilterBarCabanas
                            rooms={rooms}
                            allBookings={bookings}
                            resultBookings={filteredBookings}
                            setResultBookings={setFilteredBookings}
                        />
                        <table className="w-full table-auto">
                            <TableHead data={table_head} />

                            <tbody>
                                {displayedBookings &&
                                    displayedBookings.map((booking, i) => {
                                        const bg = booking.deleted_at ? 'bg-slate-200' : '';
                                        return <tr key={booking.id} className={`${bg}`}>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${
                                                    i <
                                                    displayedBookings.length - 1
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                <p className="text-sm font-medium">
                                                    {dayjs(
                                                        booking.created_at
                                                    ).format("DD MMM, YYYY")}
                                                </p>
                                            </td>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${
                                                    i <
                                                    displayedBookings.length - 1
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                <h5 className="text-slate-700 font-bold">
                                                    {loading
                                                        ? ""
                                                        : handleRoom(
                                                              booking.room_id
                                                          )}
                                                </h5>
                                                <p className="text-slate-500 text-xs font-medium">
                                                    {guests(
                                                        booking.adults,
                                                        booking.children
                                                    )}
                                                </p>
                                            </td>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${
                                                    i <
                                                    displayedBookings.length - 1
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                <p className="text-sm font-medium">
                                                    {dayjs(
                                                        booking.checkin
                                                    ).format("DD MMM, YYYY")}
                                                </p>
                                            </td>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${
                                                    i <
                                                    displayedBookings.length - 1
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                <p className="text-sm font-medium">
                                                    {dayjs(
                                                        booking.checkout
                                                    ).format("DD MMM, YYYY")}
                                                </p>
                                            </td>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${
                                                    i <
                                                    displayedBookings.length - 1
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3.5">
                                                    <Link
                                                        className="hover:text-primary"
                                                        href={`/admin/booking/${booking.id}`}
                                                    >
                                                        <i className="ri-file-text-line text-xl leading-none"></i>
                                                    </Link>
                                                    {/* <Link
                            className="hover:text-primary"
                            href={`/admin/booking/${booking.id}`}
                          >
                            <i className="ri-edit-line text-xl leading-none"></i>
                          </Link> */}
                                                    <button
                                                        onClick={() =>
                                                            deleteHandler(
                                                                booking
                                                            )
                                                        }
                                                        className="hover:text-primary ri-close-circle-line text-xl leading-none"
                                                    ></button>
                                                    <p className="text-xs">
                                                        {booking.suspended ? (
                                                            <i className="ri-checkbox-blank-circle-fill text-red-700 opacity-50"></i>
                                                        ) : (
                                                            <i className="ri-checkbox-blank-circle-fill text-green-500 opacity-50"></i>
                                                        )}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                        <Pagination
                            items={
                                filteredBookings instanceof Array
                                    ? filteredBookings
                                    : []
                            }
                            displayedAmount={8}
                            setDisplayedItems={setDisplayedBookings}
                        />
                    </div>
                </div>
            </div>

            <div className="h-20"></div>
        </Layout>
    );
}
