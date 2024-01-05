import { useState, useEffect } from 'react'
import Link from 'next/link'



export default function Sidebar(props) {

	const [sidebarToggle, setSidebarToggle] = useState(true)
	const closeSidebar = () => props.actionCloseSidebar()

	return (
		<>
			<aside
				className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 
										flex-col overflow-y-hidden bg-black duration-300 
										ease-linear lg:static lg:translate-x-0 
										${props.sidebarStatus ? 'translate-x-0' : '-translate-x-full'}`}>

				{/* SIDEBAR HEADER */}
				<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
					<Link href="/admin">
						<img
							src="/brand.svg"
							alt="Hueney Ruca"
							className="w-32 md:w-48" />
					</Link>


					<button
						className="block lg:hidden"
						onClick={closeSidebar}>
						<svg
							className="fill-current"
							width="20"
							height="18"
							viewBox="0 0 20 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" />
						</svg>
					</button>
				</div>
				{/* SIDEBAR HEADER */}

				<div
					className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear"
				>
					{/* Sidebar Menu */}
					<nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
						{/* Menu Group */}
						<Link
							className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark"
							href="/">
							Página principal
						</Link>
						<h3
							className="my-4 ml-4 text-sm font-medium text-bodydark2">
							MENU
						</h3>

						<ul className="mb-6 flex flex-col gap-1.5">

							<li>
								<Link
									className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark"
									href="/admin">
									<i className="ri-dashboard-line"></i>
									Estadisticas
								</Link>
							</li>

							<li>
								<Link
									className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark"
									href="/admin/booking">
									<i className="ri-calendar-check-line"></i>
									Reservas
								</Link>
							</li>

							<li>
								<Link
									className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark"
									href="/admin/reviews">
									<i className="ri-chat-1-line"></i>
									Reseñas
								</Link>
							</li>

							<li>
								<Link
									className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark"
									href="/admin/users">
									<i className="ri-user-line"></i>
									Huéspedes
								</Link>
							</li>

							<li>
								<Link
									className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark"
									href="/admin/rooms">
									<i className="ri-home-line"></i>
									Cabañas
								</Link>
							</li>
						</ul>
					</nav>
					{/* Sidebar Menu */}
				</div>
			</aside>
		</>

	)
}
