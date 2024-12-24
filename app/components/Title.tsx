import React from "react";

const Title = ({ title }) => {
	return (
		<h1 className="text-2xl md:text-5xl font-bold self-start">{title}</h1>
	);
};

export default Title;