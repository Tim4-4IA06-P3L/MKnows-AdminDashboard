"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import useViewportWidth from "./viewWidth";

const Sidebar: FC<{ logOut: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void }> = ({ logOut }) => {

	const [toggleDropMobile, setToggleDropMobile] = useState(0);

	const setActive = () => {
		setToggleDropMobile(toggleDropMobile == 0 ? 1 : 0);
	};

	const width = useViewportWidth();

	return (
		<aside className={`transition-transform duration-300 linear bg-[#242628] float-left
				h-[90%] top-[15%] pr-8 w-[220px] flex flex-col justify-between fixed z-[100]
				${(width < 768 && toggleDropMobile == 0) ? "-translate-x-[100%]" : "translate-x-0"}`}>
			<div className={`cursor-pointer flex flex-col justify-center items-center
					space-y-1 bg-[#242628] h-8 w-10 p-2 left-[100%] ${width < 768 ? "absolute" : "hidden"}
					${toggleDropMobile == 1 ? "opacity-100" : "opacity-20"}`}
				onClick={setActive}>
				<div className={`w-[90%] rounded-lg p-0.5 bg-[#FFFFFF] transform transition-transform duration-300 
						${toggleDropMobile == 1 ? "bg-red-500 translate-y-2 rotate-45" : "bg-[#FFFFFF] translate-y-0 rotate-0"}`}></div>
				<div className={`w-[90%] rounded-lg p-0.5 bg-[#FFFFFF] transform transition-all duration-800 
						${toggleDropMobile == 1 ? "bg-red-500 opacity-0" : "opacity-100"}`}></div>
				<div className={`w-[90%] rounded-lg p-0.5 bg-[#FFFFFF] transform transition-transform duration-300 
						${toggleDropMobile == 1 ? "bg-red-500 -translate-y-2 -rotate-45" : "bg-[FFFFFF] translate-y-0 rotate-0"}`}></div>
			</div>
			<ul className="text-white font-semibold ml-8 mt-16 space-y-8">
				<li
					className="text-white font-semibold cursor-pointer w-max hover:text-green-500"
				>
					<Link href="/admin/dashboard" className="flex flex-row">
						<div className="h-6 w-6 mr-3">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
								<path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"
									fill="currentColor"></path>
							</svg>
						</div>
						<p>Dashboard</p>
					</Link>
				</li>
				<li
					className="text-white font-semibold cursor-pointer w-max hover:text-green-500"
				>
					<Link href="/admin/our-programs" className="flex flex-row">
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
					</Link>
				</li>
				<li
					className="text-white font-semibold cursor-pointer w-max hover:text-green-500"
				>
					<Link href="/admin/our-trainings" className="flex flex-row">
						<div className="h-6 w-6 mr-3">
							<svg
								fill="currentColor"
								version="1.1"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 496 496">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<g>
										<g>
											<g>
												<path d="M432,336h-10.84c16.344-13.208,26.84-33.392,26.84-56v-32c0-30.872-25.128-56-56-56h-32c-2.72,0-5.376,0.264-8,0.64V48 h16V0H0v48h16v232H0v48h187.056l40,80H304v88h192v-96C496,364.712,467.288,336,432,336z M422.584,371.328l-32.472,13.92 L412.28,352h5.472L422.584,371.328z M358.944,352h34.112L376,377.576L358.944,352z M361.872,385.248l-32.472-13.92L334.24,352 h5.472L361.872,385.248z M432.008,280C432,310.872,406.872,336,376,336s-56-25.128-56-56h37.424 c14.12,0,27.392-5.504,37.368-15.48l4.128-4.128c8.304,10.272,20.112,16.936,33.088,18.92V280z M48,192v72h107.176 c0.128,0.28,0.176,0.584,0.312,0.856L163.056,280H32V48h304v149.48c-18.888,9.008-32,28.24-32,50.52v32h-65.064l-24.816-46.528 C208.368,222.696,197.208,216,185,216c-10.04,0-18.944,4.608-25,11.712V192H48z M144,208v40H64v-40H144z M360,208h32 c22.056,0,40,17.944,40,40v15.072c-9.168-2.032-17.32-7.48-22.656-15.48l-8.104-12.152l-17.768,17.768 c-6.96,6.96-16.208,10.792-26.048,10.792H320v-16C320,225.944,337.944,208,360,208z M16,16h336v16H16V16z M16,312v-16h155.056 l8,16H16z M256,392h-19.056L169.8,257.712c-1.176-2.36-1.8-4.992-1.8-7.608V249c0-9.376,7.624-17,17-17c6.288,0,12.04,3.456,15,9 l56,104.992V392z M247.464,296h58.392c1.28,5.616,3.232,10.968,5.744,16H256L247.464,296z M264.536,328h57.952 c2.584,2.872,5.352,5.568,8.36,8H268.8L264.536,328z M480,480h-32v-32h32V480z M480,432h-32v-32h-16v80H320v-88h-48v-40h45.76 l-7.168,28.672L376,408.704l65.416-28.032l-7.144-28.56C459.68,353.312,480,374.296,480,400V432z">
												</path>
												<path d="M160,128v-16h-16.808c-1.04-5.096-3.072-9.832-5.856-14.024l11.92-11.92l-11.312-11.312l-11.92,11.92 c-4.192-2.784-8.928-4.816-14.024-5.856V64H96v16.808c-5.096,1.04-9.832,3.072-14.024,5.856l-11.92-11.92L58.744,86.056 l11.92,11.92c-2.784,4.192-4.816,8.928-5.856,14.024H48v16h16.808c1.04,5.096,3.072,9.832,5.856,14.024l-11.92,11.92 l11.312,11.312l11.92-11.92c4.192,2.784,8.928,4.816,14.024,5.856V176h16v-16.808c5.096-1.04,9.832-3.072,14.024-5.856 l11.92,11.92l11.312-11.312l-11.92-11.92c2.784-4.192,4.816-8.928,5.856-14.024H160z M104,144c-13.232,0-24-10.768-24-24 s10.768-24,24-24s24,10.768,24,24S117.232,144,104,144z">
												</path>
												<polygon points="244.28,80 272,80 272,64 235.72,64 203.72,112 176,112 176,128 212.28,128 "></polygon>
												<rect x="288" y="64" width="32" height="16"></rect>
												<path d="M224,144h-48v48h48V144z M208,176h-16v-16h16V176z"></path>
												<rect x="240" y="160" width="32" height="16"></rect>
												<rect x="288" y="160" width="32" height="16"></rect>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</div>
						<p>Our Trainings</p>
					</Link>
				</li>
				<li
					className="text-white font-semibold cursor-pointer w-max hover:text-green-500"
				>
					<Link href="/admin/categories" className="flex flex-row">
						<div className="h-6 w-6 mr-3">
							<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"
										fill="currentColor"></path>
								</g>
							</svg>
						</div>
						<p>Categories</p>
					</Link>
				</li>
				<li
					className="text-white font-semibold cursor-pointer w-max hover:text-green-500"
				>
					<Link href="/admin/uploads" className="flex flex-row">
						<div className="h-6 w-6 mr-3">
							<svg viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11.8107L14.4697 13.5303C14.7626 13.8232 15.2374 13.8232 15.5303 13.5303C15.8232 13.2374 15.8232 12.7626 15.5303 12.4697L12.5303 9.46967C12.3897 9.32902 12.1989 9.25 12 9.25C11.8011 9.25 11.6103 9.32902 11.4697 9.46967L8.46967 12.4697C8.17678 12.7626 8.17678 13.2374 8.46967 13.5303C8.76256 13.8232 9.23744 13.8232 9.53033 13.5303L11.25 11.8107V17C11.25 17.4142 11.5858 17.75 12 17.75ZM8 7.75C7.58579 7.75 7.25 7.41421 7.25 7C7.25 6.58579 7.58579 6.25 8 6.25H16C16.4142 6.25 16.75 6.58579 16.75 7C16.75 7.41421 16.4142 7.75 16 7.75H8Z"
										fill="currentColor">
									</path>
								</g>
							</svg>
						</div>
						<p>Uploads</p>
					</Link>
				</li>
				<li
					className="text-white font-semibold cursor-pointer w-max hover:text-green-500"
				>
					<Link href="/admin/schedule" className="flex flex-row">
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
					</Link>
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
