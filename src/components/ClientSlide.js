import React, { useState, useEffect } from "react";
import classnames from "classnames";

export default function ClientSlide(props) {
	const {id, title, content, gallery, products /*, verticals */ } = props;
	const [currentImg, setCurrentImg] = useState(0);
	const [slideFontSize, setSlideFontSize] = useState(100);
	const [slideTitleFontSize, setSlideTitleFontSize] = useState(72);
	const productsList = (products && products.length > 0 ? products.join(", ").replace(/_/g, " ") : []);

	useEffect(() => {
		const adjustFontSizes = () => {
			const adjustGeneralFontSizes = async () => {
				const domMaxHeight = 768;
				const domTextHeight = document.querySelector("#slide_"+id+" .content").offsetHeight;

				if (domTextHeight > domMaxHeight) {
					setSlideFontSize(slideFontSize-1);
				}
			}

			const adjustTitleFontSizes = async () => {
				const domMaxWitdh = document.querySelector("#slide_"+id+" .content .text").offsetWidth;
				const domTitleWidth = document.querySelector("#slide_"+id+" h1").offsetWidth;

				if (domTitleWidth > domMaxWitdh) {
					setSlideTitleFontSize(slideTitleFontSize-1);
				}
			}

			// adjustGeneralFontSizes();
			adjustTitleFontSizes();
		}

		setTimeout(() => { adjustFontSizes() }, 50);
	}, [id, title, slideFontSize, slideTitleFontSize]);

	useEffect(() => {
		if (currentImg > gallery.length) {
			setCurrentImg(0);
		}
	}, [currentImg, gallery.length]);

	return (
		<div className="client_slide" id={"slide_"+id}>
			<div className="hero">
				{gallery.map((img, index) => {
					return (<img src={img} className={classnames("bg", (index === currentImg ? "active" : ""))} key={"bg_"+index} alt="" />)
				})}
				{ gallery.length > 1 && (
					<div className="gallery">
						{gallery.map((img, index) => {
							return (<img src={img} className={classnames("thumb", (index === currentImg ? "active" : ""))} key={"tb"+index} alt="" onClick={() => { setCurrentImg(index) }} />)
						})}
					</div>
				)}
			</div>
			<div className="content" style={{fontSize: slideFontSize+"px"}}>
				<h1 style={{fontSize: (slideTitleFontSize/100)+"em"}}>{title}</h1>
				<div className="text" dangerouslySetInnerHTML={{__html: content}} />
				<div className="text products">
					<h2>Products</h2>
					<p>{productsList}</p>
				</div>
			</div>
		</div>
	)
}