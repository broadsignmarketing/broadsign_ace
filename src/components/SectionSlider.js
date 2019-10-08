import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

function SectionSlider(props) {
	const {main, sub} = props;

	const [currentClient, setCurrentClient] = useState("");


	// console.table(currentClient);
	const data = useStaticQuery(graphql`
		query Sections {
			allMarkdownRemark {
				edges {
					node {
						frontmatter {
							title
							gallery
							categories {
								products
								verticals
							}
						}
					}
				}
			}
		}
	`)
	const clients = data.allMarkdownRemark.edges;
	let slides = [];

	useEffect(() => {
		setCurrentClient("started");

		/* FIND A WAY TO USE USEREF() TO STORE THE SLIDES. I'M OFF NOW, SOMEBODY'S CALLING. */
		switch (main) {
			case "products" :
				slides = clients.map(c => c.node.frontmatter.categories.products.includes(sub));
				break;
			case "verticals" :
				slides = clients.map(c => c.node.frontmatter.categories.verticals.includes(sub));
				break;
		}

		setCurrentClient(slides[0].node.frontmatter.title);
	}, []);


	console.log(slides);

	return (
		<div className="inner">
			<div className="hero"></div>
			<div className="gallery"></div>
			<h1>{main}</h1>
			<h2>{sub}</h2>
			<h3>Slides :</h3>
			{slides.map(s => <p>{s.node.frontmatter.title}</p>)}
			<h3>Current Slide :</h3>
			{slides.map(s => <p>{currentClient}</p>)}
		</div>
	)
}

export default SectionSlider;