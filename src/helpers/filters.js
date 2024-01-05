import { checkOverlappingPeriods } from "./dateProcessing";
import { parseCapacityToArray } from "./parsers";

//Filtra de todas las cabanas aquellas que incluyan la capacidad requerida
export function filterRoomsByCapacity(rooms, requestCapacity) {
    const results = [];
    for (let i = 0; i < rooms.length; i++) {
        const roomCapacity = parseCapacityToArray(rooms[i].capacity);
        if (roomCapacity.includes(requestCapacity)) {
            results.push(rooms[i]);
        }
    }
    return results;
}

//Para una habitacion recorre todas las reservas y consulta que el periodo entre
//startDate y endDate no se superponga con ninguna reserva registrada
function checkIfARoomIsAvaibleInAPeriod(room, startDate, endDate) {
    for (let i = 0; i < room.booking.length; i++) {
        if (
            checkOverlappingPeriods(
                new Date(room.booking[i].checkin),
                new Date(room.booking[i].checkout),
                startDate,
                endDate
            )
        ) {
            return false;
        }
    }
    return true;
}

export function filterRoomsByDates(rooms, checkIn, checkOut) {
    let results = [];
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].booking.length === 0) {
            results.push(rooms[i]);
        } else {
            if (checkIfARoomIsAvaibleInAPeriod(rooms[i], startDate, endDate)) {
                results.push(rooms[i]);
            }
        }
    }
    return results;
}
