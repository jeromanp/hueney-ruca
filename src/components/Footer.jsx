import { useEffect, useState } from 'react'
import gsap from 'gsap'
import axios from 'axios'
import ChatBot from 'components/chatBot/ChatBot'

export default function Footer() {
	const [data, setData] = useState({
		address: [],
		social: {},
	});

	useEffect(() => {
		axios.get("/api/global").then((resp) => setData(resp.data))
		
		gsap.set('#whats-app-icon', { y: 100 })
		gsap.to('#whats-app-icon', { y: 0, duration: .3, delay: 1 })
	}, []);

	return (
		<footer id="footerMain">
			<div className="border-t border-brand-green container px-6 mx-auto 2xl:px-0">
				<div className="text-brand-green py-6 pb-8 grid gap-y-10 md:grid-cols-3 md:gap-x-10">
					<div className="">
						<h5 className="text-xl font-medium">Dónde estamos</h5>
						<div className="text-sm mt-1">
							{data?.address.map((e, i) => (
								<div key={i}>{e}</div>
							))}
						</div>

							<div className="mt-2">
								<a
									href={data.gmaps_link}
									className="inline-flex items-center gap-x-1 hover:opacity-80"
									target="_blank"
								>
									<i className="ri-map-pin-2-fill text-xl"></i>
									<span className="font-semibold tracking-tight">
										Ver ubicación
									</span>
								</a>
							</div>
						</div>

						<div className="">
							<h5 className="text-xl font-medium">Contacto</h5>
							<div className="text-sm mt-1">
								<div className="flex items-center gap-x-2">
									<i className="ri-mail-line"></i>
									<a
										href={`mailto:${data.email}`}
										className="hover:opacity-80"
									>
										{data.email}
									</a>
								</div>

								<div className="flex items-center gap-x-2 mt-2">
									<i className="ri-whatsapp-line"></i>
									<a
										href={`tel:${data.phone}`}
										className="hover:opacity-80"
									>
										{data.phone}
									</a>
								</div>
							</div>
						</div>

						<div className="">
							<h5 className="text-xl font-medium">Seguinos!</h5>
							<div className="flex gap-x-4 mt-2">
								{data.social.facebook ? (
									<a href={data.social.facebook} target="_blank">
										<i className="ri-facebook-box-line text-3xl leading-none hover:opacity-80"></i>
									</a>
								) : null}

								{data.social.instagram ? (
									<a href={data.social.instagram} target="_blank">
										<i className="ri-instagram-line text-3xl leading-none hover:opacity-80"></i>
									</a>
								) : null}
							</div>
						</div>
					</div>
			</div>
			
			<div className="relative z-20">
				<ChatBot />
			</div>

		</footer>
	);
}
