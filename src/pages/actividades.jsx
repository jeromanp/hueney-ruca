import Layout from '../layouts/Layout';

export default function Actividades() {

  const handleDownload = (e) => {
    e.preventDefault()
    const url = 'https://kwmjganrkoyleqdillhu.supabase.co/storage/v1/object/public/hueney_ruca/catalogo_turistico/Catalogo_Turistico_Sierras-de-la-Venatana.pdf';
    const filename = 'Catalogo_Turistico_Sierras-de-la-Venatana.pdf';
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const blobURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = filename;
        link.click();
        // Borra el objeto URL y el anchor para que no flote en el eter por siempre
        URL.revokeObjectURL(blobURL);
        link.remove();
      });
  };

  return (
    <Layout>
      <div className="container h-full mx-auto px-6 2xl:px-0">
        <h2 className="text-brand-green text-3xl font-bold 
											leading-none text-center pt-14 pb-8 
											md:text-4xl md:leading-none">Actividades Turisticas
        </h2>

        <div 
					className="text-brand-green text-center 
												leading-tight max-w-4xl mx-auto">
					¿Estás listo para explorar nuevos lugares, conocer gente increíble y crear recuerdos inolvidables? Entonces, ¡tenemos la escapada perfecta para ti!. Descargá el catálogo turistico de Sierra de la Ventana desde <a className='underline' href='/' onClick={handleDownload}>aquí</a>.
				</div>

          <div 
						className="max-w-sm mx-auto grid grid-cols-1  
						gap-10 py-8 text-brand-green lg:grid-cols-3 lg:max-w-6xl">

            <div className="group">
							<div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-700 group-hover:shadow-xl">
								<img 
									className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110" 
									src="https://www.labrujula24.com/wp-content/webp-express/webp-images/uploads/2021/11/sierra.jpg.webp" alt="Actividad 1" />
							</div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Circuito Artesanos Villa Ventana</h3>
                <p className="text-gray-700 text-sm text-justify">Una muy buena opción para recorrer Villa Ventana de la mano de sus artesanas y artesanos, visita sus talleres conoce y disfruta de sus obras y productos. En marcados por la frondosa arboleda de la villa podes encontrar los talleres y locales, conocer los procesos y al mismo tiempo recorrer las hermosas calles del pueblo mas alto de la provincia de Buenos Aires</p>
              </div>
            </div>

            <div className="group">
							<div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-700 group-hover:shadow-xl">
								<img 
									className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110" 
									src="https://fotos.perfil.com/2022/11/07/club-hotel-de-villa-ventana-20221107-1449645.jpg" alt="Actividad 2" />
							</div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Club Hotel de la Ventana</h3>
                <p className="text-gray-700 text-sm text-justify">Inaugurado el 11 de noviembre de 1911, fue el primer Hotel Casino de Sudamérica, actualmente en ruinas, constituye uno de los principales atractivos de la localidad de Villa Ventana. Contaba con cancha de golf, de tenis, casino, capilla y un tren de trocha angosta que lo comunicaba con la estación de Sierra de la Ventana. En 1942 refugio prisioneros del Graff Spee y en 1983 un incendio lo dejo en ruinas.</p>
              </div>
            </div>

            <div className="group">
							<div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-700 group-hover:shadow-xl">
								<img 
									className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110" 
									src="https://scontent.faep9-2.fna.fbcdn.net/v/t1.18169-9/20638540_669500089926744_6931384296543630296_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bI8BplyyGHEAX9feXTQ&_nc_ht=scontent.faep9-2.fna&oh=00_AfB2rw0gln--8OEQV7Ow67_nL4ZXaSLA1zmiQmgnGoPpyw&oe=646FF0AE" alt="Actividad 3" />
							</div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Fuente del Bautismo</h3>
                <p className="text-gray-700 text-sm text-justify">Circuito Obra de Salamone Francisco Salamone fue un arquitecto italoargentino, que construyó más de 70 edificios en 18 municipios de la provincia de Buenos Aires entre 1936 y 1940 de manera simultanea. Estos edificios combinan el art decó, futurismo y funcionalismo a escala monumental. Sus obras son cementerios, mataderos y palacios municipales que encarnan el modernismo en diferentes ciudades y pueblos bonaerenses.</p>
              </div>
            </div>
            
          </div>
        </div>
        <div className='h-25'></div>
    </Layout>
  )
};