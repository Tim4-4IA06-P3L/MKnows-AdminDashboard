"use client";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";

const Page = () => {
	const [username, setUsername] = useState("");

	const getUsername = async () => {
		const response = await fetch('/api/me', { method: 'GET' });
		const res_json = await response.json();
		setUsername(res_json.username ? `Halo, ${res_json.username}` : "Halo, Admin");
	};

	useEffect(() => {
		getUsername();
	}, []);

	return (
		<>
			<Title title={username} />
		</>
	);
};

export default Page;
