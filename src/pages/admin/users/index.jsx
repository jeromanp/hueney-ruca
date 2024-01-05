import Layout from "../../../layouts/DashboardLayout";
import Header from "../../../components/dashboard/PageHeader";
import TableHead from "../../../components/dashboard/tables/TableHead";
import Link from "next/link";
import axios from "axios";
import swalAction from "components/dashboard/swalAction";
import dayjs from "dayjs";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import Swal from "sweetalert2";
import FilterBarUsers from "components/FilterBarUsers";
import Pagination from "components/Pagination";
import { getProfileInfoId } from "helpers/dbHelpers";


const table_head = [
    { idx: "name", title: "Nombre", width: "min-w-[220px]" },
    { idx: "role", title: "Rol", width: "min-w-[50px]" },
    { idx: "total", title: "Total reservas", width: "min-w-[150px]" },
    { idx: "date", title: "Fecha último check-out", width: "min-w-[120px]" },
    { idx: "actions", title: "Acciones" },
];

export default function Dashboard() {
    const session = useSession();
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState({});
    const [usersFiltered, setUsersFiltered] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    useEffect(() => {
        axios
            .get("/api/profile")
            .then((response) => {
                setUsers(response.data);
                setUsersFiltered(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("/api/booking")
            .then((response) => {
                setBookings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        if (session) (async () => {
            setAdmin(await getProfileInfoId(session.user.id))
        })()
    }, [session]);

    const totalBookings = (id) => {
        const counter = bookings.filter(
            (booking) => booking.user_id === id
        ).length;
        return counter;
    };

    const lastBooking = (id) => {
        const filteredBookings = bookings.filter(
            (booking) => booking.user_id === id
        );
        if (filteredBookings.length >= 1) {
            const lastCheckOut =
                filteredBookings[filteredBookings.length - 1].checkout;
            return dayjs(lastCheckOut).format("DD MMM, YYYY");
        } else {
            return "no hay registros";
        }
    };

    const deleteHandler = async (user) => {
        const { id, suspended } = user;
        const response = await swalAction(
            "usuario",
            id,
            setUsers,
            users,
            "profile",
            suspended
        );

        if (response.realizado) {
            const user = (await axios(`/api/profile/${id}`)).data;
            const username = user.username ? user.username : user.full_name;
            const usermail = user.email;
            // Ni los caruseles dan tantas vueltas:
            const accion = response.result ? suspended ?
                'habilitado nuevamente' : 'suspendido indefinidamente'
                : 'eliminado permanentemente';

            emailjs.send(
                process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_GENERIC,
                {
                    user_name: username,
                    user_email: usermail,
                    message: `Hola${username ? ` ${username}` : ""
                        }, queremos informarte que hemos tomado acciones
          con tu usuario, ahora estas ${accion}.`,
                },
                process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
            );
        }
    };

    const roleChange = async (targetId, targetRole) => {
        if (targetRole === 3) {
            Swal.fire("Simio no mata simio", "", "warning");
            return;
            // Jaja, te la rifaste Fernando
        }
        fetch(`/api/admin/users/${targetId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prevRole: targetRole,
                adminRoleSessionId: session.user.id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const user = data.data[0];
                Swal.fire(
                    "Nice!",
                    `Hemos actalizado a ${user.full_name || user.email
                    }, ahora es un ${user.role === 2 ? "administrador" : "usuario"
                    }.`,
                    "success"
                );
                const objective = users.find(
                    (userMap) => userMap.id === user.id
                );
                const otherUsers = users.filter(
                    (userMap) => userMap.id !== user.id
                );
                objective.role = user.role;
                setUsers([objective, ...otherUsers]);
            })
            .catch((err) => {
                console.log(err);
                Swal.fire(
                    "Ohoh...",
                    "Algo salió mal, intenta más tarde",
                    "error"
                );
            });
    };

    return (
        <Layout>
            <Header
                title="Huéspedes"
                breadcrumbs={
                    <>
                        <li>/</li>
                        <li className="text-primary">Huéspedes</li>
                    </>
                }
            >
                <Link
                    href="/admin/users/create"
                    className="inline-flex items-center justify-center rounded-md bg-primary bg-opacity-70 py-1.5 px-4 text-sm text-center font-medium text-white hover:bg-opacity-90"
                >
                    Nuevo huésped
                </Link>
            </Header>

            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default  sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <FilterBarUsers
                            allUsers={users}
                            resultUsers={usersFiltered}
                            setResultUsers={setUsersFiltered}
                            bookings={bookings}
                        />
                        <table className="w-full table-auto">
                            <TableHead data={table_head} />

                            <tbody>
                                {displayedUsers instanceof Array &&
                                    displayedUsers.map((user, i) => {
                                        const bg = user.deleted_at ? 'bg-slate-200' : '';
                                        return <tr key={i} className={`${bg}`}>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${i < user.length - 1
                                                        ? "border-b"
                                                        : ""
                                                    }`}
                                            >
                                                <h5 className="text-black text-sm font-semibold capitalize">
                                                    {user.name
                                                        ? user.name
                                                        : user.full_name}
                                                </h5>
                                                <p className="text-xs">
                                                    {user.email}
                                                </p>
                                            </td>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${i < user.length - 1
                                                        ? "border-b"
                                                        : ""
                                                    }`}
                                            >
                                                {/* EL ROL DEL USUARIO */}
                                                <h5
                                                    className={`text-black text-sm font-semibold capitalize p-2 inline
                                                    ${user.role < 3 && admin.role > 2
                                                            ? `hover:bg-black hover:text-white transition-colors
                                                    hover:cursor-pointer`
                                                            : null
                                                        }`}
                                                    onClick={() => {
                                                        if (admin.role > 2) {
                                                            roleChange(
                                                                user.id,
                                                                user.role
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {user.role === 3
                                                        ? "SuperAdmin"
                                                        : user.role === 2
                                                            ? "Admin"
                                                            : "User"}
                                                </h5>
                                            </td>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${i < user.length - 1
                                                        ? "border-b"
                                                        : ""
                                                    }`}
                                            >
                                                <p className="text-sm font-medium">
                                                    {totalBookings(user.id)}
                                                </p>
                                            </td>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${i < user.length - 1
                                                        ? "border-b"
                                                        : ""
                                                    }`}
                                            >
                                                <p className="text-sm font-medium">
                                                    {lastBooking(user.id)}
                                                </p>
                                            </td>
                                            <td
                                                className={`border-[#eee] py-5 px-4 ${i < user.length - 1
                                                        ? "border-b"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3.5">
                                                    <Link
                                                        className="hover:text-primary"
                                                        href={`/admin/users/${user.id}`}
                                                    >
                                                        <i className="ri-edit-line text-xl leading-none"></i>
                                                    </Link>
                                                    <button
                                                        className="hover:text-primary ri-close-circle-line text-xl leading-none"
                                                        onClick={() => deleteHandler(user)}
                                                    ></button>
                                                    <p className="text-xs">
                                                        {user.suspended ? (
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
                                usersFiltered instanceof Array
                                    ? usersFiltered
                                    : []
                            }
                            displayedAmount={8}
                            setDisplayedItems={setDisplayedUsers}
                        />
                    </div>
                </div>
            </div>

            <div className="h-20"></div>
        </Layout>
    );
}
