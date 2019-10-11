import React, { useState, useEffect } from "react";
import classnames from "classnames";

function ClientSlide(props) {
	const {content, gallery, products, verticals} = props;

	const [currentImg, setCurrentImg] = useState(0);

	console.log(props);

	return (
		<div className="client_slide">
			<div className="hero">
				{gallery.map((img, index) => {
					return (<img src={img} className={classnames("bg", (index === currentImg ? "active" : ""))} key={"bg_"+index} />)
				})}
				<div className="gallery">
					{gallery.map((img, index) => {
						return (<img src={img} className={classnames("thumb", (index === currentImg ? "active" : ""))} key={"tb"+index} onClick={() => { setCurrentImg(index) }} />)
					})}
				</div>
			</div>
			<div className="content">
				<h3>Slides :</h3>
				<h3>Current Slide :</h3>
			</div>
		</div>
	)
}

export default ClientSlide;