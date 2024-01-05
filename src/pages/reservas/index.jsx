import axios from "axios";
import dayjs from "dayjs";
import Layout from "layouts/Layout";
import Link from "next/link";
import Login from "pages/login";
import Opinion from "components/Opinion.jsx";
import emailjs from '@emailjs/browser';
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { getProfileInfoId } from "helpers/dbHelpers";
import Swal from "sweetalert2";

export default function Reservas() {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [toggle, setToggle] = useState(true);
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserBookings = async () => {
      if (session === undefined || session === null) {
        return;
      }
      const response = await axios(`/api/profile/${session.user.id}/bookings`);
      setIsLoading(true);
      setBookings(response.data.filter(booking => booking.deleted_at === null));
      setIsLoading(false);
      setUser(await getProfileInfoId(session.user.id))
    };
    getUserBookings();
  }, [session]);

  const sendEmail = async () => {
    setButtonDisabled(true);
    const username = user.username || user.full_name || user.email.slice(0, user.email.indexOf('@'));
    // envío de email, message es lo que va dentro de él
    emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_GENERIC,
      {
        user_name: username,
        user_email: user.email,
        message: `Hola ${username}, gracias por elegirnos para unas vacaciones! 
            Ya casi está todo listo, solo faltas vos! Junto a este mail
            te compartimos la información de la reserva que hiciste. Te esperamos!`,
      },
      process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
    )
      .then(response => {
        Swal.fire('Ya te enviamos un email con la información pedida', '', 'success')
        setButtonDisabled(false);
      })
      .catch(error => {
        Swal.fire('Hubo un error al enviarte los datos', 'Intenta de nuevo más tarde', 'error')
        setButtonDisabled(false);
      });
  }

  const handleDownload = (e) => {
    e.preventDefault();
    sendEmail();
  };

  return (
    <>
      {session ? (
        <Layout>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-6 border-b-6 border-brand-olive"></div>
            </div>
          ) : (
            <>
              {toggle ? (
                <article className="min-h-screen mb-6">
              <h1
                className="text-brand-green text-3xl font-bold 
			    leading-none text-center pt-14 pb-8 md:text-4xl md:leading-none"
              >
                Tus reservas
              </h1>
              {bookings.length > 0 ? (
                <ul className="w-10/12 md:w-3/4 m-auto md:max-h-[400px] overflow-y-auto">
                  {bookings.map((booking, i) => {
                    const cls =
                      i % 2 === 1 ? "bg-brand-cream" : "bg-brand-white";

                    const hasPassed =
                      dayjs(booking.checkout).format() <
                      dayjs(new Date()).format();
                    const commentPermit = [
                      hasPassed,
                      booking.payments,
                      !booking.suspended,
                    ].every(Boolean);
                    return (
                      <div key={i} className="p-1">
                        <li
                          className={`${cls} p-4 flex justify-between items-center border rounded-xl`}
                        >
                          <h2 className="text-brand-light-green font-semibold flex flex-col lg:flex-row">
                            <span>
                              {dayjs(booking.checkin).format("DD MMM, YYYY")}
                            </span>
                            <span className="hidden lg:block">-</span>
                            <span>
                              {dayjs(booking.checkout).format("DD MMM, YYYY")}
                            </span>
                          </h2>
                          <p className="font-semibold">{booking.rooms.name}</p>
                          <p className="hidden md:block">
                            Pagado: {booking.payments ? "✅" : "❌"}
                          </p>
                          <p className="hidden lg:block">
                            Suspendido: {booking.suspended ? "✅" : "❌"}
                          </p>
                          <div className="flex items-center">
                            <button
                              disabled={buttonDisabled}
                              onClick={handleDownload}
                              className="hover:text-primary ri-file-text-line text-xl leading-none"
                            ></button>
                            <Link
                              href={`/cabanas/${booking.rooms.id}`}
                              className={`btn-yellow ${hasPassed ? "mx-2" : "ml-2"
                                }`}
                            >
                              Ver cabaña
                            </Link>
                            {commentPermit ? (
                              <button
                                className="btn-yellow"
                                onClick={() => setToggle(false)}
                              >
                                ⭐
                              </button>
                            ) : null}
                          </div>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              ) : (
                <h1
                  className="text-brand-green text-3xl font-bold 
                                leading-none text-center pt-14 pb-8 md:text-4xl md:leading-none md:mb-60 mb-10"
                >
                  No tenés reservas hechas
                </h1>
              )}
            </article>
            ) : (
              <Opinion setToggle={setToggle} />
            )}
          </>
        )}
      </Layout>
    ) : (
      <Login />
    )}
    </> 
  );
}
