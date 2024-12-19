"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Header = () => {
	const [avatarURL, setAvatarURL] = useState("/Avatar101.jpg");
	
	const getAvatarURL = async () => {
		const res = await fetch('/api/avatar', {
			method: 'GET'
		});
		const res_json = await res.json();
		if (res_json.avatarURL != "") {
			setAvatarURL(`${process.env.STRAPI_URL}${res_json.avatarURL}`);
		} else {
			setAvatarURL("/Avatar101.jpg");
		}
	};
	
	useEffect(() => {
		getAvatarURL();
	}, []);
	
  return (
    <header className="sticky top-0 flex justify-between px-8 items-center h-[15%] w-full bg-[#242628] z-50">
			<div className="w-32">
				<Image
					width={500}
					height={300}
					priority
					src="/MKnows_Admin.png"
					alt="M-Knows Logo"
					style={{
						objectFit: "contain"
					}}
				/>
			</div>
			<a className="cursor-pointer rounded-[50%] w-12 h-12 bg-contain bg-center border-[1px] border-white" 
				style={{ backgroundImage: `url('${avatarURL}')` }}
				href="/me">
			</a>
    </header>
  );
};

export default Header;
