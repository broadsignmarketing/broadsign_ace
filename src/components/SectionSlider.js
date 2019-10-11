import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import ClientSlide from "./ClientSlide";

function SectionSlider(props) {
	const {slides} = props;

	const [currentClient, setCurrentClient] = useState("");

	return (
		<Slider>
			{ slides.map((s, i) => {
				return (<ClientSlide {...s} key={i} />)
			})}
		</Slider>
	)
}

export default SectionSlider;