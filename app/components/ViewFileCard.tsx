import React from "react";

const ViewFileCard = ({ href, size }) => {
	return (
		<a href={href} target="_blank"
			className={`absolute ${size} text-white
			flex justify-center items-center 
			transition-all linear duration-300 
			opacity-0 hover:bg-neutral-800/[0.8] hover:opacity-100 z-[100]`}>
			View
		</a>
	);
};

export default ViewFileCard;