import React, { useEffect } from "react";

const Toast = ( {message, onClose} ) => {

	useEffect(() => {
		const timer = setTimeout(onClose, 5000);
		return () => clearTimeout(timer);
	}, []);
	
	return (
		<div className="absolute p-3 text-center bg-red-200 text-red-600 font-bold rounded-xl shadow-lg top-10 right-10 animate-slide-up">
			{message}
		</div>
	);
}

export default Toast;