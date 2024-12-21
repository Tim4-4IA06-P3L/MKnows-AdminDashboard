import React from "react";

const NoContentBox = ({ message }) => {
	return (
		<section className="flex justify-center mt-8">
			<div className="p-8 bg-neutral-200 rounded-lg">
				<p className="font-semibold">{message}</p>
			</div>
		</section>
	);
};

export default NoContentBox;