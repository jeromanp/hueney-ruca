import { useEffect, useState } from "react";
import gsap from "gsap";
import axios from "axios";

import Layout from "../layouts/Layout";

export default function Services() {
  const [data, setData] = useState({
    list: [],
  });

  useEffect(() => {
    axios.get("api/services").then((resp) => setData(resp.data));
  }, []);

  const mouseEnter = (id) => {
    gsap.to(`.card:not(#${id})`, {
      opacity: 0.4,
      filter: "blur(4px)",
      duration: 0.3,
    });
    gsap.to(`#${id} .icon`, { y: -10, duration: 0.3 });
  };

  const mouseLeave = (id) => {
    gsap.to(`#${id} .icon`, { y: 0, duration: 0.3 });
    gsap.to(`.card`, { opacity: 1, filter: "none", duration: 0.3 });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 lg:px-0 text-center">
        <h2
          className="text-brand-green text-3xl font-bold 
											leading-none text-center pt-14 pb-8 
											md:text-4xl md:leading-none"
        >
          {data.page_title}
        </h2>

        <div
          className="text-brand-green text-center 
												leading-tight max-w-4xl mx-auto"
        >
          {data.intro}
        </div>

        <div
          className="text-brand-green grid gap-10 py-20
										items-start
										sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6
										lg:gap-7"
        >
          {data.list
            ? data.list.map((e, i) => {
                const id = `card-${Math.random().toString(16).substring(2)}`;
                return (
                  <div
                    key={i}
                    className="card grid justify-center gap-2 max-w-xs mx-auto"
                    id={id}
                    onMouseEnter={(e) => mouseEnter(id)}
                    onMouseLeave={(e) => mouseLeave(id)}
                  >
                    <div className="h-36">
                      <img
                        src={e.icon}
                        alt={`Icono ${e.title}`}
                        className="icon h-32 object-cover m-auto"
                      />
                    </div>

                    <h3 className="title text-xl font-semibold select-none">
                      {e.title}
                    </h3>

                    <div className="content leading-tight md:text-sm md:leading-tight">
                      {e.content}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </Layout>
  );
}