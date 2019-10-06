import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Img from "gatsby-image/withIEPolyfill";

import "../styles/styles.css";

function IndexPage({ data }) {
	const [section, setSection] = useState("none");

	console.log(data);

	const openSection = () => {

	}

	const sliderSettings = {
		arrows: false,
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: "main_slider"
	};

	return (
		<Layout className="Blah">
			<div id="app">
				<div className="inner">
					<Slider {...sliderSettings}>
						<div className="tileSet products">
							{data.productsTiles.edges.map((e) => (
								<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" className="tile" />
							))}
						</div>
						<div className="tileSet programmatic">
							{data.programmaticTiles.edges.map((e) => (
								<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" className="tile" />
							))}
						</div>
						<div className="tileSet verticals">
							{data.verticalsTiles.edges.map((e) => (
								<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" className="tile" />
							))}
						</div>
					</Slider>
				</div>
			</div>
		</Layout>
	)
}

export default IndexPage;

export const queryTiles = graphql `
	query Tiles {
		productsTiles: allFile(filter: { relativePath: {regex : "/^tile_products_/" }}) {
			edges {
				node {
					relativePath
					childImageSharp {
						fluid {
							aspectRatio
							src
							srcSet
						}
					}
				}
			}
		}
		programmaticTiles: allFile(filter: { relativePath: {regex : "/^tile_programmatic_/" }}) {
			edges {
				node {
					relativePath
					childImageSharp {
						fluid {
							aspectRatio
							src
							srcSet
						}
					}
				}
			}
		}
		verticalsTiles: allFile(filter: { relativePath: {regex : "/^tile_verticals_/" }}) {
			edges {
				node {
					relativePath
					childImageSharp {
						fluid {
							aspectRatio
							src
							srcSet
						}
					}
				}
			}
		}
	}
`