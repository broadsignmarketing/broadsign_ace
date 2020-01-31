import React, { useEffect } from "react";
import Slider from "react-slick";
import Img from "gatsby-image/withIEPolyfill";

import ClientSlide from "./ClientSlide";

function SectionSlider(props) {
	const {slides, allImages} = props;

	const sliderSettings = {
		arrows: false,
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: "client_slider"
	};

	useEffect(() => {
	}, []);

	return (
		<div className="middle">
			{<div id="offline">
				{allImages.edges.map((s, key) => {
					return (<Img fluid={s.node.childImageSharp.fluid} alt="" key={"cache-"+key} loading="eager" />)
				})}
			</div>}
			<Slider {...sliderSettings}>
				{/* To force a first load of all the images needed in the app */}
				{ slides.map((s, i) => {
					return (<ClientSlide {...s} key={i} />)
				})}
			</Slider>
		</div>
	)
}

export default SectionSlider;