import React, { FC } from "react";
import Image from "next/image";

const Thumbnail: FC<{
	src: string,
	width: number,
	height: number,
	objectFit: "contain" | "cover" | "fill" | "none" | "scale-down",
	objectPosition: string
}> = ({ src, width, height, objectFit, objectPosition }) => {
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