import React, { FC } from "react";
import BlockBackground from "./BlockBackground";
import CancelBtn from "./CancelBtn";
import DeleteBtn from "./DeleteBtn";

const DeleteModal: FC<{
	checkboxFileStatus?: boolean,
	checkboxImageStatus?: boolean,
	changeCheckboxFile?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	changeCheckboxImage?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	onCancel?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
	onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => void,
	modalType?: string,
	messageType?: string
}> = ({ checkboxFileStatus, checkboxImageStatus,
	changeCheckboxFile, changeCheckboxImage,
	onCancel, onDelete, modalType, messageType }) => {
		return (
			<BlockBackground bgColor="bg-neutral-500/[0.5]">
				<div className="flex flex-col justify-center items-center p-5 space-y-3 bg-[#242628] rounded-md text-white">
					<p>{messageType}</p>
					{(modalType == "program" || modalType == "training") ?
						<form onSubmit={onDelete}>
							<input type="checkbox" id="deleteFile" name="deleteFile"
								className="mr-1" onChange={changeCheckboxFile} checked={checkboxFileStatus}
							/>
							<label htmlFor="deleteFile">Delete the file?</label><br />
							<input type="checkbox" id="deleteImage" name="deleteImage" className="mr-1"
								onChange={changeCheckboxImage} checked={checkboxImageStatus}
							/>
							<label htmlFor="deleteImage">Delete the image?</label>
							<div className="flex flex-row justify-around items-center gap-8 w-full h-full mt-2">
								<CancelBtn onClick={onCancel} padding="py-2 px-5" fontWeight="" text="Cancel" href="" />
								<DeleteBtn
									btnType="submit"
									padding="py-2 px-5"
									fontWeight="font-semibold"
								/>
							</div>
						</form> :

						<div className="flex flex-row justify-around items-center gap-8 w-full h-full">
							<CancelBtn onClick={onCancel} padding="py-2 px-5" fontWeight="font-semibold" text="Cancel" href="" />
							<DeleteBtn
								btnType="button"
								onClick={onDelete}
								padding="py-2 px-5"
								fontWeight="font-semibold"
							/>
						</div>
					}
				</div>
			</BlockBackground>
		);
	};

export default DeleteModal;