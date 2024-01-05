import { useRouter } from "next/router";
import { useState } from "react";
import BtnSubmit from "./BtnSubmit";
import Preload from "../PreloadSmall";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserForm({ user }) {
  const router = useRouter();
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    email: user?.email || "",
    username: user?.username || "",
    full_name: user?.full_name || "",
    country: user?.country || "",
    phone: user?.phone || 0,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    // Validaciones de inputs
    let error = null;
    switch (name) {
      case "email":
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(value)) {
          error =
            "Por favor ingrese una dirección de correo electrónico válida";
        }
        if (value.length > 96) {
          error = "El email debe tener como máximo 96 caracteres";
        }
        break;

      case "username":
        if (value.length > 64) {
          error = "El nombre de usuario debe tener como máximo 64 caracteres";
        }
        break;

      case "full_name":
        if (value.length > 96) {
          error = "El nombre completo debe tener como máximo 96 caracteres";
        }
        break;

      case "country":
        if (value.length > 64) {
          error = "El pais debe tener como máximo 64 caracteres";
        }
        break;

      case "phone":
        if (value.length > 15) {
          error = "El numero telefonico debe tener como máximo 15 caracteres";
        }
        break;

      default:
        break;
    }

    // Actualizar el estado de los inputs y los errores
    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== null)) {
      // Si hay un error, se evita hacer el submit y tira un alert vintage
      Swal.fire('Debes correjir los errores', '', 'warning');
      return;
    }
    setStatus(true);
    if (user?.id) {
      // actualizar
      axios
        .put(`/api/profile/${user.id}`, inputs)
        .then((res) => {
          Swal.fire('Yuju!', 'Actualizamos exitosamente este usuario', 'success')
          router.push("/admin/users");
        })
        .catch((err) => {
          console.log("Error", err)
          Swal.fire('Ohoh :(', 'Hubo un error al actualizar este usuario, intenta más tarde', 'error');
          setStatus(false);
        });
    } else {
      // crear
      axios
        .post(`/api/profile/`, inputs)
        .then((res) => {
          Swal.fire('Whoa!', 'Este usuario ya está listo', 'success');
          router.push("/admin/users");
        })
        .catch((err) => {
          console.log("Error", err)
          Swal.fire('Ohoh :(', 'Hubo un error al crear el usuario, intenta más tarde', 'error');
          setStatus(false);
        });
    }
  };

  return (
    <div className={status ? "" : ""}>
      <Preload loading={status} />
      <form onSubmit={submitHandler}>
        <div className="grid gap-y-6">
          <div className="">
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
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="">
            <label
              htmlFor="username"
              className="mb-3 block text-sm font-medium text-black"
            >
              Apodo
            </label>

            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
              type="text"
              name="username"
              id="username"
              value={inputs.username}
              onChange={changeHandler}
              required
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>

          <div className="">
            <div className="">
              <label
                htmlFor="full_name"
                className="mb-3 block text-sm font-medium text-black"
              >
                Nombre Completo
              </label>

              <input
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
                type="text"
                name="full_name"
                id="full_name"
                value={inputs.full_name}
                onChange={changeHandler}
                required
              />
              {errors.full_name && (
                <div className="error">{errors.full_name}</div>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="">
              <label
                htmlFor="country"
                className="mb-3 block text-sm font-medium text-black"
              >
                Pais
              </label>

              <input
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
                type="text"
                name="country"
                id="country"
                value={inputs.country}
                onChange={changeHandler}
                required
              />
              {errors.country && <div className="error">{errors.country}</div>}
            </div>

            <div className="">
              <label
                htmlFor="phone"
                className="mb-3 block text-sm font-medium text-black"
              >
                Telefono
              </label>

              <input
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none"
                type="number"
                name="phone"
                id="phone"
                value={inputs.phone}
                onChange={changeHandler}
                required
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>
          </div>
          <BtnSubmit cancel_url="/admin/users" />
        </div>
      </form>
    </div>
  );
}
