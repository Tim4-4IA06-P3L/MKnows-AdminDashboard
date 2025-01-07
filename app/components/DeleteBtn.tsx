import React, { FC } from "react";

const DeleteBtn: FC<{
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => void,
	value?: string,
	btnType?: "button" | "submit" | "reset" | undefined,
	width?: string,
	padding?: string,
	fontWeight?: string,
	text?: string
}> = ({ onClick, value, btnType, width, padding, fontWeight, text = "Delete" }) => {
	return (
		<button
			type={btnType}
			value={value} onClick={onClick}
			className={`bg-red-600 hover:bg-red-700 active:ring-offset-1 
			active:ring-neutral-100 active:ring-1 active:ring-offset-black 
			text-white rounded-md ${width} ${padding} ${fontWeight}`}
		>
			{text}
		</button>
	);
};

export default DeleteBtn;