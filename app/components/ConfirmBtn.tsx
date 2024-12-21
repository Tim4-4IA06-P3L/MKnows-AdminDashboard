import React from "react";

const ConfirmBtn = ({ onClick, btnType, href, padding, fontWeight, text }) => {
	return (
		<>
			{!href ?
				<button onClick={onClick} type={btnType}
					className={`${padding} ${fontWeight} bg-[#b3ff00] text-black hover:bg-[#9ee004] cursor-pointer 
					active:ring-offset-2 active:ring-2 active:ring-neutral-800 rounded-md`}
				>
						{text}
				</button> :
				
				<a href={href}
					className={`${padding} ${fontWeight} bg-[#b3ff00] text-black hover:bg-[#9ee004] cursor-pointer 
					active:ring-offset-2 active:ring-2 active:ring-neutral-800 rounded-md`}
				>
						{text}
				</a>
			}
		</>
	);
};

export default ConfirmBtn;