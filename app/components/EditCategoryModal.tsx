import React from "react";

const EditCategoryModal = ({ value, onChange, onCancel, onEdit }) => {
	return (
		<div className="flex flex-col justify-center items-center p-5 space-y-3 bg-[#242628] rounded-md text-white">
			<p>Edit Category</p>
			<form onSubmit={onEdit} className="w-full">
				<input type="text" name="editCategory" id="editCategory" placeholder="Edit category" required
				value={value} onChange={onChange} className="w-full p-3 rounded-md text-black" />
				
				<div className="flex flex-row justify-around items-center gap-8 w-full h-full mt-2">
					<span onClick={onCancel}
					className="py-2 px-5 bg-white text-black hover:bg-neutral-200 
					active:ring-offset-2 active:ring-2 active:ring-neutral-800 
					active:ring-offset-white font-semibold rounded-md cursor-pointer">
						Cancel
					</span>
					<button type="submit"
					className="py-2 px-5 bg-sky-600 hover:bg-sky-700 active:ring-offset-1 
					active:ring-neutral-100 active:ring-1 active:ring-offset-black 
					text-white font-semibold rounded-md">
						Edit
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditCategoryModal;