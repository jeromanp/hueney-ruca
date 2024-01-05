import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardCabin from "components/seeAllCabins/CardCabin";
import CardSkeleton from "components/seeAllCabins/CardSkeleton";
import Layout from "../layouts/Layout";
import Datepicker from "components/form/Datepicker";
import { addDays } from "helpers/dateProcessing";

Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
};

export default function Search() {
    const router = useRouter();
    const { guests, checkin, checkout } = router.query;
    const [filters, setFilters] = useState({
        capacity: 2,
        checkIn: null,
        checkOut: null,
    });

    useEffect(() => {
        const initRequest = async () => {
            if (guests !== undefined) {
                let aux = parseInt(guests);

                let url = "api/cabanas?capacity=" + aux;
                if (checkin !== "" && checkout !== "") {
                    url = url + "&checkin=" + checkin + "&checkout=" + checkout;
                }

                setFilters({
                    ...filters,
                    capacity: aux,
                    checkIn:
                        checkin === "" ? null : new Date(checkin).addHours(4),
                    checkOut:
                        checkout === "" ? null : new Date(checkout).addHours(4),
                });

                const response = await fetch(url);
                const data = await response.json();
                setRooms(data.filter((room) => room.deleted_at === null));
                setIsLoading(false);
            }
        };

        initRequest();
    }, [guests, checkin, checkout]);

    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const changeHandler = (e) => {
        setFilters({
            ...filters,
            capacity: parseInt(e.target.value),
        });
    };

    const searchHandler = async () => {
        let url = "api/cabanas";
        if (filters.capacity !== 0) {
            url = url + "?capacity=" + filters.capacity;
        }
        if ((filters.checkIn !== null) & (filters.checkOut !== null)) {
            url =
                url +
                "&checkin=" +
                filters.checkIn +
                "&checkout=" +
                filters.checkOut;
        }
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setIsLoading(false);
        setRooms(data.filter((room) => room.deleted_at === null));
    };

    return (
        <>
            <Layout>
                <div className="flex flex-col md:pb-8 xl:flex-row">
                    <section className="m-auto mt-6 md:p-14">
                        <div className="bg-brand-olive rounded-2xl p-8 w-96">
                            <h3 className="text-white text-2xl font-bold pb-6 pt-4">
                                Seleccionar fechas
                            </h3>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <label
                                        htmlFor="arrival-date"
                                        className="text-white block font-normal text-sm mb-1.5"
                                    >
                                        Llegada
                                    </label>
                                    <div className="p-0.5 w-full rounded-xl bg-white mb-3">
                                        <Datepicker
                                            minDate={new Date()}
                                            defaultDate={
                                                filters.checkIn === null
                                                    ? addDays(new Date(), 1)
                                                    : filters.checkIn
                                            }
                                            setDate={(e) => {
                                                setFilters({
                                                    ...filters,
                                                    checkIn: new Date(e),
                                                    checkOut:
                                                        new Date(e) >=
                                                        filters.checkOut
                                                            ? addDays(
                                                                  new Date(e),
                                                                  1
                                                              )
                                                            : filters.checkOut,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="departure-date"
                                        className="text-white block font-normal text-sm mb-1.5"
                                    >
                                        Hasta
                                    </label>
                                    <div className="p-0.5 w-full rounded-xl bg-white mb-3">
                                        <Datepicker
                                            minDate={addDays(new Date(), 1)}
                                            defaultDate={
                                                filters.checkOut === null
                                                    ? addDays(new Date(), 2)
                                                    : filters.checkOut
                                            }
                                            setDate={(e) => {
                                                setFilters({
                                                    ...filters,
                                                    checkOut: new Date(e),
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="guests"
                                        className="text-white block font-normal text-sm mb-1.5"
                                    >
                                        Cantidad de personas
                                    </label>
                                    <input
                                        type="number"
                                        id="guests"
                                        name="guests"
                                        min="1"
                                        max="10"
                                        className="text-blue-gray-700 p-3 w-full rounded-xl focus:outline-none"
                                        value={filters.capacity}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="mx-auto">
                                    <button
                                        onClick={searchHandler}
                                        className="bg-brand-yellow text-white rounded-md py-2 px-4 mt-6"
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div
                        id="reservas"
                        className="flex-grow m-auto pt-12 md:pr-12"
                    >
                        <h1 className="text-brand-green text-3xl font-semibold pb-2">
                            Cabañas disponibles
                        </h1>
                        <div
                            className="flex-grow overflow-y-auto h-98"
                            style={{ minHeight: "500px", maxHeight: "500px" }}
                        >
                            <div className="grid grid-cols-1 gap-2">
                                {isLoading ? (
                                    <>
                                        <CardSkeleton />
                                        <CardSkeleton />
                                        <CardSkeleton />
                                    </>
                                ) : (
                                    // ACA ESTARIA PARA CAMBIAR ESE ?? Por un operador ternario y mandar un mensaje de q no hay cabans disponibles

                                    rooms.map((room) => {
                                        return (
                                            <CardCabin
                                                key={`${room.id}-index`}
                                                cabin={room}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
