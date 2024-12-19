import React from "react";

const ProfilePhotoModal = ({avatarURL, onClose, onUpload, onRemove}) => {
	return (
		<div>
			<div className="flex flex-row justify-between items-center bg-neutral-800 rounded-t-md py-2 shadow-lg">
				<p className="ml-4 font-semibold text-white">Update Profile Photo</p>
				<div className="mr-4 cursor-pointer" onClick={onClose}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-8">
						<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg>
				</div>
			</div>
			
			<div className="flex flex-col justify-start gap-3 p-5 bg-white rounded-b-md">
				<div className="flex flex-row justify-around items-center gap-8">
					<div className="rounded-[50%] w-16 h-16 bg-contain bg-center" 
						style={{ backgroundImage: `url('${avatarURL}')` }}>
					</div>
					<label htmlFor="photo"
						className="relative p-2 bg-[#b3ff00] text-green-800 hover:bg-[#9ee004] cursor-pointer
						active:ring-offset-2 active:ring-2 active:ring-neutral-800 rounded-md
						border-[2px] border-[#9ee004]">Upload
						<input type="file" title="" name="photo" id="photo" accept="image/jpg, image/jpeg, image/png, image/webp" onChange={onUpload}
							className="w-full h-full opacity-0 absolute left-0 top-0 -z-1 file:h-full hover:cursor-pointer file:hover:cursor-pointer" />
					</label>
					
					<div onClick={onRemove}
						className="p-2 bg-white text-black hover:bg-neutral-200 cursor-pointer
						active:ring-offset-2 active:ring-2 active:ring-neutral-800 rounded-md 
						border-[2px] border-neutral-800">Remove</div>
				</div>
				<p className="self-end">Recommended size 1:1</p>
			</div>
		</div>
	);
};

export default ProfilePhotoModal;