import React from "react";

const Avatar = ({ PhotoURL, className, href }) => {
	return (
		<>
			{!href ?
				<div 
					className={`w-8 h-8 sm:w-16 sm:h-16 rounded-[50%] bg-contain bg-center ${className}`}
					style={{ backgroundImage: `url('${PhotoURL}')` }}>
				</div> :
				
				<a href={href}
					className={`w-8 h-8 sm:w-16 sm:h-16 rounded-[50%] bg-contain bg-center ${className}`}
					style={{ backgroundImage: `url('${PhotoURL}')` }}>
				</a>
			}
		</>
	);
};

export default Avatar;