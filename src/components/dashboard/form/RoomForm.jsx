import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Services from "../../../helpers/services";
import BtnSubmit from "./BtnSubmit";
import Preload from "../PreloadSmall";
import axios from "axios";
import Swal from "sweetalert2";
import CabinBuckets from "components/CabinBuckets";
import CabinGallery from "components/CabinGallery";
import manageCabin from "../manageCabin";

export default function RoomForm({ room }) {
  const types = ["A", "B", "C"];
  const [errors, setErrors] = useState({});
  const [rooms, setRooms] = useState(); 
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [form, setForm] = useState({
    name: room?.name || "", // `Cabaña #${ Date.now() }`,
    type: room?.type || "A",
    rooms: room?.rooms || 1,
    capacity: room?.capacity || 1,
    beds: room?.beds || 1,
    bathrooms: room?.bathrooms || 1,
    price: room?.price || 1000,
    services: room?.services || [],
    description: room?.description || "", //'Bienvenido a este hermoso refugio en medio de la naturaleza. Un lugar magnífico para disfrutar de unas relajantes vacaciones en familia o para una escapada de fin de semana con amigos. Aquí podrás desconectar del mundo y sumergirte en un ambiente de confort y tranquilidad. Con amplias habitaciones, acogedoras áreas comunes y una hermosa vista al bosque, esta cabaña es el lugar perfecto para disfrutar de momentos inolvidables con tus seres queridos. ¡Te esperamos!',
  });

  const router = useRouter();
  const [userServices, setUserServices] = useState({ ...Services });

  const services = Object.keys(userServices).map((service) =>
    service.replaceAll("_", " ")
  );
  const [status, setStatus] = useState(false);

  useEffect(() => {
    axios
      .get("/api/cabanas")
      .then((resp) => {
        setRooms(resp.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (services.includes(name)) {
      const serviceName = name.replaceAll(" ", "_");
      setUserServices({
        ...userServices,
        [serviceName]: !userServices[serviceName],
      });
    } else {
      // Validaciones de inputs
      let error = null;

      switch (name) {
        case "name":
          if (value.length > 32) {
            error = "El nombre debe tener como máximo 32 caracteres";
          }
          // const findRoomName = rooms.find((room) => room.name === value);
          // if (findRoomName) {
          //   error = "El nombre de la cabana ya esta en uso";
          // }
          break;
        case "rooms":
          if (value > 10) {
            error = "El total de habitaciones no debe exceder de 10";
          }
          break;
        case "capacity":
          if (value > 10) {
            error = "La capacidad maxima no debe exceder de 10";
          }
          break;
        case "beds":
          if (value > 10) {
            error = "El total de camas no debe exceder de 10";
          }
          break;
        case "bathrooms":
          if (value > 10) {
            error = "El total de baños no debe exceder de 10";
          }
          break;
        case "price":
          if (value <= 100) {
            error = "El precio no puede ser menor a 100";
          }
          break;
        case "description":
          if (value > 500) {
            error = "La descripcion no debe exceder de 500 caracteres";
          }
          break;

        default:
          break;
      }

      setForm({
        ...form,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleServices = (e) => {
    const { value } = e.target;
    const services = form.services;

    if (services.indexOf(value) < 0) {
      services.push(value);
    } else {
      const idx = services.indexOf(value);
      services.splice(idx, 1);
    }

    setForm({ ...form, services: services });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== null)) {
      Swal.fire("Debes correjir los errores", "", "warning");
      return;
    }

    setStatus(true);
    if (room?.id) {
      manageCabin(form, selectedFiles, room.id)
        .then((resp) => {
          // console.log(resp.data)
          Swal.fire("Yuju!", "Actualizamos exitosamente tu cabaña", "success");
          router.push("/admin/rooms");
        })
        .catch((err) => {
          console.log("Error", err);
          Swal.fire(
            "Ohoh :(",
            "Hubo un error al actualizar tu cabaña, intenta más tarde",
            "error"
          );
          setStatus(false);
        });
    } else {
      manageCabin(form, selectedFiles)
        .then((data) => {
          Swal.fire("Whoa!", "Tu nueva cabaña ya está lista", "success");
          router.push("/admin/rooms");
        })
        .catch((err) => {
          console.log("Error", err);
          Swal.fire(
            "Ohoh :(",
            "Hubo un error al crear tu cabaña, intenta más tarde",
            "error"
          );
          setStatus(false);
        });
    }
  };

  const [mostrarGallery, setMostrarGallery] = useState(false);
  const buttonTextGallery = mostrarGallery
    ? `Ocultar imágenes de ${room?.name}`
    : `Mostrar imágenes de ${room?.name}`;

  const [mostrarBucket, setMostrarBucket] = useState(false);
  const buttonTextBucket = mostrarBucket
    ? "No agregar imágenes"
    : "Agregar imágenes";

  return (
    <div className={status ? "" : ""}>
      <div className="font-poppins grid grid-cols-5 gap-8">
        <Preload loading={status} />

        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <form onSubmit={submitHandler} className="p-7">
              <div className="grid gap-y-6">
                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Nombre
                  </label>

                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={changeHandler}
                    required
                  />
                  {errors.name && <div className="error">{errors.name}</div>}
                </div>

                <div className="flex gap-x-8 items-center">
                  <label className="block text-sm font-medium text-black">
                    Tipo
                  </label>

                  {types.map((type, i) => (
                    <label
                      key={`tipo-${i}`}
                      className="cursor-pointer select-none relative 
															inline-flex items-center gap-x-2"
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        className="hidden"
                        onChange={changeHandler}
                      />

                      <span
                        className={
                          form.type == type
                            ? `border border-primary h-5 w-5 
													grid place-content-center rounded-full 
													cursor-pointer 
													checked:bg-slate-400`
                            : `border border-slate-400 h-5 w-5 
													grid place-content-center rounded-full 
													cursor-pointer 
													checked:bg-slate-500`
                        }
                      >
                        {form.type == type ? (
                          <span className="bg-primary w-2.5 h-2.5 block rounded-full" />
                        ) : null}
                      </span>
                      <span className="font-semibold">{type}</span>
                    </label>
                  ))}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="">
                    <label
                      htmlFor="rooms"
                      className="mb-3 block text-sm font-medium text-black"
                    >
                      Habitaciones
                    </label>

                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
                      type="number"
                      name="rooms"
                      id="rooms"
                      value={form.rooms}
                      onChange={changeHandler}
                      required
                    />
                    {errors.rooms && (
                      <div className="error">{errors.rooms}</div>
                    )}
                  </div>

                  <div className="">
                    <label
                      htmlFor="capacity"
                      className="mb-3 block text-sm font-medium text-black"
                    >
                      Capacidad (personas)
                    </label>

                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
                      type="number"
                      name="capacity"
                      id="capacity"
                      value={form.capacity}
                      onChange={changeHandler}
                      required
                    />
                    {errors.capacity && (
                      <div className="error">{errors.capacity}</div>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="">
                    <label
                      htmlFor="beds"
                      className="mb-3 block text-sm font-medium text-black"
                    >
                      Camas
                    </label>

                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
                      type="number"
                      name="beds"
                      id="beds"
                      value={form.beds}
                      onChange={changeHandler}
                      required
                    />
                    {errors.beds && <div className="error">{errors.beds}</div>}
                  </div>

                  <div className="">
                    <label
                      htmlFor="bathrooms"
                      className="mb-3 block text-sm font-medium text-black"
                    >
                      Baños
                    </label>

                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
                      type="number"
                      name="bathrooms"
                      id="bathrooms"
                      value={form.bathrooms}
                      onChange={changeHandler}
                      required
                    />
                    {errors.bathrooms && (
                      <div className="error">{errors.bathrooms}</div>
                    )}
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="price"
                    className="mb-3 block text-sm font-medium text-black"
                  >
                    Precio
                  </label>

                  <div className="relative">
                    <span className="opacity-70 text-xl leading-none left-4 top-3.5 absolute">
                      $
                    </span>

                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-8 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
                      type="number"
                      name="price"
                      id="price"
                      value={form.price}
                      onChange={changeHandler}
                      required
                    />
                    {errors.price && (
                      <div className="error">{errors.price}</div>
                    )}
                  </div>
                </div>

                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Servicios
                  </label>

                  <div className="grid grid-cols-2 gap-y-1.5">
                    {services.map((service, i) => (
                      <div key={`service-${i}`}>
                        <label
                          key={`service-${i}`}
                          className="font-medium flex gap-x-0.5 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name={service}
                            if={service}
                            value={service}
                            className="hidden"
                            onChange={handleServices}
                          />

                          <div className="relative">
                            <div
                              className={
                                form.services.indexOf(service) >= 0
                                  ? "bg-primary border-primary mr-4 flex h-5 w-5 items-center justify-center rounded border"
                                  : "mr-4 flex h-5 w-5 items-center justify-center rounded border"
                              }
                            >
                              {form.services.indexOf(service) >= 0 ? (
                                <span>
                                  <svg
                                    width="11"
                                    height="8"
                                    viewBox="0 0 11 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                      className="fill-white stroke-white"
                                      strokeWidth="0.4"
                                    ></path>
                                  </svg>
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <span className="text-black text-sm leading-none pt-1 font-medium">
                            {service}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Descripción
                  </label>

                  <textarea
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 
														font-medium text-black resize-none 
														focus:border-primary focus-visible:outline-none"
                    name="description"
                    id="description"
                    rows="6"
                    value={form.description}
                    onChange={changeHandler}
                    required
                  ></textarea>
                  {errors.description && (
                    <div className="error">{errors.description}</div>
                  )}
                </div>

                <BtnSubmit cancel_url="/admin/rooms" />
              </div>
            </form>
          </div>
        </div>

        {/* NOTA: Falta implementar el file upload */}
        <div className="col-span-5 xl:col-span-2">
          <div>
            {/* <button
              onClick={() => setMostrarBucket(!mostrarBucket)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded"
              >
              {buttonTextBucket}
            </button> */}
            {/* {mostrarBucket && ( */}
            <CabinBuckets
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            className="mt-4" />
            {/* )} */}
          </div>

          <div className="flex flex-col w-2/3 items-center m-auto my-2">
            {/* <button
              onClick={() => setMostrarGallery(!mostrarGallery)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {buttonTextGallery}
            </button>
            {mostrarGallery && (
              <CabinGallery type={room?.type} name={room?.name} className="" />
            )} */}
            <CabinGallery id={room?.id} className="mt-4" />
          </div>

          {/* <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="p-7">
               <form action="#">
                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                          fill="#3C50E0"
                        />
                      </svg>
                    </span>
                    <p className="font-medium text-sm">
                      <span className="text-primary">Haz click aquí</span>o
                      arrástra una foto aquí
                    </p>
                    <p className="mt-1.5 font-medium text-sm">
                      JPG, PNG o WEBP
                    </p>
                    <p className="font-medium text-sm opacity-60">
                      - medidas máximas: 800 x 800px -
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </form> 
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
