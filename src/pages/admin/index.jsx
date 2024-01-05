import Layout from "../../layouts/DashboardLayout";
import Header from "../../components/dashboard/PageHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/api/booking")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Esta funcion mide el cambio porcentual de huespedes respecto al mes anterior

  const guestsPorcentualChange = () => {
    const thisMonthGuests = countGuests();
    const pastMonthGuests = lastMonthGuests();
    if (thisMonthGuests && pastMonthGuests) {
      const porcentualChange =
        ((thisMonthGuests - pastMonthGuests) / pastMonthGuests) * 100;
      return porcentualChange.toFixed(2);
    } else {
      return "No es obtenible";
    }
  };

  //Esta funcion cuenta los huespedes del mes actual
  const countGuests = () => {
    let totalGuests = 0;
    let fechaActual = new Date();
    let anioActual = fechaActual.getFullYear();
    let mesActual = fechaActual.getMonth() + 1;

    for (let i = 0; i < bookings.length; i++) {
      let fechaString = bookings[i].checkin;
      let fecha = new Date(fechaString);
      let mes = (fecha.getMonth() + 1).toString();
      let anio = fecha.getFullYear().toString();

      if (
        parseInt(mesActual) === parseInt(mes) &&
        parseInt(anioActual) === parseInt(anio)
      ) {
        totalGuests += bookings[i].adults;
      }
    }
    return totalGuests;
  };

  //Esta funcion cuenta los huespedes del mes anterior

  const lastMonthGuests = () => {
    let totalGuests = 0;
    let fechaActual = new Date();
    let anioActual = fechaActual.getFullYear();
    let mesPasado = fechaActual.getMonth();

    for (let i = 0; i < bookings.length; i++) {
      let fechaString = bookings[i].checkin;
      let fecha = new Date(fechaString);
      let mes = (fecha.getMonth() + 1).toString();
      let anio = fecha.getFullYear().toString();

      if (
        parseInt(mesPasado) === parseInt(mes) &&
        parseInt(anioActual) === parseInt(anio)
      ) {
        totalGuests += bookings[i].adults;
      }
    }
    return totalGuests;
  };

  //Esta funcion mide el cambio porcentual de usuarios respecto al mes anterior

  const usersPorcentualChange = () => {
    const users = thisMonthUsers();
    const pastMonthUsers = lastMonthUsers();
    if (users && pastMonthUsers) {
      const porcentualChange =
        ((users - pastMonthUsers) / pastMonthUsers) * 100;
      return porcentualChange.toFixed(2);
    } else {
      return "No es obtenible";
    }
  };

  //Esta funcion cuenta los usuarios del mes pasado

  const lastMonthUsers = () => {
    let countUsers = 0;
    const actualDate = new Date();
    const lastMonth = actualDate.getMonth();
    const actualYear = actualDate.getFullYear();
    for (let i = 0; i < users.length; i++) {
      const stringDate = users[i].created_at;
      const creationDate = new Date(stringDate);
      const creationMonth = creationDate.getMonth() + 1;
      const creationYear = creationDate.getFullYear();
      if (
        parseInt(creationMonth) === parseInt(lastMonth) &&
        parseInt(creationYear) === parseInt(actualYear)
      ) {
        countUsers += 1;
      }
    }

    return countUsers;
  };

  //Esta funcion cuenta los usuarios de este mes

  const thisMonthUsers = () => {
    let countUsers = 0;
    const actualDate = new Date();
    const actualMonth = actualDate.getMonth() + 1;
    const actualYear = actualDate.getFullYear();
    for (let i = 0; i < users.length; i++) {
      const stringDate = users[i].created_at;
      const creationDate = new Date(stringDate);
      const creationMonth = creationDate.getMonth() + 1;
      const creationYear = creationDate.getFullYear();
      if (
        parseInt(creationMonth) === parseInt(actualMonth) &&
        parseInt(creationYear) === parseInt(actualYear)
      ) {
        countUsers += 1;
      }
    }

    return countUsers;
  };

  //Esta funcion cuenta el total de reservas activas
  const activeBookings = () => {
    let totalActiveBookings = 0;
    let fechaActual = new Date();

    for (let i = 0; i < bookings.length; i++) {
      let fechaString = bookings[i].checkout;
      let fechaCheckout = new Date(fechaString);
      if (fechaActual <= fechaCheckout) {
        totalActiveBookings += 1;
      }
    }
    return totalActiveBookings;
  };

  //Esta funcion cuenta el total de usuarios en la tabla profiles
  const countUsers = () => {
    const totalUsers = users.length;
    return totalUsers;
  };

  return (
    <Layout>
      <Header
        title="Dashboard"
        breadcrumbs={
          <>
            <li>/</li>
          </>
        }
      ></Header>
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
                <i className="ri-calendar-check-line text-primary text-xl leading-none"></i>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black">
                    {activeBookings()}
                  </h4>
                  <span className="text-sm font-medium">Reservas activas</span>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
                <i className="ri-group-line text-primary text-xl leading-none"></i>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black">
                    {countGuests()}
                  </h4>
                  <span className="text-sm font-medium">
                    Huéspedes este mes
                  </span>
                </div>

                <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                  {guestsPorcentualChange()}
                  <svg
                    className="fill-meta-3"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                      fill=""
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
                <svg
                  className="fill-primary"
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                    fill=""
                  />
                  <path
                    d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                    fill=""
                  />
                  <path
                    d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                    fill=""
                  />
                </svg>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black">
                    {countUsers()}
                  </h4>
                  <span className="text-sm font-medium">Total de usuarios</span>
                </div>

                <span className="flex items-center gap-1 text-sm font-medium text-meta-5">
                  {usersPorcentualChange()}
                  <svg
                    className="fill-meta-5"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                      fill=""
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            {/* <include src="./partials/chart-01.html" /> 
            No se usa include con react que yo sepa, o se trata de no, si es necesario
            pasenlo como componente <Component /> sino vuela
            */}
          </div>
        </div>
      </main>
    </Layout>
  );
}
