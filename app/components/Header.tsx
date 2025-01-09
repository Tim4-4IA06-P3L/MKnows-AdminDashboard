"use client";
import React, { useState, useEffect } from "react";
import AdminLogo from "./AdminLogo";
import Avatar from "./Avatar";

const Header = () => {
	const [avatarURL, setAvatarURL] = useState("/Avatar101.jpg");

	const getAvatarURL = async () => {
		const res = await fetch('/api/avatar', {
			method: 'GET'
		});
		const res_json = await res.json();
		if (res_json.avatarURL != "") {
			setAvatarURL(`${res_json.avatarURL}`);
		} else {
			setAvatarURL("/Avatar101.jpg");
		}
	};

	useEffect(() => {
		getAvatarURL();
	}, []);

	return (
		<header className="fixed top-0 flex justify-between px-8 py-4 items-center h-[15%] w-full bg-[#242628] z-50">
			<AdminLogo containerClassName="w-32" />
			<Avatar PhotoURL={avatarURL} className="cursor-pointer border-[1px] border-white" href="/admin/me" />
		</header>
	);
};

export default Header;
