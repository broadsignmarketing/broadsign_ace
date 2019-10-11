import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import ClientSlide from "./ClientSlide";

function SectionSlider(props) {
	const {slides} = props;

	const [currentClient, setCurrentClient] = useState("");

	const sliderSettings = {
		arrows: false,
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: "client_slider"
	};

	return (
		<Slider {...sliderSettings}>
			{ slides.map((s, i) => {
				return (<ClientSlide {...s} key={i} />)
			})}
		</Slider>
	)
}

export default SectionSlider;