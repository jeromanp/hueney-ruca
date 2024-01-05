import React, { useEffect, useState } from "react";

const totalBookings = (id, allBookings) => {
    const counter = allBookings.filter(
        (booking) => booking.user_id === id
    ).length;
    return counter;
};

export default function FilterBarUsers({
    allUsers,
    resultUsers,
    setResultUsers,
    bookings,
}) {
    const [rol, setRol] = useState("none");
    const [estado, setEstado] = useState("none");
    const [sortOrder, setSortOrder] = useState("none");
    const [priority, setPriority] = useState(1);

    const [filterRolUsers, setFilterRolUsers] = useState("none");
    const [filterEstadoUsers, setFilterEstadoUsers] = useState("none");
    const [orderedUsers, setOrderedUsers] = useState("none");

    useEffect(() => {
        setFilterRolUsers(allUsers);
        setFilterEstadoUsers(allUsers);
        setResultUsers(allUsers);
        setOrderedUsers(allUsers);
    }, [allUsers]);

    useEffect(() => {
        if (rol === "none") {
            setFilterRolUsers(allUsers);
        } else if (rol === "1") {
            let rolAux = [...allUsers];
            setFilterRolUsers(rolAux.filter((el) => el.role === parseInt(rol)));
        } else if (rol === "2") {
            let rolAux = [...allUsers];
            setFilterRolUsers(rolAux.filter((el) => el.role === parseInt(rol)));
        } else if (rol === "3") {
            let rolAux = [...allUsers];
            setFilterRolUsers(rolAux.filter((el) => el.role === parseInt(rol)));
        }
    }, [rol]);
    useEffect(() => {
        if (estado === "none") {
            setFilterEstadoUsers(filterRolUsers);
        } else if (estado === "habilitados") {
            let estadoAux = [...filterRolUsers];
            setFilterEstadoUsers(
                estadoAux.filter((el) => {
                    return el.deleted_at === null && el.suspended === false;
                })
            );
        } else if (estado === "suspendidos") {
            let estadoAux = [...filterRolUsers];
            setFilterEstadoUsers(
                estadoAux.filter((el) => {
                    return el.suspended === true;
                })
            );
        } else if (estado === "eliminados") {
            let estadoAux = [...filterRolUsers];
            setFilterEstadoUsers(
                estadoAux.filter((el) => {
                    return el.deleted_at != null;
                })
            );
        }
    }, [filterRolUsers, estado]);
    useEffect(() => {
        if (sortOrder === "none") {
            setOrderedUsers(filterEstadoUsers);
        } else if (sortOrder === "nombre") {
            let auxsort = [...filterEstadoUsers];
            auxsort.sort(function (a, b) {
                return a.full_name.localeCompare(b.full_name) * priority;
            });
            setOrderedUsers(auxsort);
        } else if (sortOrder === "reservas") {
            let auxsort = [...filterEstadoUsers];
            auxsort.sort(function (a, b) {
                return (
                    (totalBookings(a.id, bookings) -
                        totalBookings(b.id, bookings)) *
                    priority
                );
            });
            setOrderedUsers(auxsort);
        } else if (sortOrder === "date") {
            let auxsort = [...filterEstadoUsers];
            auxsort.sort(function (a, b) {
                return (
                    (new Date(a.created_at) - new Date(b.created_at)) * priority
                );
            });
            setOrderedUsers(auxsort);
        }
    }, [filterEstadoUsers, sortOrder, priority]);

    useEffect(() => {
        setResultUsers(orderedUsers);
    }, [orderedUsers]);

    const priorityHandler = (e) => {
        if (e.target.value === "asc") {
            setPriority(1);
        } else if (e.target.value === "desc") {
            setPriority(-1);
        }
    };
    const filterRolHandler = (e) => {
        setRol(e.target.value);
    };
    const stateHandler = (e) => {
        setEstado(e.target.value);
    };
    const sortOrderHandler = (e) => {
        setSortOrder(e.target.value);
    };
    return (
        <div className="bg-gray-2 flex flex-row mb-2">
            <div className="py-4 px-4">
                <label htmlFor="rolFilter">Rol: </label>
                <select
                    name="rolFilter"
                    id="rolFilter"
                    onChange={filterRolHandler}
                >
                    <option value="none">Todos</option>
                    <option value="1">Usuarios</option>
                    <option value="2">Admins</option>
                    <option value="3">Super Admins</option>
                </select>
            </div>
            <div className="py-4 px-4">
                <label htmlFor="stateFilter">Estado: </label>
                <select
                    name="stateFilter"
                    id="stateFilter"
                    onChange={stateHandler}
                >
                    <option value="none">Todos</option>
                    <option value="habilitados">Habilitados</option>
                    <option value="suspendidos">Suspendidos</option>
                    <option value="eliminados">Eliminados</option>
                </select>
            </div>
            <div className="py-4 px-4">
                <label htmlFor="orderSort">Orden: </label>
                <select
                    name="orderSort"
                    id="orderSort"
                    onChange={sortOrderHandler}
                >
                    <option value="none">Ninguno</option>
                    <option value="nombre">Nombre</option>
                    <option value="reservas">Reservas</option>
                    <option value="date">Fecha de Alta</option>
                </select>
            </div>
            <div className="py-4 px-4">
                <select
                    name="priorityOrder"
                    id="priorityOrder"
                    onChange={priorityHandler}
                >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
        </div>
    );
}
