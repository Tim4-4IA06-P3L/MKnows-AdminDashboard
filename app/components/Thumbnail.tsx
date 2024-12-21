import React from "react";
import Image from "next/image";

const Thumbnail = ({ src, width, height, objectFit, objectPosition}) => {
	return (
		<Image 
			src={src}
			width={width}
			height={height}
			style={{
				objectFit: `${objectFit}`,
				objectPosition: `${objectPosition}`,
				width: "100%",
				height: "auto",
			}}
			alt="Thumbnail"
		/>
	);
};

export default Thumbnail;