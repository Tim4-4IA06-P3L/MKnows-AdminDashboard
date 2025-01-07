import React, { FC } from "react";
import EditBtn from "./EditBtn";
import CancelBtn from "./CancelBtn";
import BlockBackground from "./BlockBackground";

const EditCategoryModal: FC<{
	value: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	onCancel: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
	onEdit: (e: React.FormEvent<HTMLFormElement>) => void,
}> = ({ value, onChange, onCancel, onEdit }) => {
	return (
		<BlockBackground bgColor="bg-neutral-500/[0.5]">
			<div className="flex flex-col justify-center items-center p-5 space-y-3 bg-[#242628] rounded-md text-white">
				<p>Edit Category</p>
				<form onSubmit={onEdit} className="w-full">
					<input type="text" name="editCategory" id="editCategory" placeholder="Edit category" required
						value={value} onChange={onChange} className="w-full p-3 rounded-md text-black" />

					<div className="flex flex-row justify-around items-center gap-8 w-full h-full mt-2">
						<CancelBtn padding="py-2 px-5" fontWeight="font-semibold" text="Cancel" onClick={onCancel} href="" />
						<EditBtn
							btnType="submit"
							padding="py-2 px-5"
							fontWeight="font-semibold"
							href=""
							onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => { }}
							width=""
							value=""
						/>
					</div>
				</form>
			</div>
		</BlockBackground>
	);
}

export default EditCategoryModal;