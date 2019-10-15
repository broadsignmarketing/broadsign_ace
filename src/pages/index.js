import React, { useState, useEffect} from "react";
import Slider from "react-slick";
import { graphql } from "gatsby";
import { Swipeable } from "react-swipeable";
import classnames from "classnames";

import Img from "gatsby-image/withIEPolyfill";
import SectionSlider from "../components/SectionSlider";

import "../styles/styles.css";

function IndexPage(props) {
	const {data} = props;
	const [section, setSection] = useState("products");
	const [subSection, setSubSection] = useState("none");
	const [clientsSliderActive, setClientsSliderActive] = useState("");
	const [slides, setSlides] = useState([]);

	const updateSections = (main, sub) => {
		setSection(main);
		setSubSection(sub);
	}

	const openSection = (main, sub) => {
		setClientsSliderActive("active");
		updateSections(main, sub);
	}

	const closeSections = () => {
		setClientsSliderActive("");
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
		const buildSlide = (s) => {
			const slideReturn = {
				"id" : s.id,
				"title" : s.frontmatter.title,
				"content" : s.html,
				"products" : s.frontmatter.categories.products,
				"verticals" : s.frontmatter.categories.verticals,
				"gallery" : s.frontmatter.gallery
			}

			return slideReturn;
		}

		const filterSlides = () => {
			let r = [];

			if (section === "programmatic") {
				r = data.slides.edges.map((s) => {
					const pattern = new RegExp("("+subSection.replace(/_/, ".")+")", "i");
					if (s.node.frontmatter.categories.programmatic && pattern.test(s.node.frontmatter.title)) {
						return buildSlide(s.node);
					}
					return false;
				});
			} else {
				r = data.slides.edges.map((s) => {
					if (s.node.frontmatter.categories[section] && s.node.frontmatter.categories[section].includes(subSection)) {
						return buildSlide(s.node);
					}
					return false;
				});
			}

			return r.filter(Boolean);
		}

		if (subSection !== "none") {
			setSlides(filterSlides(section, subSection));
		}
	}, [section, subSection, data.slides.edges]);

	useEffect(() => {
		/* Leave no trace of the fugly #offline below !!! */
		setTimeout(() => {
			const rem = document.querySelector("#offline");
			if (rem) { rem.parentNode.removeChild(rem); }
		}, 2000);
	});

	return (
		<div id="global">
			<div id="app">
				<Swipeable onSwipedUp={ () => setClientsSliderActive("active") } className="inner">
					<Slider {...sliderSettings}>
						<div className="slide products">
							<h1>Products</h1>
							<div className="tile_set">
								{data.productsTiles.edges.map((e, i) => {
									const subsection = e.node.relativePath.replace(".png", "").replace("tile_products_", "");
									return (
										<button id={subsection} className="tile" onClick={(e) => { openSection("products", subsection); }} key={e.node.childImageSharp.id}>
											<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" loading="eager" />
										</button>
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
										<button id={subsection} className="tile" onClick={(e) => { openSection("programmatic", subsection); }} key={e.node.childImageSharp.id}>
											<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" loading="eager" />
										</button>
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
										<button id={subsection} className="tile" onClick={(e) => { openSection("verticals", subsection); }} key={e.node.childImageSharp.id}>
											<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" loading="eager" />
										</button>
									)
								})}
							</div>
						</div>
					</Slider>
				</Swipeable>
				<Swipeable onSwipedDown={ () => closeSections() } onSwipedUp={ () => setClientsSliderActive("active") } className={classnames("section_slider", clientsSliderActive, section, ( subSection !== "none" ? subSection : "" ))}>
					{slides && slides.length > 0 ? <SectionSlider slides={slides} /> : null}
				</Swipeable>
				{/* To force a first load of all the images needed in the app */}
				<div id="offline">
					{data.slides.edges.map(s => {
						return s.node.frontmatter.gallery.map(i => <img src={i} alt="" />)
					})}
				</div>
			</div>
		</div>
	)
}

export default IndexPage;

export const queryTiles = graphql `
	query Tiles {
		productsTiles: allFile(filter: { sourceInstanceName: {eq: "images"}, relativePath: {regex: "/^tile_products_/"}}, sort: {fields: relativePath}) {
			edges {
				node {
					relativePath
					childImageSharp {
						id
						fluid {
							aspectRatio
							src
							srcSet
						}
					}
				}
			}
		}
		programmaticTiles: allFile(filter: { sourceInstanceName: {eq: "images"}, relativePath: {regex : "/^tile_programmatic_/" }}, sort: {fields: relativePath}) {
			edges {
				node {
					relativePath
					childImageSharp {
						id
						fluid {
							aspectRatio
							src
							srcSet
						}
					}
				}
			}
		}
		verticalsTiles: allFile(filter: { sourceInstanceName: {eq: "images"}, relativePath: {regex : "/^tile_verticals_/" }}, sort: {fields: relativePath}) {
			edges {
				node {
					relativePath
					childImageSharp {
						id
						fluid {
							aspectRatio
							src
							srcSet
						}
					}
				}
			}
		}

		slides: allMarkdownRemark(sort: {fields: frontmatter___title}) {
			edges {
				node {
					id
					html
					frontmatter {
						title
						gallery
						categories {
							programmatic
							products
							verticals
						}
					}
				}
			}
		}
	}
`