export default function TableHead({data})
{
	return (
		<thead>
			<tr className="bg-gray-2 text-left">
				{data.map(e => (
					<th 
						key={e.idx}
						className={`text-sm ${e.width ?? ''} py-4 px-4 font-semibold text-black`}>
						{ e.title }
					</th>
				))}
			</tr>
		</thead>
	)
}
