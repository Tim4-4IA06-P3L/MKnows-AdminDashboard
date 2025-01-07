import React, { FC } from "react";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import PDFThumbnail from "./PDFThumbnail";
import FileDesc from "./FileDesc";
import ViewFileCard from "./ViewFileCard";
import ConfirmBtn from "./ConfirmBtn";
import { StrapiFile } from "../Types";

const FileCards: FC<{
	fileType?: string,
	files?: StrapiFile[] | null,
	onFileSelected?: (e: React.MouseEvent<HTMLButtonElement>) => void,
	onImageSelected?: (e: React.MouseEvent<HTMLButtonElement>) => void,
	onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}> = ({ fileType, files, onFileSelected, onImageSelected, onClose }) => {
	return (
		<div className="relative max-w-[90%] max-h-[85%] overflow-y-auto bg-white rounded-md shadow-lg">
			<div className="w-full h-[58px] rounded-t-md bg-neutral-100 flex flex-row justify-between items-center sticky top-0 z-[100]">
				{fileType == "pdf" ? <p className="ml-4 font-bold">Select Existed File</p> : <p className="ml-4 font-bold">Select Existed Image</p>}
				<div className="mr-4 cursor-pointer" onClick={onClose}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-8">
						<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg>
				</div>
			</div>
			{fileType == "image" ?
				<div className="flex justify-center flex-wrap gap-3 md:gap-5 max-h-full p-5">
					{files != null && files.map((file) => (
						<div className="basis-[18%] flex flex-col justify-center items-center flex-shrink-1 flex-grow-1" key={file.id}>
							<div className="relative w-[90px] sm:w-[180px] h-[50px] sm:h-[100px] flex justify-center z-0">
								<Thumbnail src={`${file.url}`} width={file.width} height={file.height}
									objectFit="cover" objectPosition="center"
								/>
								<ViewFileCard href={`${file.url}`} size="w-[90px] sm:w-[180px] h-[50px] sm:h-[100px]" />
							</div>
							<FileDesc
								fileName={file.name}
								selectMode={false}
								checked={false}
								value=""
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => { }}
								fileType="image"
							/>
							<ConfirmBtn
								btnType={undefined}
								value={`[${file.id}, "${file.name}"]`}
								onClick={onImageSelected}
								fontWeight="font-semibold"
								padding="p-1"
								text="Select"
								href=""
							/>
						</div>
					))}
				</div> :
				<div className="flex flex-col justify-start gap-2 md:gap-5 max-h-full w-full overflow-x-hidden overflow-y-auto p-5">
					{files != null && files.map((file) => (
						<div className="flex flex-row items-center gap-1 w-full" key={file.id}>
							<div className="relative w-[80px] h-[100px] flex justify-center z-0">
								<PDFThumbnail />
								<ViewFileCard href={`${file.url}`} size="w-[80px] h-[100px]" />
							</div>

							<div className="w-full flex flex-col justify-start">
								<FileDesc
									fileType="pdf"
									fileName={file.name}
									selectMode={false}
									checked={false}
									value=""
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => { }}
								/>
								<ConfirmBtn
									value={`[${file.id}, "${file.name}"]`}
									onClick={onFileSelected}
									padding="p-1"
									text="Select"
									fontWeight="font-semibold"
									btnType={undefined}
									href=""
								/>
							</div>
						</div>
					))}
				</div>
			}
		</div>
	);
}

export default FileCards;