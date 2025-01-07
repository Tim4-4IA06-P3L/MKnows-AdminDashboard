import React, { FC } from "react";

const Toast: FC<{
	error?: boolean,
	message: string
}> = ({ error = true, message }) => {
	return (
		<div
			className={`fixed p-3 text-center font-bold rounded-xl shadow-lg z-[100]
			top-20 right-8 animate-slide-up ${error ? "bg-red-200 text-red-600" : "bg-green-200 text-green-600"}`}
		>
			{message}
		</div>
	);
}

export default Toast;