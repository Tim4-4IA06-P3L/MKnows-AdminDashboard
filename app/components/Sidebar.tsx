import React from "react";

const Sidebar = ( {logOut} ) => {
	return (
		<aside className="relative bg-stone-950 float-left h-[90%] w-[20%] flex flex-col justify-between top-0">
			<ul className="text-white ml-8 mt-32 space-y-8">
				<li>Dashboard</li>
				<li>Our Programs</li>
				<li>Schedule</li>
			</ul>
			<ul>
				<li onClick={ (e) => logOut(e)} className="ml-8 my-16 text-white cursor-pointer">Log Out</li>
			</ul>
		</aside>
	);
};

export default Sidebar;