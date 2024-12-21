import React from "react";

const BlockBackground = ({children, bgColor}) => {
	return (
		<div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center ${bgColor} z-[100]`}>
			{children}
		</div>
	);
};

export default BlockBackground;