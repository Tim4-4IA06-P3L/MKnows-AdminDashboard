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
					priority={true}
					src="/MKnows_Admin.png"
					alt="M-Knows Logo"
					style={{
						objectFit: "contain"
					}}
				/>
			</div>
			<div className="flex flex-row justify-end items-center space-x-8">
				<div className="cursor-pointer text-white hover:text-yellow-500 w-8 h-8">
					<svg
						viewBox="0 0 35 36"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M30.7804 23.075C30.1325 22.5208 29.7595 21.7109 29.7596 20.8583V13.8292C29.7596 8.06875 24.5387 3.41666 18.0929 3.41666C11.6471 3.41666 6.42625 8.06875 6.42625 13.8292V20.8583C6.4263 21.7109 6.05331 22.5208 5.40541 23.075C3.20333 25.0437 4.76375 28.3979 7.88458 28.3979H13.4262C14.1333 30.3672 16.0005 31.6808 18.0929 31.6808C20.1853 31.6808 22.0525 30.3672 22.7596 28.3979H28.3012C31.4221 28.3979 32.9825 25.0437 30.7804 23.075ZM18.0929 29.4917C17.2249 29.4884 16.4069 29.0848 15.8762 28.3979H20.2512C19.7374 29.074 18.9419 29.4771 18.0929 29.4917ZM28.3158 26.2104C28.846 26.2584 29.3508 25.9741 29.5846 25.4958C29.6981 25.2077 29.5948 24.8795 29.3367 24.7083C28.2379 23.7282 27.6027 22.3307 27.5867 20.8583V13.8292C27.5867 9.29375 23.3283 5.60416 18.1075 5.60416C12.8867 5.60416 8.62833 9.29375 8.62833 13.8292V20.8583C8.61234 22.3307 7.9771 23.7282 6.87833 24.7083C6.61484 24.8751 6.50511 25.2043 6.61583 25.4958C6.84959 25.9741 7.35438 26.2584 7.88458 26.2104H28.3158Z"
							fill="currentColor"
						/>
					</svg>
				</div>
				<a className="cursor-pointer rounded-[50%] w-8 h-8 bg-contain bg-center border-[1px] border-white" 
					style={{ backgroundImage: `url('${avatarURL}')` }}
					href="/me">
				</a>
			</div>
    </header>
  );
};

export default Header;
