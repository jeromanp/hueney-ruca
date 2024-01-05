import React, { useEffect, useState } from "react";

const totalBookings = (id, allBookings) => {
    const counter = allBookings.filter(
        (booking) => booking.room_id === id
    ).length;
    return counter;
};

export default function FilterBarCabanasReal({
    allCabanas,
    resultCabanas,
    setResultCabanas,
    bookings,
}) {
    const [type, setType] = useState("none");
    const [estado, setEstado] = useState("none");
    const [sortOrder, setsortOrder] = useState("none");
    const [priority, setPriority] = useState(1);

    const [filterTypeCabanas, setFilterTypeCabanas] = useState([]);
    const [filterStateCabanas, setFilterStateCabanas] = useState([]);

    useEffect(() => {
        setFilterTypeCabanas(allCabanas);
        setFilterStateCabanas(allCabanas);
        setResultCabanas(allCabanas);
    }, []);

    useEffect(() => {
        if (type === "none") {
            setFilterTypeCabanas(allCabanas);
        } else if (type === "A") {
            let auxType = [...allCabanas];
            setFilterTypeCabanas(auxType.filter((e) => e.type === "A"));
        } else if (type === "B") {
            let auxType = [...allCabanas];
            setFilterTypeCabanas(auxType.filter((e) => e.type === "B"));
        } else if (type === "C") {
            let auxType = [...allCabanas];
            setFilterTypeCabanas(auxType.filter((e) => e.type === "C"));
        }
    }, [type, allCabanas]);
    useEffect(() => {
        if (estado === "none") {
            setFilterStateCabanas(filterTypeCabanas);
        } else if (estado === "habilitado") {
            let auxEstado = [...filterTypeCabanas];
            setFilterStateCabanas(
                auxEstado.filter((e) => e.suspended === false)
            );
        } else if (estado === "desabilitado") {
            let auxEstado = [...filterTypeCabanas];
            setFilterStateCabanas(
                auxEstado.filter((e) => e.suspended === true)
            );
        }
    }, [estado, filterTypeCabanas]);
    useEffect(() => {
        if (sortOrder === "none") {
            setResultCabanas(filterStateCabanas);
        } else if (sortOrder === "nombre") {
            let auxResult = [...filterStateCabanas];
            auxResult.sort(function (a, b) {
                return a.name.localeCompare(b.name) * priority;
            });
            setResultCabanas(auxResult);
        } else if (sortOrder === "date") {
            let auxResult = [...filterStateCabanas];
            auxResult.sort(function (a, b) {
                return (
                    (new Date(a.created_at) - new Date(b.created_at)) * priority
                );
            });
            setResultCabanas(auxResult);
        } else if (sortOrder === "reservas") {
            let auxResult = [...filterStateCabanas];
            auxResult.sort(function (a, b) {
                return (
                    (totalBookings(a.id, bookings) -
                        totalBookings(b.id, bookings)) *
                    priority
                );
            });
            setResultCabanas(auxResult);
        }
    }, [filterStateCabanas, sortOrder, priority]);

    const typeHandler = (e) => {
        setType(e.target.value);
    };
    const sortOrderHandler = (e) => {
        setsortOrder(e.target.value);
    };
    const priorityHandler = (e) => {
        if (e.target.value === "asc") {
            setPriority(1);
        } else if (e.target.value === "desc") {
            setPriority(-1);
        }
    };
    const estadoHandler = (e) => {
        setEstado(e.target.value);
    };
    return (
        <div className="bg-gray-2 flex flex-row mb-2">
            <div className="py-4 px-4">
                <label htmlFor="cabanaType">Tipo: </label>
                <select
                    name="cabanaType"
                    id="cabanaType"
                    onChange={typeHandler}
                >
                    <option value="none">Todas</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div className="py-4 px-4">
                <label htmlFor="cabanaEstado">Estado: </label>
                <select
                    name="cabanaEstado"
                    id="cabanaEstado"
                    onChange={estadoHandler}
                >
                    <option value="none">Todas</option>
                    <option value="habilitado">Habilitadas</option>
                    <option value="desabilitado">Deshabilitadas</option>
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
