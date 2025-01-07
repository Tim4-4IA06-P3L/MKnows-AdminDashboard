import React, { FC } from "react";

const ConfirmBtn: FC<{
	value?: string,
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	btnType?: "submit" | "reset" | "button" | undefined,
	href?: string,
	padding?: string,
	fontWeight?: string,
	text?: string
}> = ({ value, onClick, btnType, href, padding, fontWeight, text }) => {
	return (
		<>
			{!href ?
				<button onClick={onClick} type={btnType} value={value}
					className={`${padding} ${fontWeight} bg-[#b3ff00] w-max text-black hover:bg-[#9ee004] cursor-pointer 
					active:ring-offset-2 active:ring-2 active:ring-neutral-800 rounded-md`}
				>
					{text}
				</button> :

				<a href={href}
					className={`${padding} ${fontWeight} bg-[#b3ff00] w-max text-black hover:bg-[#9ee004] cursor-pointer 
					active:ring-offset-2 active:ring-2 active:ring-neutral-800 rounded-md`}
				>
					{text}
				</a>
			}
		</>
	);
};

export default ConfirmBtn;