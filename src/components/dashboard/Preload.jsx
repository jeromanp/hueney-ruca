import { useState } from 'react'

export default function Preload(props)
{

	// const [loading, setLoading] = useState(false)

	return (
		<>
		{ props.loading ?
			(<div 
				className="fixed left-0 top-0 z-999999 flex 
										h-screen w-screen items-center 
										justify-center bg-white">
				<div 
					className="h-16 w-16 animate-spin rounded-full border-4 
										border-solid border-primary border-t-transparent"></div>
			</div>) : null
		}
		</>
	)
}