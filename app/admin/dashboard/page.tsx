"use client";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";

const page = () => {
	const [username, setUsername] = useState("");
	
	const getUsername = async () => {
		const response = await fetch('/api/me', { method: 'GET'});
		const res_json = await response.json();
		setUsername(res_json.username);
	};
	
	useEffect(() => {
		getUsername();
	}, []);
	
  return (
    <>
			<Title title={`Halo, ${username} !`} />
			<Title title="ANDA LIBUR, SAYA LEMBUR" />
    </>
  );
};

export default page;
