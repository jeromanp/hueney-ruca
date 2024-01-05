import { useState, useEffect } from "react";
import Spinner from "./Spinner";

export default function GuestsSelector(props) {
    const [show, setShow] = useState(false);
    const [guests, setGuests] = useState(2);

    useEffect(() => {
        props.filterSetter({
            ...props.filters,
            guests,
        });
    }, [guests]);

    const popup_class = `bg-white inset-x-0 absolute bottom-${
        props.bottom ?? 0
    } rounded-t-lg`;

    return (
        <div className="w-full relative">
            <div
                className="text-gray-400 text-sm flex items-center 
									px-3 py-1.5 gap-x-1 cursor-pointer select-none"
                onClick={() => setShow(true)}
            >
                <i className="ri-user-fill text-lg"></i>
                <span className="">Huéspedes{`: ${guests}`}</span>
            </div>

            {show ? (
                <div
                    className={popup_class}
                    onMouseLeave={() => setShow(false)}
                >
                    <div className="p-3 flex justify-between items-center">
                        <div className="">Huespedes</div>
                        <div className="w-1/2">
                            <Spinner
                                defaultValue={guests}
                                setValue={(e) => {
                                    if (e <= 6) setGuests(e)
                                }}

                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
