import React, { useEffect, useState } from "react";

export default function FilterBarCabanas({
    rooms,
    allBookings,
    resultBookings,
    setResultBookings,
}) {
    const [filterBookings, setFilterBookings] = useState([]);
    //const [orderedBookings, setOrderedBookings] = useState([]);
    const [cabana, setCabana] = useState("none");
    const [date, setDate] = useState("none");
    const [priority, setPriority] = useState(1);

    useEffect(() => {
        setFilterBookings(allBookings);
    }, [allBookings]);

    useEffect(() => {
        if (cabana === "none") {
            setFilterBookings(allBookings);
        } else {
            const c = [...allBookings];
            setFilterBookings(c.filter((el) => el.room_id === cabana));
        }
    }, [cabana]);
    useEffect(() => {
        if (date === "none") {
            setResultBookings(filterBookings);
        } else if (date === "fecha") {
            let c = [...filterBookings];
            c.sort((a, b) => {
                return (
                    (new Date(a.created_at) - new Date(b.created_at)) * priority
                );
            });
            setResultBookings(c);
        } else if (date === "checkin") {
            let c = [...filterBookings];
            c.sort((a, b) => {
                return (new Date(a.checkin) - new Date(b.checkin)) * priority;
            });
            setResultBookings(c);
        }
    }, [filterBookings, date, priority]);

    const filterCabanaHandler = (e) => {
        setCabana(e.target.value);
    };

    const sortDateHandler = (e) => {
        setDate(e.target.value);
    };
    const priorityHandler = (e) => {
        if (e.target.value === "asc") {
            setPriority(1);
        } else if (e.target.value === "desc") {
            setPriority(-1);
        }
    };

    return (
        <div className="bg-gray-2 flex flex-row mb-2">
            <div className="py-4 px-4">
                <label htmlFor="cabanaFilter">Cabaña: </label>
                <select
                    name="cabanaFilter"
                    id="cabanaFilter"
                    onChange={filterCabanaHandler}
                >
                    <option value="none">Todas</option>
                    {rooms.map((room) => (
                        <option
                            value={room.id}
                            key={`roomid-${room.id}-selectid`}
                        >
                            {room.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="py-4 px-4">
                <label htmlFor="orderSort">Orden: </label>
                <select
                    name="orderSort"
                    id="orderSort"
                    onChange={sortDateHandler}
                >
                    <option value="none">Ninguno</option>
                    <option value="fecha">Fecha de inscripción</option>
                    <option value="checkin">Check-in</option>
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
