import React, { FC } from "react";

const CancelBtn: FC<{
	padding?: string,
	fontWeight?: string,
	onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
	text?: string,
	href?: string
}> = ({ padding, fontWeight, onClick, text = "Cancel", href }) => {
	return (
		<>
			{!href ?
				<div onClick={onClick}
					className={`${padding} ${fontWeight} bg-white text-black hover:bg-neutral-200 cursor-pointer
					active:ring-offset-2 active:ring-2 active:ring-neutral-800 rounded-md 
					border-[2px] border-neutral-800`}
				>
					{text}
				</div> :

				<a href={href}
					className={`${padding} ${fontWeight} bg-white text-black hover:bg-neutral-200 cursor-pointer
					active:ring-offset-2 active:ring-2 active:ring-neutral-800 rounded-md 
					border-[2px] border-neutral-800`}
				>
					{text}
				</a>
			}
		</>
	);
};

export default CancelBtn;