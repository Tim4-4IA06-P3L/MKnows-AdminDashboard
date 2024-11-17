"use client";
import React, { useState } from "react";
import useViewportWidth from "./viewWidth";

const Sidebar = ({ logOut }) => {
	
	const [toggleDropMobile, setToggleDropMobile] = useState(0);
	
	const setActive = () => {
		setToggleDropMobile(toggleDropMobile == 0 ? 1 : 0);
	};
	
	const width = useViewportWidth();
	
  return (
    <aside className={`transition-transform duration-300 linear bg-[#242628] float-left 
				h-[90%] pr-8 w-[220px] flex flex-col justify-between fixed z-[100]
				${(width < 768 && toggleDropMobile == 0) ? "-translate-x-[100%]" : "translate-x-0"}`}>
			<div className={`cursor-pointer flex flex-col justify-center items-center
					space-y-1 bg-[#242628] h-8 w-10 p-2 left-[100%] ${width < 768 ? "absolute" : "hidden"}`}
					onClick={setActive}>
				<div className={`w-[90%] rounded-lg p-0.5 bg-[#FFFFFF] transform transition-transform duration-300 
						${toggleDropMobile == 1 ? "bg-red-500 translate-y-2 rotate-45":"bg-[#FFFFFF] translate-y-0 rotate-0"}`}></div>
				<div className={`w-[90%] rounded-lg p-0.5 bg-[#FFFFFF] transform transition-all duration-800 
						${toggleDropMobile == 1 ? "bg-red-500 opacity-0":"opacity-100"}`}></div>
				<div className={`w-[90%] rounded-lg p-0.5 bg-[#FFFFFF] transform transition-transform duration-300 
						${toggleDropMobile == 1 ? "bg-red-500 -translate-y-2 -rotate-45":"bg-[FFFFFF] translate-y-0 rotate-0"}`}></div>
			</div>
      <ul className="text-white font-semibold ml-8 mt-32 space-y-8">
        <li
          className="text-white font-semibold cursor-pointer w-max hover:text-green-500"
				>
					<a href="/dashboard" className="flex flex-row">
						<div className="h-6 w-6 mr-3">
							<svg
								viewBox="0 0 32 31"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M28.2734 9.87178C27.9411 9.19348 27.4021 8.6264 26.7268 8.24449L18.1001 3.15922C17.4674 2.78543 16.7378 2.5874 15.9934 2.5874C15.2491 2.5874 14.5195 2.78543 13.8868 3.15922L5.2601 8.24449C4.60615 8.64161 4.08733 9.21138 3.76677 9.88449C3.43377 10.5576 3.32221 11.311 3.44677 12.0457L5.68677 24.7589C5.83041 25.6454 6.30366 26.4532 7.0201 27.0346C7.73086 27.6022 8.62635 27.9168 9.55344 27.9245H22.3801C23.3255 27.9286 24.2419 27.6134 24.9668 27.0346C25.687 26.4561 26.1611 25.647 26.3001 24.7589L28.5401 12.0457C28.6759 11.3118 28.5832 10.556 28.2734 9.87178ZM20.4601 22.2036H11.5401C11.1865 22.2036 10.8473 22.0696 10.5973 21.8312C10.3472 21.5928 10.2068 21.2694 10.2068 20.9322C10.2068 20.5951 10.3472 20.2717 10.5973 20.0333C10.8473 19.7949 11.1865 19.6609 11.5401 19.6609H20.4601C20.8137 19.6609 21.1529 19.7949 21.4029 20.0333C21.653 20.2717 21.7934 20.5951 21.7934 20.9322C21.7934 21.2694 21.653 21.5928 21.4029 21.8312C21.1529 22.0696 20.8137 22.2036 20.4601 22.2036Z"
									fill="currentColor"
								/>
							</svg>
						</div>
						<p>Dashboard</p>
					</a>
				</li>
        <li
					className="text-white font-semibold cursor-pointer w-max hover:text-green-500"
				>
					<a href="/our-programs" className="flex flex-row">
						<div className="h-6 w-6 mr-3">
							<svg
								viewBox="0 0 32 33"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16.0001 29.8449C14.1556 29.8449 12.4223 29.4947 10.8001 28.7943C9.17786 28.0938 7.76675 27.1441 6.56675 25.945C5.36675 24.7458 4.41697 23.3347 3.71742 21.7116C3.01786 20.0885 2.66764 18.3552 2.66675 16.5116C2.66586 14.6681 3.01608 12.9347 3.71742 11.3116C4.41875 9.68851 5.36853 8.27739 6.56675 7.07828C7.76497 5.87917 9.17608 4.92939 10.8001 4.22895C12.4241 3.52851 14.1574 3.17828 16.0001 3.17828C17.8427 3.17828 19.5761 3.52851 21.2001 4.22895C22.8241 4.92939 24.2352 5.87917 25.4334 7.07828C26.6316 8.27739 27.5819 9.68851 28.2841 11.3116C28.9863 12.9347 29.3361 14.6681 29.3334 16.5116C29.3308 18.3552 28.9805 20.0885 28.2828 21.7116C27.585 23.3347 26.6352 24.7458 25.4334 25.945C24.2316 27.1441 22.8205 28.0943 21.2001 28.7956C19.5796 29.4969 17.8463 29.8467 16.0001 29.8449ZM9.46675 18.4449L11.8667 17.2449L9.20008 11.9116L6.80008 13.1116L9.46675 18.4449ZM12.6667 24.5116H15.3334V14.8783L12.5334 9.24495L10.1334 10.4449L12.6667 15.5116V24.5116ZM16.6667 24.5116H19.3334V15.4783L21.8667 10.4449L19.4668 9.24495L16.6667 14.8449V24.5116ZM22.5334 18.4449L25.2001 13.1116L22.8001 11.9116L20.1334 17.2449L22.5334 18.4449Z"
									fill="currentColor"
								/>
							</svg>
						</div>
						<p>Our Programs</p>
					</a>
				</li>
        <li
					className="text-white font-semibold cursor-pointer w-max hover:text-green-500"
				>
					<a href="/schedule" className="flex flex-row">
						<div className="h-6 w-6 mr-3">
							<svg
								viewBox="0 0 32 33"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20 17.845V22.765L24.2533 25.2183L25.2533 23.485L22 21.605V17.845H20ZM12 29.845L14.4933 28.1916C15.3641 29.1365 16.4218 29.8899 17.5993 30.404C18.7769 30.9182 20.0485 31.1819 21.3333 31.1783C26.4933 31.1783 30.6667 27.005 30.6667 21.845C30.6667 19.2983 29.6533 16.9916 28 15.3116V4.51163H4V29.845L8 27.1783L12 29.845ZM21.3333 28.5116C17.6533 28.5116 14.6667 25.525 14.6667 21.845C14.6667 18.165 17.6533 15.1783 21.3333 15.1783C25.0133 15.1783 28 18.165 28 21.845C28 25.525 25.0133 28.5116 21.3333 28.5116Z"
									fill="currentColor"
								/>
							</svg>
						</div>
						<p>Schedule</p>
					</a>
				</li>
      </ul>
      <ul>
        <li
          onClick={(e) => logOut(e)}
          className="flex flex-row ml-8 my-16 text-white font-semibold cursor-pointer w-max hover:text-red-500"
        >
					<div className="h-6 w-6 mr-3">
						<svg
							viewBox="0 0 32 33"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.3333 11.1783V8.51164C13.3333 7.80439 13.6142 7.12612 14.1143 6.62602C14.6144 6.12592 15.2927 5.84497 15.9999 5.84497H25.3333C26.0405 5.84497 26.7188 6.12592 27.2189 6.62602C27.719 7.12612 27.9999 7.80439 27.9999 8.51164V24.5116C27.9999 25.2189 27.719 25.8972 27.2189 26.3973C26.7188 26.8974 26.0405 27.1783 25.3333 27.1783H15.9999C15.2927 27.1783 14.6144 26.8974 14.1143 26.3973C13.6142 25.8972 13.3333 25.2189 13.3333 24.5116V21.845"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M20 16.5116H4M4 16.5116L8 12.5116M4 16.5116L8 20.5116"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
          <p>Log Out</p>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
