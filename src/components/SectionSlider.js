import React/*, { useState, useEffect }*/ from "react";
// import Slider from "react-slick";
// import { graphql } from "gatsby";

// import Img from "gatsby-image/withIEPolyfill";

function SectionSlider(props, { data }) {
	const {main, sub} = props;

	return (
		<div className="inner">
			<h1>{main}</h1>
			<h2>{sub}</h2>
		</div>
	)
}

export default SectionSlider;

export const sectionContent = graphql `
	query Sections {
		allMarkdownRemark {
			edges {
				node {
					frontmatter {
						categories {
							products
							verticals
						}
					}
				}
			}
		}
	}
`