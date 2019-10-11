import React, { useState, useEffect } from "react";
import classnames from "classnames";

function ClientSlide(props) {
	const {title, content, gallery, products, verticals} = props;

	const [currentImg, setCurrentImg] = useState(0);

	console.log(gallery);

	return (
		<div className="client_slide">
			<div className="hero">
				{gallery.map((img, index) => {
					return (<img src={img} className={classnames("bg", (index === currentImg ? "active" : ""))} key={"bg_"+index} />)
				})}
				{ gallery.length > 1 && (
					<div className="gallery">
						{gallery.map((img, index) => {
							return (<img src={img} className={classnames("thumb", (index === currentImg ? "active" : ""))} key={"tb"+index} onClick={() => { setCurrentImg(index) }} />)
						})}
					</div>
				)}
			</div>
			<div className="content">
				<h1>{title}</h1>
				<div className="text" dangerouslySetInnerHTML={{__html: content}} />
			</div>
		</div>
	)
}

export default ClientSlide;