export default function handler(req, res) {
  res.status(200).json({ 
		page_title: 'Disfrutá Hueney Ruca!',
		intro: 'Disfrutá de un hogar lejos de casa en nuestro hermoso complejo de cabañas completamente equipado con todas las comodidades que necesitas para una estancia confortable y relajante. Ya sea que viajes en pareja o en familia, nuestro alojamiento vacacional es la opción ideal  para unas vacaciones inolvidables.',
		list: [
			{
				icon: '/services/icon-1.svg',
				title: 'Cochera',
				content: 'Cada una de las cabañas cuenta con cochera cubierta privada.'
			},
			{
				icon: '/services/icon-2.svg',
				title: 'Pileta',
				content: 'Tendrás dos piletas al aire libre y reposeras que vos y tu familia podrán utilizar cuando quieran, sin costo adicional.'
			},
			{
				icon: '/services/icon-3.svg',
				title: 'Parrilla',
				content: 'Cada cabaña tiene su parrilla privada, techada con mesas y sillas para disfrutar de un almuerzo o cena al aire libre.'
			},
			{
				icon: '/services/icon-4.svg',
				title: 'Juegos',
				content: 'Para los niños! En el parque encontraran una zona de juegos de madera para divertirse sin limites.'
			},
			{
				icon: '/services/icon-5.svg',
				title: 'Asistencia',
				content: 'El predio cuenta con una oficina donde podrás acercarte en caso de que necesites ayuda o tengas alguna consulta.'
			},
			{
				icon: '/services/icon-6.svg',
				title: 'Información',
				content: 'Brindamos mapas e información sobre excursiones y actividades turísticas que podrás realizar en Sierra de la ventana.'
			}
		]
	})
}