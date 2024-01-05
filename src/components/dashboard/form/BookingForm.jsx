import { useState } from "react";
import BtnSubmit from "./BtnSubmit";
import Preload from "../PreloadSmall";

export default function BookingForm({ booking }) {
  const [status, setStatus] = useState(false);
  const [inputs, setInputs] = useState({
    checkin: booking?.checkin || "",
    checkout: booking?.checkout || "",
    email: booking?.profiles?.email || "",
    full_name: booking?.profiles?.full_name || "",
    name: booking?.rooms?.name || "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setStatus(true);
  };

  return (
    <div className={status ? "" : ""}>
      <Preload loading={status} />
      <form onSubmit={submitHandler}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full">
            <label
              htmlFor="name"
              className="mb-3 block text-sm font-medium text-black"
            >
              Cabaña
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
              type="text"
              name="name"
              id="name"
              value={inputs.name}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="checkin"
              className="mb-3 block text-sm font-medium text-black"
            >
              Check-In
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
              type="date"
              name="checkin"
              id="checkin"
              onChange={changeHandler}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="checkout"
              className="mb-3 block text-sm font-medium text-black"
            >
              Check-Out
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
              type="date"
              name="checkout"
              id="checkout"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="mb-5.5">
          <label
            htmlFor="email"
            className="mb-3 block text-sm font-medium text-black"
          >
            E-mail
          </label>

          <input
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
            type="email"
            name="email"
            id="email"
            value={inputs.email}
            onChange={changeHandler}
          />
        </div>

        <div className="mb-5.5">
          <label
            htmlFor="full_name"
            className="mb-3 block text-sm font-medium text-black"
          >
            Nombre
          </label>

          <input
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
            type="text"
            name="full_name"
            id="full_name"
            value={inputs.full_name}
            onChange={changeHandler}
          />
        </div>
        <BtnSubmit cancel_url="/admin/booking" />
      </form>
    </div>
  );
}
