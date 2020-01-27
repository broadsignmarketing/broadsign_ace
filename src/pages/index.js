import React, { useState, useEffect} from "react";
import Helmet from "react-helmet"
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
		document.querySelector(".section_slider").click();
	}

	const closeSections = () => {
		setClientsSliderActive("");
	}

	const clickTile = (tile, main, sub) => {
		tile.classList.add("active");
		openSection(main, sub);
		setTimeout(() => {
			Object.values(document.getElementsByClassName("tile")).forEach((e) => {
				e.classList.remove("active")
			});
		}, 1000);
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

			const mainSlider = document.querySelector(".main_slider");
			mainSlider.focus();
		}, 2000);
	}, []);

	return (
		<div id="global">
			<Helmet title="Broadsign Ace" defer={false} />
			<div id="app">
				<Swipeable onSwipedUp={ () => setClientsSliderActive("active") } className="inner">
					<Slider id="main_slider" name="main_slider" {...sliderSettings}>
						<div className="slide products" key="products">
							<h1>Products</h1>
							<div className="tile_set">
								{data.productsTiles.edges.map((e, i) => {
									const subsection = e.node.relativePath.replace(".png", "").replace("tile_products_", "").replace("others_", "");
									if (e && e.node && e.node.childImageSharp && e.node.childImageSharp.fluid) {
										return (
											<button id={subsection} className="tile" onClick={(e) => { clickTile(e.target, "products", subsection); }} key={e.node.childImageSharp.id}>
												<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" loading="eager" />
											</button>
										);
									}
									return null;
								})}
							</div>
						</div>
						<div className="slide programmatic" key="programmatic">
							<h1>Programmatic</h1>
							<div className="tile_set">
								{data.programmaticTiles.edges.map((e) => {
									const subsection = e.node.relativePath.replace(".png", "").replace("tile_programmatic_", "");
									if (e && e.node && e.node.childImageSharp && e.node.childImageSharp.fluid) {
										return (
											<button id={subsection} className="tile" onClick={(e) => { clickTile(e.target, "programmatic", subsection); }} key={e.node.childImageSharp.id}>
												<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" loading="eager" />
											</button>
										);
									}
									return null;
								})}
							</div>
						</div>
						<div className="slide verticals" key="verticals">
							<h1>Verticals</h1>
							<div className="tile_set">
								{data.verticalsTiles.edges.map((e) => {
									const subsection = e.node.relativePath.replace(".png", "").replace("tile_verticals_", "");
									if (e && e.node && e.node.childImageSharp && e.node.childImageSharp.fluid) {
										return (
											<button id={subsection} className="tile" onClick={(e) => { clickTile(e.target, "verticals", subsection); }} key={e.node.childImageSharp.id}>
												<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" loading="eager" />
											</button>
										);
									}
									return null;
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
					{data.slides.edges.map((s) => {
						return s.node.frontmatter.gallery.map((i, key) => <img src={i} alt="" key={"cache-"+key} />)
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
							sizes
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
							sizes
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
							sizes
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