import Link from "next/link";

export default function CardCabin({ cabin }) {
    return (
        <Link href={`/cabanas/${cabin.id}`}>
            <div className="border-2 border-slate-200 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row m-1">
                <div className="relative w-80 h-56 flex-shrink-0 p-4">
                    {cabin.images ? (
                        <img
                            src={cabin.images[0].path}
                            alt={cabin.name}
                            className="rounded-2xl object-cover w-full h-full"
                        />
                    ) : (
                        <img
                            src="https://via.placeholder.com/500x500.png?text=Image+Not+Found"
                            alt="No cabin image rendered"
                            layout="fill"
                            objectfit="cover"
                            className="border rounded-2xl object-cover w-full h-full"
                        />
                    )}
                </div>
                <div className="pl-8 pr-4 pt-6">
                    <h2 className="text-brand-green text-2xl font-semibold mb-4">
                        {cabin.name}
                    </h2>
                    <div className="text-lg mb-0.5">
                        <i className="ri-user-3-fill text-gray-500 mr-2"></i>
                        <span className="text-gray-800 font-normal">
                            Cabaña de {cabin.rooms} habitaciones para
                            {` ${cabin.capacity}`} personas
                        </span>
                    </div>
                    {cabin.services && cabin.services.includes("Wi Fi") && (
                        <div className="text-lg mb-0.5">
                            <i className="ri-wifi-line text-gray-500 mr-2"></i>
                            <span className="text-gray-800 font-normal">
                                Wi-Fi
                            </span>
                        </div>
                    )}
                    {cabin.services &&
                        cabin.services.includes("Calefaccion") && (
                            <div className="text-lg mb-0.5">
                                <i className="ri-windy-line text-gray-500 mr-2"></i>
                                <span className="text-gray-800 font-normal">
                                    Aire acondicionado
                                </span>
                            </div>
                        )}
                    {cabin.services && cabin.services.includes("Cochera") && (
                        <div className="text-lg">
                            <i className="ri-car-fill text-gray-500 mr-2"></i>
                            <span className="text-gray-800 font-normal">
                                Cochera
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
