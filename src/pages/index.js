import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { graphql } from "gatsby";
import classnames from "classnames";

import Layout from "../components/layout";
import Img from "gatsby-image/withIEPolyfill";
import SectionSlider from "../components/SectionSlider";

import "../styles/styles.css";

function IndexPage(props) {
	const {data} = props;
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
						<div className="slide products">
							<h1>Products</h1>
							<div className="tile_set">
								{data.productsTiles.edges.map((e) => {
									const subsection = e.node.relativePath.replace(".png", "").replace("tile_products_", "");
									return (
										<a href={(e) => e.preventDefault() } className="tile" onClick={() => { updateSections("products", subsection); }} key={e.node.childImageSharp.id}>
											<Img fluid={e.node.childImageSharp.fluid} objectFit="contain"  />
										</a>
									)
								})}
							</div>
						</div>
						<div className="slide programmatic">
							<h1>Programmatic</h1>
							<div className="tile_set">
								{data.programmaticTiles.edges.map((e) => {
									const subsection = e.node.relativePath.replace(".png", "").replace("tile_programmatic_", "");
									return (
										<a href={(e) => e.preventDefault() } className="tile" onClick={() => { updateSections("programmatic", subsection); }} key={e.node.childImageSharp.id}>
											<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" />
										</a>
									)
								})}
							</div>
						</div>
						<div className="slide verticals">
							<h1>Verticals</h1>
							<div className="tile_set">
								{data.verticalsTiles.edges.map((e) => {
									const subsection = e.node.relativePath.replace(".png", "").replace("tile_verticals_", "");
									return (
										<a href={(e) => e.preventDefault() } className="tile" onClick={() => { updateSections("verticals", subsection); }} key={e.node.childImageSharp.id}>
											<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" />
										</a>
									)
								})}
							</div>
						</div>
					</Slider>
				</div>
				<div className={classnames("section_slider", clientsSliderActive, section, ( subSection !== "none" ? subSection : "" ))}>
					{section !== "" && subSection !== "none" ? <SectionSlider main={section} sub={subSection} /> : null}
					<button className="close" onClick={() => { setClientsSliderActive("") }}>X</button>
				</div>
			</div>
		</Layout>
	)
}

export default IndexPage;

export const queryTiles = graphql `
	query Tiles {
		productsTiles: allFile(filter: { sourceInstanceName: {eq: "images"}, relativePath: {regex: "/^tile_products_/"}}) {
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
		programmaticTiles: allFile(filter: { sourceInstanceName: {eq: "images"}, relativePath: {regex : "/^tile_programmatic_/" }}) {
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
		verticalsTiles: allFile(filter: { sourceInstanceName: {eq: "images"}, relativePath: {regex : "/^tile_verticals_/" }}) {
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

	query Sections {
		slides: allMarkdownRemark {
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
`