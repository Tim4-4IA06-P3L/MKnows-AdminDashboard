import React from "react";

const DeleteModal = ({ onCancel, onDelete }) => {
	return (
		<div className="flex flex-col justify-center items-center p-5 space-y-3 bg-[#242628] rounded-md text-white">
			<p>Delete Program?</p>
			<div className="flex flex-row justify-around items-center gap-8 w-full h-full">
				<button type="button" onClick={onCancel}
				className="py-2 px-5 bg-white text-black hover:bg-neutral-200 
				active:ring-offset-2 active:ring-2 active:ring-neutral-800 
				active:ring-offset-white font-semibold rounded-md">
					Cancel
				</button>
				<button type="button" onClick={onDelete}
				className="py-2 px-5 bg-red-600 hover:bg-red-700 active:ring-offset-1 
				active:ring-neutral-100 active:ring-1 active:ring-offset-black 
				text-white font-semibold rounded-md">
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteModal;