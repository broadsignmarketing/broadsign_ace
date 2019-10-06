import React from "react";
import Slider from "react-slick";

import Layout from "../components/layout";

import "../styles/styles.css";

class MainSlider extends React.Component {
	render() {
		var settings = {
			arrows: false,
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			className: "main_slider"
		};
		return (
			<Slider {...settings}>
				<div>
					<h3>1</h3>
				</div>
				<div>
					<h3>2</h3>
				</div>
				<div>
					<h3>3</h3>
				</div>
			</Slider>
		);
	}
}

const IndexPage = () => (
	<Layout>
		<div id="app">
			<div class="inner">
				<MainSlider />
			</div>
		</div>
	</Layout>
)

export default IndexPage
