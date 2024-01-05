export default function handler(req, res) {
  res.status(200).json({ 
		page_title: 'Sobre nosotros',
		content: "Hueney Ruca es el nombre de nuestra empresa de turismo en Villa Arcadia, ubicada en la Provincia de Buenos Aires, Argentina. Nuestro complejo de cabañas turísticas se encuentra en un entorno natural privilegiado, rodeado de vegetación y tranquilidad, ideal para disfrutar de unas vacaciones en familia o en pareja.\n\nContamos con un total de 11 cabañas, cada una de ellas diseñada para satisfacer las necesidades de nuestros huéspedes, ofreciendo diferentes capacidades y equipamiento completo para que su estadía sea confortable y agradable. \n\nEn nuestras instalaciones, también disponemos de dos amplias piscinas al aire libre, donde podrá disfrutar del sol y refrescarse en los días calurosos. Además, contamos con juegos para niños, parrillas para hacer asados, cocheras privadas para los vehículos de nuestros huéspedes y todo lo necesario para que disfruten de una estadía inolvidable en nuestro complejo de cabañas."
	})
}