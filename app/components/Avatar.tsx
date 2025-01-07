import React, { FC } from "react";

const Avatar: FC<{ PhotoURL: string, className: string, href?: string }> = ({ PhotoURL, className, href }) => {
	return (
		<>
			{!href ?
				<div
					className={`w-8 h-8 sm:w-16 sm:h-16 rounded-[50%] bg-contain bg-center ${className} bg-no-repeat`}
					style={{ backgroundImage: `url('${PhotoURL}')` }}>
				</div> :

				<a href={href}
					className={`w-8 h-8 sm:w-16 sm:h-16 rounded-[50%] bg-contain bg-center ${className} bg-no-repeat`}
					style={{ backgroundImage: `url('${PhotoURL}')` }}>
				</a>
			}
		</>
	);
};

export default Avatar;