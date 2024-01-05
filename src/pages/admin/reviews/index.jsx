import Layout from "../../../layouts/DashboardLayout";
import Header from "../../../components/dashboard/PageHeader";
import TableHead from "../../../components/dashboard/tables/TableHead";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import swalAction from "components/dashboard/swalAction";
import dayjs from "dayjs";

const table_head = [
  { idx: "date", title: "Fecha", width: "min-w-[150px]" },
  { idx: "nombre", title: "Nombre", width: "min-w-[100px]" },
  { idx: "comment", title: "Comentario", width: "w-[400px] min-w-[200px]" },
  { idx: "review", title: "Valoración", width: "min-w-[100px]" },
  { idx: "status", title: "Estado", width: "min-w-[80px]" },
  { idx: "actions", title: "Acciones", with: "min-w-[100px]" },
];

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("/api/comments")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteHandler = (comment) => {
    swalAction("comentario", comment.id, setReviews, reviews, "comments", comment.suspended);
  };

  return (
    <Layout>
      <Header
        title="Reseñas"
        breadcrumbs={
          <>
            <li>/</li>
            <li className="text-primary">Reviews</li>
          </>
        }
      >
        {/* <Link
          href="/admin/reviews/create"
          className="inline-flex items-center justify-center rounded-md bg-primary bg-opacity-70 py-1.5 px-4 text-sm text-center font-medium text-white hover:bg-opacity-90"
        >
          Nueva reseña
        </Link> */}
      </Header>

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default  sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <TableHead data={table_head} />

              <tbody>
                {reviews &&
                  reviews.map((review, i) => {
                    const bg = review.deleted_at ? 'bg-slate-200' : '';
                    return <tr key={review.id} className={`${bg}`}>
                      <td
                        className={`border-[#eee] py-5 px-4 ${
                          i < reviews.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <p className="text-sm font-medium">
                          {dayjs(review.created_at).format("DD MMM, YYYY")}
                        </p>
                      </td>

                      <td
                        className={`border-[#eee] py-5 px-4 ${
                          i < reviews.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <h5 className="text-black text-sm font-semibold capitalize">
                          {review.profiles?.full_name}
                        </h5>
                        <p className="text-xs">{review.profiles?.email}</p>
                      </td>

                      <td
                        className={`border-[#eee] py-5 px-4 pl-5 ${
                          i < reviews.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="text-xs">{`${review.review.slice(
                          0,
                          100
                        )}${review.review.length > 100 ? "..." : ""}`}</div>
                      </td>

                      <td
                        className={`border-[#eee] py-5 px-4 ${
                          i < reviews.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="flex gap-x-1">
                          {review.stars ? (
                            <i className="ri-star-fill text-yellow text-sm"></i>
                          ) : null}
                          {review.stars > 1 ? (
                            <i className="ri-star-fill text-yellow text-sm"></i>
                          ) : null}
                          {review.stars > 2 ? (
                            <i className="ri-star-fill text-yellow text-sm"></i>
                          ) : null}
                          {review.stars > 3 ? (
                            <i className="ri-star-fill text-yellow text-sm"></i>
                          ) : null}
                          {review.stars > 4 ? (
                            <i className="ri-star-fill text-yellow text-sm"></i>
                          ) : null}
                        </div>
                      </td>

                      <td
                        className={`border-[#eee] py-5 px-4 ${
                          i < reviews.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <p className="text-xs pl-4.5">
                          {review.approved ? (
                            <i className="ri-checkbox-blank-circle-fill text-green-500"></i>
                          ) : (
                            <i className="ri-checkbox-blank-circle-fill text-red-700"></i>
                          )}
                        </p>
                      </td>

                      <td
                        className={`border-[#eee] py-5 px-4 ${
                          i < reviews.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3.5">
                          <Link
                            className="hover:text-primary"
                            href={`/admin/reviews/${review.id}`}
                          >
                            <i className="ri-edit-line text-xl leading-none"></i>
                          </Link>
                          <button
                            className="hover:text-primary ri-close-circle-line text-xl leading-none"
                            onClick={() => deleteHandler(review)}
                          ></button>
                          <p className="text-xs">
                            {review.suspended ? (
                              <i className="ri-checkbox-blank-circle-fill text-red-700 opacity-50"></i>
                            ) : (
                              <i className="ri-checkbox-blank-circle-fill text-green-500 opacity-50"></i>
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                      })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </Layout>
  );
}
