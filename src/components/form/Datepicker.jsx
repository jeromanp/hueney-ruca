import { useState, useEffect } from "react";
import TailwindDatepicker from "tailwind-datepicker-react";
import dayjs from "dayjs";
import { addDays } from "helpers/dateProcessing";

export default function Datepicker(props) {
    //Se Imprimen bien todas las fechas desabilitadas por ya estar reservadas pero no se refleja en el calendario
    //console.log(props.disabledDates);
    const options = {
        title: null,
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        maxDate: props.maxDate ?? new Date("2030-12-01"),
        minDate: props.minDate ?? new Date(),
        theme: {
            background: "!bg-white",
            todayBtn: "!bg-brand-olive",
            clearBtn: "",
            icons: "",
            text: "!text-gray-600 select-none hover:!bg-opacity-20 hover:!bg-brand-olive",
            disabledText: "opacity-40 !text-gray-300",
            input: "invisible absolute",
            inputIcon: "hidden",
            selected: "!bg-brand-olive !text-white",
        },
        icons: {
            prev: () => <i className="ri-arrow-left-line"></i>,
            next: () => <i className="ri-arrow-right-line"></i>,
        },
        datepickerClassNames: "datepicker-calendar !top-auto !bottom-[40px]",
        defaultDate: props.defaultDate ?? addDays(new Date(), 1),
        language: "es",
        disabledDates: props.disabledDates ?? [],
    };

    const [show, setShow] = useState(false);
    const [d, setD] = useState(new Date());

    const handleChange = (selectedDate) => {
        if (props.setDate) props.setDate(selectedDate);
        setD(selectedDate);
    };

    const handleClose = (state) => setShow(state);

    useEffect(() => {
        if (props.defaultDate) setD(props.defaultDate);
    }, [props]);

    return (
        <div className="w-full relative">
            <TailwindDatepicker
                options={options}
                onChange={handleChange}
                show={show}
                setShow={handleClose}
            />

            <div
                className="border border-transparent 
									text-gray-400 text-sm leading-none 
									whitespace-nowrap p-3 inset-0 flex 
									gap-x-2 items-center 
									cursor-pointer select-none
									rounded-lg"
                onClick={() => setShow(true)}
            >
                <div className="">
                    <i className="ri-calendar-event-fill text-xl leading-none"></i>
                </div>

                <div className="">{dayjs(d).format("D/MM/YYYY")}</div>
            </div>
        </div>
    );
}
