import Link from 'next/link'

export default function Header({title, breadcrumbs, children})
{
	
	return (
		<div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
			<h2 className="font-semibold text-title-md2 text-black select-none">
				{ title }
			</h2>

			<div className="flex-1 flex select-none sm:justify-end">
				{children}
			</div>

			<nav>
				<ol className="text-sm font-medium flex items-center gap-2 select-none">
					<li>
						<Link href="/admin">Dashboard</Link>
					</li>
					{ breadcrumbs }
				</ol>
			</nav>
		</div>
	)
}