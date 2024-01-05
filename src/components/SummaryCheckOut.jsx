export default function SummaryCheckOut({ url, name, price, night, extra }) {
  return (
    <>
      <section className="border-2 rounded-3xl border-brand-light-green shadow-lg p-6">
        <div className="flex flex-wrap pb-8 justify-center">
          {url ? (
            <img
              src={url}
              alt={name}
              className="rounded-2xl object-cover w-55 h-34"
            />
          ) : (
            <img
              src="https://via.placeholder.com/500x500.png?text=Image+Not+Found"
              alt="Cabin image"
              layout="fill"
              objectfit="cover"
              className="border rounded-2xl object-cover w-55 h-34"
            />
          )}
          <div className="ml-5">
            <h1 className="text-brand-green font-semibold text-3xl">{name}</h1>
            <h2 className="text-black font-bold text-2xl pt-2">
              ${price} ARS{" "}
              <span className="text-black font-light text-xl">por noche</span>
            </h2>
          </div>
        </div>
        <div className="border-2 border-brand-cream rounded-full"></div>

        <div className="pt-6">
          <h1 className="text-brand-green font-semibold text-xl pb-2">
            Detalles del precio
          </h1>
          <div className="flex justify-between text-lg font-light">
            <p className="text-black pb-2 pt-2">
              ${price} ARS por {night} noches
            </p>
            <p className="pb-2 text-black">${price * night} ARS</p>
          </div>
          <div className="flex justify-between text-lg font-light">
            <p className="pb-2 text-black">Ejemplo Extra </p>
            <p className="pb-10 text-black">${extra} ARS</p>
          </div>

          <div className="border-2 border-brand-cream rounded-full"></div>
          <div className="text-black flex justify-between text-2xl font-semibold pt-8 pb-4">
            <h2>Total</h2>
            <p>${price * night + extra} ARS</p>
          </div>
        </div>
      </section>
    </>
  );
}
