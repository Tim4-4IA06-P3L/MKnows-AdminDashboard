import React, { FC } from "react";

const EditBtn: FC<{
	href?: string,
	btnType?: "button" | "reset" | "submit" | undefined,
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => void,
	value?: string,
	padding?: string,
	width?: string,
	fontWeight?: string,
}> = ({ href, btnType, value, onClick, padding, width, fontWeight }) => {
	return (
		<>
			{href ?
				<a href={href}
					className={`bg-sky-600 hover:bg-sky-700 active:ring-offset-1 
					active:ring-neutral-100 active:ring-1 active:ring-offset-black 
					text-white text-center rounded-md ${padding} ${width} ${fontWeight}`}
				>
					Edit
				</a> :

				<button type={btnType} value={value} onClick={onClick}
					className={`bg-sky-600 hover:bg-sky-700 active:ring-offset-1 
					active:ring-neutral-100 active:ring-1 active:ring-offset-black 
					text-white text-center rounded-md ${padding} ${width} ${fontWeight}`}
				>
					Edit
				</button>
			}
		</>
	);
};

export default EditBtn;