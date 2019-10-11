import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

function SectionSlider(props) {
	const {main, sub} = props;

	const [currentClient, setCurrentClient] = useState("");

	let slides = [];

	useEffect(() => {
	}, []);


	console.log(slides);

	return (
		<div className="inner">
			<div className="hero"></div>
			<div className="gallery"></div>
			<h1>{main}</h1>
			<h2>{sub}</h2>
			<h3>Slides :</h3>
			<h3>Current Slide :</h3>
		</div>
	)
}

export default SectionSlider;