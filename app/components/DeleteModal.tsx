import React from "react";

const DeleteModal = ({ checkboxFileStatus, checkboxImageStatus, 
											 changeCheckboxFile, changeCheckboxImage, onCancel, onDelete }) => {
	return (
		<div className="flex flex-col justify-center items-center p-5 space-y-3 bg-[#242628] rounded-md text-white">
			<p>Delete Program?</p>
			<form onSubmit={onDelete}>
				<input type="checkbox" id="deleteFile" name="deleteFile" 
				className="mr-1" onChange={changeCheckboxFile} checked={checkboxFileStatus} />
				<label htmlFor="deleteFile">Delete the file?</label><br />
				<input type="checkbox" id="deleteImage" name="deleteImage" className="mr-1" 
				onChange={changeCheckboxImage} checked={checkboxImageStatus} />
				<label htmlFor="deleteImage">Delete the image?</label>
				<div className="flex flex-row justify-around items-center gap-8 w-full h-full mt-2">
					<span onClick={onCancel}
					className="py-2 px-5 bg-white text-black hover:bg-neutral-200 
					active:ring-offset-2 active:ring-2 active:ring-neutral-800 
					active:ring-offset-white font-semibold rounded-md cursor-pointer">
						Cancel
					</span>
					<button type="submit"
					className="py-2 px-5 bg-red-600 hover:bg-red-700 active:ring-offset-1 
					active:ring-neutral-100 active:ring-1 active:ring-offset-black 
					text-white font-semibold rounded-md">
						Delete
					</button>
				</div>
			</form>
		</div>
	);
};

export default DeleteModal;