import { useState, useEffect } from "react";
import gsap from "gsap";
import Header from "../components/Header";

import Datepicker from "../components/form/Datepicker";
import GuestsSelector from "components/form/GuestsSelector";
import Link from "next/link";
import ChatBot from "components/chatBot/ChatBot";
import { addDays } from "helpers/dateProcessing";

export default function Home() {
    const [filters, setFilters] = useState({
        guests: 0,
        checkin: null,
        checkout: null,
    });

    const handleFilter = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const window_w = window.innerWidth;
        gsap.set("#headerMain", { opacity: 0 });
        gsap.set("#introText", { opacity: 0 });
        gsap.set("#searchForm", { opacity: 0 });
        gsap.set("#landing", { backgroundSize: "150%" });
        gsap.set("#whats-app-icon", { y: 100 });

        gsap.to("#loaderScreenLogo", {
            opacity: 0,
            scale: 0.6,
            duration: 1.5,
            delay: 1.5,
        });
        gsap.to("#loaderScreen", { opacity: 0, duration: 1.5, delay: 2 });
        gsap.set("#loaderScreen", { display: "none", delay: 2.5 });
        gsap.to("#landing", {
            backgroundSize: window_w <= 768 ? "auto 100%" : "100%",
            duration: 1.5,
            delay: 2,
        });
        gsap.set("#landing", { backgroundSize: "cover", delay: 3.5 });
        gsap.to("#headerMain", { opacity: 1, y: 0, duration: 0.7, delay: 2.2 });
        gsap.to("#introText", { opacity: 1, duration: 0.7, delay: 2.4 });
        gsap.to("#searchForm", { opacity: 1, duration: 0.7, delay: 2.6 });
        gsap.to("#whats-app-icon", { y: 0, duration: 0.3, delay: 3.6 });
    }, []);

    return (
        <div
            id="landing"
            className="w-screen h-screen relative overflow-hidden"
        >
            <div
                id="loaderScreen"
                className="bg-brand-olive fixed inset-0 grid place-content-center z-999"
            >
                <img
                    id="loaderScreenLogo"
                    src="/brand.svg"
                    alt="Hueney Ruca"
                    className="w-32 md:w-48"
                />
            </div>

            <Header background="transparent" />

            <div className="bg-black bg-opacity-20 h-screen px-6 grid grid-cols-1 place-content-center inset-0 absolute">
                <div className="max-w-sm mx-auto md:max-w-3xl">
                    <h2
                        id="introText"
                        className="text-white text-3xl font-bold leading-none select-none 
							sm:text-4xl 
							md:text-5xl md:leading-tight"
                    >
                        Disfrutá tus vacaciones en nuestro complejo de cabañas
                    </h2>

                    <div
                        id="searchForm"
                        className="bg-white w-full mt-8 rounded-lg md:mt-14"
                    >
                        <form
                            method="post"
                            onSubmit={handleFilter}
                            className="grid md:flex md:justify-stretched"
                        >
                            <div className="flex flex-1 items-center gap-x-2 md:basis-32">
                                <span className="text-gray-400 text-sm leading-none font-medium w-20 pl-4 md:hidden">
                                    Personas
                                </span>
                                <GuestsSelector
                                    bottom="10"
                                    filterSetter={setFilters}
                                    filters={filters}
                                />
                            </div>

                            <div className="border-gray-200 flex-1 flex items-center gap-x-1 md:border-l md:border-r md:basis-32 border-t border-b md:border-b-0 md:border-t-0">
                                <span className="text-gray-400 text-xs leading-none font-medium w-20 pl-4 md:hidden">
                                    Desde
                                </span>
                                <Datepicker
                                    minDate={new Date()}
                                    setDate={(e) =>
                                        setFilters({
                                            ...filters,
                                            checkin: new Date(e),
                                            checkout:
                                                new Date(e) >= filters.checkout
                                                    ? addDays(new Date(e), 1)
                                                    : filters.checkout,
                                        })
                                    }
                                    defaultDate={
                                        filters.checkin === null
                                            ? addDays(new Date(), 1)
                                            : filters.checkin
                                    }
                                />
                            </div>

                            <div
                                className="flex-1 
											flex items-center gap-x-1 
											"
                            >
                                <span className="text-gray-400 text-xs leading-none font-medium w-20 pl-4 md:hidden">
                                    Hasta
                                </span>
                                <Datepicker
                                    minDate={addDays(new Date(), 1)}
                                    defaultDate={
                                        filters.checkout === null
                                            ? addDays(new Date(), 2)
                                            : filters.checkout
                                    }
                                    setDate={(e) =>
                                        setFilters({
                                            ...filters,
                                            checkout: new Date(e),
                                        })
                                    }
                                />
                            </div>

                            <div className="px-4 py-2.5 flex-1 text-right">
                                <Link
                                    href={{
                                        pathname: "/search",
                                        query: {
                                            guests: filters.guests,
                                            checkin:
                                                filters.checkin === null
                                                    ? undefined
                                                    : JSON.stringify(
                                                          filters.checkin
                                                      )
                                                          .split("T")[0]
                                                          .replace('"', ""),
                                            checkout:
                                                filters.checkout === null
                                                    ? undefined
                                                    : JSON.stringify(
                                                          filters.checkout
                                                      )
                                                          .split("T")[0]
                                                          .replace('"', ""),
                                        }, // the data
                                    }}
                                >
                                    <button className="btn-yellow w-full !rounded md:w-auto">
                                        Buscar
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ChatBot />
        </div>
    );
}
