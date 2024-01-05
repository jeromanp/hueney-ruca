import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BtnSubmit from "./BtnSubmit";
import Preload from "../PreloadSmall";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';

export default function ReviewForm({ review }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState(false);
  const [form, setForm] = useState({
    review: review?.review || "",
    stars: review?.stars || 1,
    approved: review?.approved || false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((response) => {
        setProfiles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getUserName = () => {
    const prof = profiles.filter((profile) => profile.id === review.user_id);
    return prof[0].full_name ? prof[0].full_name : '-';
  };

  const getUserEmail = () => {
    const prof = profiles.filter((profile) => profile.id === review.user_id);
    return prof[0].email ? prof[0].email : '-';
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Validaciones de inputs
    let error = null;

    switch (name) {
      case "review":
        if (value.length > 280) {
          error = "El comentario debe tener como máximo 280 caracteres";
        }
        break;
      case "stars":
        if (value) {
          value = parseInt(value);
        }
        break;
      case "approved":
        if (value === 'true') value = Boolean(value);
        else value = false;
        break;

      default:
        break;
    }

    // Actualizar el estado de los inputs y los errores
    setForm({
      ...form,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== null)) {
      // Si hay un error, se evita hacer el submit y tira un alert vintage
      Swal.fire('Debes correjir los errores', '', 'warning');
      return;
    }
    setStatus(true);
    if (review?.id) {
      // actualizar
      const username = review.profiles.username;
      const usermail = review.profiles.email;
      axios
        .put(`/api/comments/${review.id}`, form)
        .then((res) => {
          // envío de mail al usuario
          emailjs.send(
            process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_GENERIC,
            {
              user_name: username ? username : '',
              user_email: usermail,
              message: `Hola${username ? ` ${username}` : ''}, queriamos avisarte que hemos revisado tu comentario! 
                Si fue aprobado, podras verlo en https://hueney-ruca-henry.vercel.app/comentarios.
                Gracias por darte el tiempo!`,
            },
            process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
          )
          Swal.fire('Yuju!', 'Actualizamos exitosamente este comentario', 'success')
          router.push("/admin/reviews");
        })
        .catch((err) => {
          console.log("Error", err)
          Swal.fire('Ohoh :(', 'Hubo un error al actualizar el comentario, intenta más tarde', 'error')
          setStatus(false);
        });
    } else {
      // crear
      axios
        .post(`/api/comments/`, form)
        .then((res) => {
          Swal.fire('Whoa!', 'Este comentario ya está listo', 'success');
          router.push("/admin/reviews");
        })
        .catch((err) => {
          console.log("Error", err)
          Swal.fire('Ohoh :(', 'Hubo un error al crear el comentario, intenta más tarde', 'error')
          setStatus(false);
        });
    }
  };

  return (
    <div className={status ? "" : ""}>
      <Preload loading={status} />
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="username"
              className="mb-3 block text-sm font-medium text-black"
            >
              Nombre
            </label>
            <div className="relative">
              {review ? <h1>{loading ? "" : getUserName()}</h1> : ""}
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="email"
              className="mb-3 block text-sm font-medium text-black"
            >
              E-mail
            </label>
            {review ? <h1>{loading ? "" : getUserEmail()}</h1> : ""}
          </div>
        </div>

        <div className="flex gap-x-6 items-center my-6">
          <label className="block text-sm font-medium text-black">
            Estrellas
          </label>

          <div x-data="{ checkboxToggle: '' }" className="flex gap-x-5">
            {[...Array(5)].map((_, i) => (
              <label
                key={i}
                className="cursor-pointer select-none relative 
                inline-flex items-center gap-x-2"
              >
                <input
                  type="radio"
                  name="stars"
                  value={i + 1}
                  className="hidden"
                  onChange={handleChange}
                />

                <span className={
                  form.stars == i + 1
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
                  {form.stars == i + 1 ? (
                    <span className="bg-primary w-2.5 h-2.5 block rounded-full" />
                  ) : null}
                </span>
                <span className="font-semibold">
                  {i + 1}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-5.5">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="review"
          >
            Comentario
          </label>
          <div className="relative">
            <textarea
              className="w-full rounded border border-stroke bg-gray py-3 pl-4.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none resize-none"
              name="review"
              id="review"
              rows="6"
              placeholder="Escribe tu comentario aquí"
              value={form.review}
              onChange={handleChange}
              required
            ></textarea>
            {errors.review && <div className="error">{errors.review}</div>}
          </div>
        </div>

        <div className="flex gap-x-6 items-center my-6">
          <label className="block text-sm font-medium text-black">
            Aprobado
          </label>

          <div x-data="{ checkboxToggle: '' }" className="flex gap-x-5">
            {[true, false].map((approved, i) => (
              <label
                key={i}
                className="cursor-pointer select-none relative 
                inline-flex items-center gap-x-2"
              >
                <input
                  type="radio"
                  name="approved"
                  value={approved}
                  className="hidden"
                  onChange={handleChange}
                />

                <span className={
                  form.approved == approved
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
                  {form.approved == approved ? (
                    <span className="bg-primary w-2.5 h-2.5 block rounded-full" />
                  ) : null}
                </span>
                <span className="font-semibold">
                  {approved === true ? 'SI' : 'NO'}
                </span>
              </label>
            ))}
          </div>
        </div>
        <BtnSubmit cancel_url="/admin/reviews" />
      </form>
    </div>
  );
}
