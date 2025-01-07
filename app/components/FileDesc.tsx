import React, { FC } from "react";

const FileDesc: FC<{
	selectMode?: boolean,
	checked?: boolean,
	value?: string,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	fileType?: string,
	fileName?: string
}> = ({ selectMode = false, checked, value, onChange, fileType = "image", fileName }) => {

	if (!selectMode) {
		return (
			<>
				{
					fileType == "image" ?
						<div className="max-w-[90px] sm:max-w-[180px] flex justify-center items-center w-full border-2 border-neutral-500 p-2 rounded-b-md mb-1">
							<p className="text-sm max-w-[80%] text-ellipsis text-nowrap overflow-clip">{fileName}</p>
						</div> :

						<p className="max-w-[70%] text-ellipsis text-nowrap overflow-clip">{fileName}</p>
				}
			</>
		);
	} else {
		return (
			<>
				{
					fileType == "image" ?
						<div
							className="max-w-[90px] sm:max-w-[180px] flex justify-center items-center w-full 
						border-2 border-neutral-500 p-2 rounded-b-md mb-1 gap-2"
						>
							<input type="checkbox" className="cursor-pointer" value={value} onChange={onChange} id={value} name="imageName" checked={checked} />
							<label htmlFor={value} className="cursor-pointer text-sm max-w-[70%] text-ellipsis text-nowrap overflow-clip">{fileName}</label>
						</div> :

						<div className="flex gap-2 w-full cursor-pointer">
							<input type="checkbox" className="cursor-pointer" value={value} onChange={onChange} id={value} name="fileName" checked={checked} />
							<label htmlFor={value} className="cursor-pointer max-w-[70%] text-ellipsis text-nowrap overflow-clip">{fileName}</label>
						</div>
				}
			</>
		);
	}
};

export default FileDesc;