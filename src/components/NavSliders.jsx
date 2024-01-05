import React, { Component } from 'react'
import Slider from 'react-slick'

export default class NavSliders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nav1: null,
			nav2: null
		};
	}

	settings1 = {
		autoplay: true,
		arrows: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: true,
		// adaptiveHeight: true // Se adapta bien a la primera imagen, el resto las deja, las largas las corta
	};

	settings2 = {
		arrows: false,
		slidesToShow: 4,
		swipeToSlide: true,
		focusOnSelect: true,
		accessibility: true,
	};

	componentDidMount() {
		this.setState({
			nav1: this.slider1,
			nav2: this.slider2
		});
	}

	render() {
		return (
			<div className="lg:inset-0 lg:absolute lg:flex lg:justify-end">
				<div className="lg:w-6/12">
					<div className="h-[400px] lg:h-[110vh] lg:overflow-hidden lg:rounded-l-b">
						<Slider
							asNavFor={this.state.nav2}
							ref={slider => (this.slider1 = slider)}
							{...this.settings1}
							className="h-full">
								{this.props.cabanas.images.map((image, i) => (
										<img 
											key={i} 
											src={image.path} 
											alt={image.name}
											className="w-full h-full object-cover" />
								))}
						</Slider>
					</div>

					<div 
						className="bg-white max-w-md pt-1.5 mx-auto -mt-8 relative 
						z-10 rounded-xl shadow-lg lg:-mt-28">
						<Slider
							asNavFor={this.state.nav1}
							ref={slider => (this.slider2 = slider)}
							{...this.settings2}>

							{this.props.cabanas.images.map((image, i) => (
								<div key={i} className="cursor-pointer px-1.5">
									<div className="">
										<img 
											src={image.path} 
											alt={image.name}
											className="w-full h-14 object-cover rounded-lg" />
									</div>
								</div>
							))}

						</Slider>
					</div>
				</div>
			</div>
		);
	}
}