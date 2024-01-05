import { useState, useEffect } from 'react'

export default function Spinner(props){

	const [val, setVal] = useState(props.defaultValue ?? 0)

	const increment = () => { 
		if (val < 6) {
			setVal(val+1) 
		}
	}

	const decrement = async () => { 
		if( val > 1 ){
			setVal(val-1)
		}
	}

	useEffect(() => {
		if( props.setValue ) props.setValue(val)
	}, [val])



	return (
		<div 
			className="flex flex-row h-10 w-full rounded-lg 
			relative bg-transparent mt-1">
			
			<button 
				onClick={decrement} 
				className=" text-gray-500 h-full w-20 
									rounded-l cursor-pointer">
				<span 
					className="m-auto text-2xl">−</span>
			</button>
			
			<input 
				type="text" 
				className="outline-none text-center 
								w-full font-medium 
								flex items-center 
								appearance-none
								focus:outline-none
								md:text-basecursor-default" 
				name="custom-input-number" 
				value={ val }
				readOnly />
			
			<button 
				onClick={increment} 
				className="text-gray-500 h-full w-20 
									rounded-r cursor-pointer">
				<span 
					className="m-auto text-2xl">+</span>
			</button>

		</div>
	)
}