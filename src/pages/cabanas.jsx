import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layouts/Layout";
import Link from "next/link";
import Slider from "react-slick";
import house from "../../public/house.svg";
import people from "../../public/people.svg";
import initStripe from "stripe";
import CabanasSkeleton from "components/CabanasSkeleton";

export default function Cabins({ plans }) {
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCabins() {
      const response = await axios.get("/api/cabanas");

      const pricesMap = plans.reduce((map, plan) => {
        map[plan.name] = plan.price / 100;
        return map;
      }, {});

      const cabinsWithPrices = response.data.map((cabin, index) => ({
        ...cabin,
        price: pricesMap[cabin.name] || null,
      }));

      setCabins(cabinsWithPrices);
      setLoading(false);
    }

    getCabins();
  }, []);

  useEffect(() => {
    axios
      .get("/api/cabanas")
      .then((response) => {
        setCabins(response.data.filter((room) => room.deleted_at === null));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const settings = {
    dots: true,
    slidesToShow: 3,
    infinite: true,
    arrows: false,
    centerMode: true,
    centerPadding: "0",
    accesibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Layout>
      <div className="container h-full  mx-auto px-6 2xl:px-0">
        <h2
          className="text-brand-green text-3xl font-bold leading-none 
					text-center pt-14 pb-8 md:text-4xl md:leading-none"
        >
          Nuestras cabañas
        </h2>

        <div className="text-brand-green text-center leading-tight max-w-4xl mx-auto">
          El Complejo está compuesto por 11 cabañas de diferentes capacidades y
          dos piletas al aire libre, elegí la que mejor se adapte a vos y vení a
          disfrutar!
        </div>

        {loading ? (
          <div className="my-10 md:m-10">
            <div className="hidden md:flex">
              <CabanasSkeleton />
              <CabanasSkeleton />
              <CabanasSkeleton />
            </div>
            <div className="md:hidden">
              <CabanasSkeleton />
            </div>
          </div>
        ) : (
          <div className="my-10 md:m-10">
            <Slider {...settings}>
              {cabins.map((cabin) => (
                <div key={cabin.id} className="group">
                  <div className="mx-8 text-center rounded-2xl mb-8 overflow-hidden">
                    {cabin.images ? (
                      <div className="h-56 overflow-hidden rounded-2xl shadow-lg">
                        <img
                          src={cabin.images[0].path}
                          alt={cabin.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-56 overflow-hidden rounded-2xl shadow-lg">
                        <div className="bg-brand-cream rounded-2xl w-full h-full flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-brand-brown"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 640 512"
                          >
                            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    <h2 className="text-brand-green font-bold text-3xl mt-5">
                      {cabin.name}
                    </h2>

                    <div className="text-sm flex justify-center items-center mt-2">
                      <img src={people.src} alt="Capacidad" className="mx-2" />
                      <p>{cabin.capacity}</p>
                      <p className="mx-2">|</p>
                      <img
                        src={house.src}
                        alt="Habitaciones"
                        className="mx-2"
                      />
                      <p>
                        {Number(cabin.rooms) > 1
                          ? `${cabin.rooms} Habitaciones`
                          : "Monoambiente"}
                      </p>
                    </div>

                    <div className="text-xs leading-tight font-medium mt-2">
                      {cabin.price ? (
                        <>
                          <div>Precio: {cabin.price} ARS / día</div>
                        </>
                      ) : (
                        <div className="opacity-40">Precio no disponible</div>
                      )}
                    </div>

                    <Link
                      href={`/cabanas/${cabin.id}`}
                      className="btn-yellow mt-6 mb-8"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const limit = 11;
  let prices = [];
  let hasMorePrices = true;
  let startingAfter;

  while (hasMorePrices) {
    const options = startingAfter
      ? { limit, starting_after: startingAfter }
      : { limit };
    const { data: newPrices, has_more: morePrices } = await stripe.prices.list(
      options
    );
    prices = prices.concat(newPrices);
    hasMorePrices = morePrices;
    startingAfter = newPrices[newPrices.length - 1]?.id;
  }

  const plans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
      };
    })
  );

  const sortedPlans = plans.sort((a, b) => a.price - b.price);

  return {
    props: {
      plans: sortedPlans,
    },
  };
};
