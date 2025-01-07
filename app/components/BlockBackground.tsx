import React, { FC, ReactNode } from "react";

const BlockBackground: FC<{ children: ReactNode, bgColor: string }> = ({ children, bgColor }) => {
	return (
		<div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center ${bgColor} z-[200]`}>
			{children}
		</div>
	);
};

export default BlockBackground;