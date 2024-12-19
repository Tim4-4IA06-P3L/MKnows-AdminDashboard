"use client";
import React, { useEffect, useState } from "react";

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
    <div className="flex flex-col justify-center items-center md:ml-[220px] p-8">
      <h1 className="text-3xl md:text-6xl font-bold">Halo, {username} !</h1>
    </div>
  );
};

export default page;
