import React from "react";

const DeleteBtn = ({ onClick, value, btnType , width, padding, fontWeight }) => {
	return (
		<button
			type={btnType}
			value={value} onClick={onClick}
			className={`bg-red-600 hover:bg-red-700 active:ring-offset-1 
			active:ring-neutral-100 active:ring-1 active:ring-offset-black 
			text-white rounded-md ${width} ${padding} ${fontWeight}`}
		>
			Delete
		</button>
	);
};

export default DeleteBtn;