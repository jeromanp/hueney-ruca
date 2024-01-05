import Link from 'next/link'

export default function (props) {
	return (
		<div className="flex justify-end gap-4.5">

				<Link
				 className="flex justify-center rounded border border-stroke py-2
				 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark" 
				 href={ props.cancel_url }>Cancelar</Link>

			<button
				className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
				type="submit"
			>Guardar
			</button>
		</div>
	)
}