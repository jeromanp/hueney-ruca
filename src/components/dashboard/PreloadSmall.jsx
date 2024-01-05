import { useState } from 'react'

export default function Preload(props)
{

	// const [loading, setLoading] = useState(false)

	return (
		<>
		{ props.loading ?
			(<div 
				className={`bg-white bg-opacity-50 p-10 fixed left-0 top-0 
									flex h-screen w-screen items-end justify-end  
									transition-all z-999999 ${ props.loading ? 'opacity-100' : 'opacity-0' }`}>
				<div 
					className="h-10 w-10 animate-spin rounded-full border-4 
										border-solid border-primary border-t-transparent"></div>
			</div>) : null
		}
		</>
	)
}