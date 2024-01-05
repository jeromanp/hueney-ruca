import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@supabase/auth-helpers-react";
import { getProfileInfoId } from "helpers/dbHelpers";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Swal from "sweetalert2";

export default function Header(props) {
  const session = useSession();
  const [navActive, setNavActive] = useState(false);
  const [navbarClassName, setNavbarClassName] = useState("");
  const [user, setUser] = useState({});
  const { pathname } = useRouter();
  const supabase = useSupabaseClient();

  const errorSwal = {
    title: "Usuario eliminado",
    text: "Por favor, inicia sesión con otra cuenta",
    icon: "warning",
  };
  useEffect(() => {
    let cls =
      "bg-brand-olive p-10 inset-0 md:bg-transparent md:relative md:block md:p-0";
    if (navActive) setNavbarClassName(`${cls} fixed`);
    else setNavbarClassName(`${cls} hidden`);
    async function getProfile() {
      setUser(await getProfileInfoId(session?.user?.id));
    }
    if (session) getProfile();
  }, [navActive, session]);

  useEffect(() => {
    if (user.deleted_at) {
      Swal.fire(errorSwal).then(async () => {
        try {
          let { error } = await supabase.auth.signOut();
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      });
    }
  }, [user.deleted_at]);

    return (
        <>
            <header
                id="headerMain"
                className={`${props.background ?? "bg-brand-olive"} py-3 ${
                    pathname === "/" && navActive ? "inset-0" : "inset-x-0"
                } fixed z-40 md:py-5`}
            >
                <div className="container mx-auto px-6 2xl:px-0">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <h1 className="cursor-pointer">
                                <img
                                    src="/brand.svg"
                                    alt="Hueney Ruca"
                                    className="w-32 md:w-48"
                                />
                                <span className="sr-only">Hueney Ruca</span>
                            </h1>
                        </Link>

            <button
              className="text-white text-2xl leading-none select-none md:hidden"
              onClick={() => setNavActive(true)}
            >
              <i className="ri-menu-3-line"></i>
            </button>

            <nav className={navbarClassName}>
              <div className="pb-3 flex justify-end md:hidden">
                <button
                  className="text-white text-3xl leading-none select-none"
                  onClick={() => setNavActive(false)}
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <ul
                className="text-white text-lg font-semibold
															grid gap-y-6 md:flex md:gap-x-7"
              >
                <li className="select-none">
                  <Link href="/cabanas">Cabañas</Link>
                </li>

                <li className="select-none">
                  <Link href="/servicios">Servicios</Link>
                </li>

                <li className="relative select-none">
                  <button className="select-none">
                    <div>¿Quienes somos?</div>

                    <ul
                      className="bg-brand-brown text-left text-base 
																										w-full absolute rounded shadow-md p-2 
																										hidden"
                    >
                      <li
                        className="transition-colors px-2 py-1 rounded 
																											hover:bg-brand-olive"
                      >
                        <Link href="/nosotros">Nosotros</Link>
                      </li>
                      <li
                        className="transition-colors px-2 py-1 rounded 
																											hover:bg-brand-olive"
                      >
                        <Link href="/comentarios">Reseñas</Link>
                      </li>
                    </ul>
                  </button>
                </li>

                <li className="select-none">
                  <Link href="/contacto">Contacto</Link>
                </li>

                <li className="relative select-none">
                  <button className="select-none">
                    <div>Ayuda</div>
                    <ul className="text-left text-base absolute bg-brand-brown rounded shadow-md p-2 hidden">
                      <li className="hover:bg-brand-olive transition-colors px-2 py-1 rounded">
                        <Link href="/faqs">FAQs</Link>
                      </li>
                      <li className="hover:bg-brand-olive transition-colors px-2 py-1 rounded">
                        <Link href="/actividades">Actividades</Link>
                      </li>
                    </ul>
                  </button>
                </li>
                {session ? (
                  <li className="relative select-none">
                    <button className="select-none">
                      <div>Perfil</div>
                      <ul className="md:-left-14 text-left text-base absolute bg-brand-brown rounded shadow-md p-2 hidden">
                        <li className="hover:bg-brand-olive transition-colors px-2 py-1 rounded">
                          <Link href="/login">Editar</Link>
                        </li>
                        <li className="hover:bg-brand-olive transition-colors px-2 py-1 rounded">
                          <Link href="/reservas">Reservas</Link>
                        </li>
                        {user.role > 1 ? (
                          <li className="hover:bg-brand-olive transition-colors px-2 py-1 rounded">
                            <Link href="/admin">Dashboard</Link>
                          </li>
                        ) : null}
                      </ul>
                    </button>
                  </li>
                ) : (
                  <li className="select-none relative">
                    <Link href="/login">Iniciar sesión</Link>
                  </li>
                )}

                <style jsx>{`
                  .select-none:hover .absolute {
                    display: block;
                    z-index: 10;
                  }
                `}</style>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div role="header-spacer" className="h-[57px] md:h-[90px]"></div>
    </>
  );
}
