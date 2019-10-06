import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { graphql } from "gatsby";
import classnames from "classnames";

import Layout from "../components/layout";
import Img from "gatsby-image/withIEPolyfill";
import SectionSlider from "../components/SectionSlider";

import "../styles/styles.css";

function IndexPage({ data }) {
	const [section, setSection] = useState("products");
	const [subSection, setSubSection] = useState("none");
	const [clientsSliderActive, setClientsSliderActive] = useState("");

	const updateSections = (main, sub) => {
		setSection(main);
		setSubSection(sub);
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

	useEffect(() => {
		if (subSection === "none") {
			setClientsSliderActive("");
		} else {
			setClientsSliderActive("active");
		}
	}, [subSection]);

	return (
		<Layout className="Blah">
			<div id="app">
				<div className="inner">
					<Slider {...sliderSettings}>
						<div className="tileSet products">
							{data.productsTiles.edges.map((e) => {
								const subsection = e.node.relativePath.replace(".png", "").replace("tile_products_", "");
								return (
									<a className="tile" onClick={() => { updateSections("products", subsection); }} key={e.node.childImageSharp.id}>
										<Img fluid={e.node.childImageSharp.fluid} objectFit="contain"  />
									</a>
								)
							})}
						</div>
						<div className="tileSet programmatic">
							{data.programmaticTiles.edges.map((e) => {
								const subsection = e.node.relativePath.replace(".png", "").replace("tile_programmatic_", "");
								return (
									<a className="tile" onClick={() => { updateSections("programmatic", subsection); }} key={e.node.childImageSharp.id}>
										<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" />
									</a>
								)
							})}
						</div>
						<div className="tileSet verticals">
							{data.verticalsTiles.edges.map((e) => {
								const subsection = e.node.relativePath.replace(".png", "").replace("tile_verticals_", "");
								return (
									<a className="tile" onClick={() => { updateSections("verticals", subsection); }} key={e.node.childImageSharp.id}>
										<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" />
									</a>
								)
							})}
						</div>
					</Slider>
				</div>
				<div className={classnames("sub", clientsSliderActive, section, ( subSection !== "none" ? subSection : "" ))}>
					<SectionSlider main={section} sub={subSection} />
					<button onClick={() => { setClientsSliderActive("") }}>X</button>
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