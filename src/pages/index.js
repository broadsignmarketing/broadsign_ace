import React, { useState/*, useEffect*/ } from "react";
import Slider from "react-slick";
import { graphql } from "gatsby";
import { Swipeable } from "react-swipeable";
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
	const [slides, setSlides] = useState(null);

	const updateSections = (main, sub) => {
		setSection(main);
		setSubSection(sub);

		if (subSection === "none") {
			setClientsSliderActive("");
		} else {
			setClientsSliderActive("active");
			setSlides(filterSlides(section, subSection));
		}
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

	const filterSlides = () => {
		const r = data.slides.edges.map((s) => {
			if (s.node.frontmatter.categories[section] && s.node.frontmatter.categories[section].includes(subSection)) {
				const mapReturn = {
					"title" : s.node.frontmatter.title,
					"content" : s.node.internal.content,
					"products" : s.node.frontmatter.categories.products,
					"verticals" : s.node.frontmatter.categories.verticals,
					"gallery" : s.node.frontmatter.gallery
				}
				return mapReturn;
			}
			return false;
		});

		return r.filter(Boolean);
	}

	return (
		<Layout className="Blah">
			<div id="app">
				<div className="inner">
					<Slider {...sliderSettings}>
						<div className="slide products">
							<h1>Products</h1>
							<div className="tile_set">
								{data.productsTiles.edges.map((e, i) => {
									const subsection = e.node.relativePath.replace(".png", "").replace("tile_products_", "");
									return (
										<a href="?section=something" className="tile" onClick={(e) => { e.preventDefault(); updateSections("products", subsection); }} key={e.node.childImageSharp.id}>
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
										<a href="?section=something" className="tile" onClick={(e) => { e.preventDefault(); updateSections("programmatic", subsection); }} key={e.node.childImageSharp.id}>
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
										<a href="?section=something" className="tile" onClick={(e) => { e.preventDefault(); updateSections("verticals", subsection); }} key={e.node.childImageSharp.id}>
											<Img fluid={e.node.childImageSharp.fluid} objectFit="contain" />
										</a>
									)
								})}
							</div>
						</div>
					</Slider>
				</div>
				<Swipeable onSwipedDown={ () => setClientsSliderActive("") } className={classnames("section_slider", clientsSliderActive, section, ( subSection !== "none" ? subSection : "" ))}>
					{slides && slides.length > 0 ? <SectionSlider slides={slides} /> : null}
				</Swipeable>
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
		programmaticTiles: allFile(filter: { sourceInstanceName: {eq: "images"}, relativePath: {regex : "/^tile_programmatic_/" }}) {
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
		verticalsTiles: allFile(filter: { sourceInstanceName: {eq: "images"}, relativePath: {regex : "/^tile_verticals_/" }}) {
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

		slides: allMarkdownRemark {
			edges {
				node {
					internal {
						content
					}
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