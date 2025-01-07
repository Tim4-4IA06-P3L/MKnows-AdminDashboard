import React, { FC } from "react";

const Title: FC<{ title: string }> = ({ title }) => {
	return (
		<h1 className="text-2xl md:text-5xl font-bold self-start">{title}</h1>
	);
};

export default Title;