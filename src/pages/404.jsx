import LayoutMain from "layouts/Layout";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <LayoutMain>
        <div className="flex justify-center items-center gap-8 pr-18 pt-18">
          <img src="/404.svg" alt="" className="h-90" />
          <div>
            <div className="flex">
              <h1 className="text-9xl font-bold text-brand-light-green">4</h1>
              <h1 className="text-9xl font-bold text-brand-brown">0</h1>
              <h1 className="text-9xl font-bold text-brand-light-green">4</h1>
            </div>
            <p className="text-2xl font-medium w-64 text-black">
              ¡Uy! Parece que esta página ha salido a dar un paseo. Esperamos
              que vuelva pronto
            </p>
          </div>
        </div>
        <Link href="/">
          <div className="flex justify-center items-center gap-2 pt-18 pb-18">
            <img src="/back.svg" alt="" className="w-5" />
            <p className="text-2xl font-medium w-64 text-black">
              Volver al inicio
            </p>
          </div>
        </Link>
      </LayoutMain>
    </>
  );
}
