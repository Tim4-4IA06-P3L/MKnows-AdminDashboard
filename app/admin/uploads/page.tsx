"use client";
import React, { useState, useEffect } from "react";
import Thumbnail from "../../components/Thumbnail";
import PDFThumbnail from "../../components/PDFThumbnail";
import ViewFileCard from "../../components/ViewFileCard";
import FileDesc from "../../components/FileDesc";
import DeleteBtn from "../../components/DeleteBtn";
import ConfirmBtn from "../../components/ConfirmBtn";
import CancelBtn from "../../components/CancelBtn";
import Title from "../../components/Title";
import DeleteModal from "../../components/DeleteModal";
import Toast from "../../components/Toast";
import Spinner from "../../components/Spinner";
import BlockBackground from "../../components/BlockBackground";
import NoContentBox from "../../components/NoContentBox";
import { StrapiFile } from "@/app/Types";

const Page = () => {
	const [files, setFiles] = useState<StrapiFile[]>([]);
	const [images, setImages] = useState<StrapiFile[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
	const [uploadFiles, setUploadFiles] = useState<File[]>([]);
	const [numUpload, setNumUpload] = useState<number>(0);
	const [uploadMode, setUploadMode] = useState<boolean>(false);
	const [pdfMode, setPdfMode] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	const [allLoaded, setAllLoaded] = useState<boolean>(false); // If all existed data have been retrieved completely.

	// For Handling Toast
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const [showToast, setShowToast] = useState<boolean>(false);
	const [toastMsg, setToastMsg] = useState<string>("");

	const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (selectedFiles.includes(parseInt(e.target.value))) {
			setSelectedFiles(selectedFiles.filter((rec) => rec != parseInt(e.target.value)));
		} else {
			setSelectedFiles([...selectedFiles, parseInt(e.target.value)]);
		}
	};

	const cancelSelect = () => {
		setSelectedFiles([]);
	};

	const handleToast = () => {
		setShowToast(true);
		setTimeout(() => setShowToast(false), 5000);
	};

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const fileArr: File[] = [];
		const numPrevFiles = uploadFiles.length;
		if (e.target.files != null) {
			[...e.target.files].map((file) => {
				if (e.target.accept.includes(file.type)) {
					fileArr.push(file);
				}
			});
			setUploadFiles([...uploadFiles, ...fileArr]);
			setNumUpload(numPrevFiles + fileArr.length);
			e.target.value = '';
		}
	}

	const handleSubmitUpload = async () => {
		setIsSubmit(true);
		if (uploadFiles.length > 0) {
			const reqFormData = new FormData();
			for (let i = 0; i < uploadFiles.length; i++) {
				reqFormData.append('files', uploadFiles[i]);
			}
			const response = await fetch('/api/files', {
				method: 'POST',
				body: reqFormData
			});

			if (response.ok) {
				window.location.reload();
			} else {
				setIsSubmit(false);
				setToastMsg('Upload failed');
				handleToast();
			}
		} else {
			setIsSubmit(false);
			setToastMsg('No file uploaded');
			handleToast();
		}
	};

	const resetUpload = () => {
		setUploadFiles([]);
		setNumUpload(0);
	};

	const handleDelete = async () => {
		setShowModal(false);
		setIsSubmit(true);
		const response = await fetch('/api/files', {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ files: selectedFiles })
		});

		if (response.ok) {
			window.location.reload();
			setIsSubmit(false);
		} else {
			setIsSubmit(false);
			setToastMsg("Delete failed");
			handleToast();
		}
	};

	const getFiles = async () => {
		const response = await fetch(`${process.env.STRAPI_URL}/api/upload/files?populate=*`);
		const resJson: StrapiFile[] = await response.json();
		const avatarPattern = /Avatar-[\w]*.[A-Za-z]*/;
		setFiles(resJson.filter((rec) => rec.ext.includes("pdf") || rec.ext.includes("PDF")));
		setImages(resJson.filter((rec) => !rec.ext.includes("pdf") && !rec.ext.includes("PDF") && !avatarPattern.test(rec.name)));
	};

	useEffect(() => {
		getFiles();
		setAllLoaded(true);
	}, []);

	return (
		<>
			{(isSubmit || !allLoaded) &&
				<BlockBackground bgColor="bg-neutral-500/[0.5]">
					<Spinner />
				</BlockBackground>
			}

			{showToast && <Toast message={toastMsg} />}

			{showModal && <DeleteModal onCancel={() => setShowModal(false)} onDelete={handleDelete} messageType="Delete selected file(s) ?" />}

			<Title title="Media Uploads" />

			<div className="self-start relative h-2">
				{(selectedFiles.length > 0 && !uploadMode) &&
					<div className="flex gap-3">
						<DeleteBtn btnType="button" padding="p-2" fontWeight="font-semibold" text="Delete Selected" onClick={() => setShowModal(true)} />
						<CancelBtn padding="p-2" fontWeight="font-semibold" onClick={cancelSelect} />
					</div>
				}
				{uploadMode &&
					<div className="flex flex-row gap-3">
						<div>
							<ConfirmBtn padding="p-2" fontWeight="font-semibold" btnType="button" text="Upload Files" onClick={handleSubmitUpload} />
						</div>
						{uploadFiles.length > 0 &&
							<CancelBtn padding="p-2" fontWeight="font-semibold" onClick={resetUpload} />
						}
					</div>
				}
			</div>

			<div className="flex justify-end w-full h-full mt-16">
				<div className="relative w-[80%] h-full border-[1px] border-neutral-100 shadow-lg">
					<div className="absolute flex justify-end bottom-[100%] right-0 text-right gap-5">
						<div className={`${uploadMode ? "text-black bg-white" : "bg-[#242628] text-white underline font-semibold"} shadow-md p-3 cursor-pointer`}
							onClick={() => setUploadMode(false)}
						>
							View
						</div>
						<div className={`${uploadMode ? "bg-[#242628] text-white underline font-semibold" : "text-black bg-white"} shadow-md p-3 cursor-pointer`}
							onClick={() => setUploadMode(true)}
						>
							Upload
						</div>
					</div>

					<div className="absolute flex flex-col justify-end top-0 right-[100%] text-right gap-5">
						<div className={`${pdfMode ? "text-black bg-white" : "bg-[#242628] text-white underline font-semibold"} shadow-md p-3 cursor-pointer`}
							onClick={() => setPdfMode(false)}
						>
							Pictures
						</div>

						<div className={`${pdfMode ? "bg-[#242628] text-white underline font-semibold" : "text-black bg-white"} shadow-md p-3 cursor-pointer`}
							onClick={() => setPdfMode(true)}
						>
							PDF
						</div>
					</div>

					<div className="flex flex-wrap justify-center items-center gap-5 p-5 max-h-[500px] overflow-y-auto">

						{(pdfMode && !uploadMode && files.length == 0) &&
							<NoContentBox message="You haven't had any PDFs yet." />
						}

						{(!pdfMode && !uploadMode && images.length == 0) &&
							<NoContentBox message="You haven't had any images yet." />
						}

						{(!uploadMode && !pdfMode) &&
							images.map((image) => (
								<div className="basis-[18%] flex flex-col justify-center items-center" key={image.id}>
									<div className="relative w-[90px] sm:w-[180px] h-[50px] sm:h-[100px] flex justify-center z-0" >
										<Thumbnail src={`${image.url}`} width={image.width}
											height={image.height} objectFit="cover" objectPosition="center"
										/>
										<ViewFileCard href={`${image.url}`} size="w-[90px] sm:w-[180px] h-[50px] sm:h-[100px]" />
									</div>
									{image.related.length > 0 ?
										<FileDesc selectMode={false} fileName={image.name} /> :
										<FileDesc selectMode={true} fileName={image.name}
											value={image.id.toString()} onChange={selectFile} checked={selectedFiles.includes(image.id)}
										/>
									}
								</div>
							))
						}

						{(!uploadMode && pdfMode) &&
							files.map((file) => (
								<div className="flex flex-row items-center gap-1 w-full" key={file.id}>
									<div className="relative w-[80px] h-[100px] flex justify-center z-0">
										<PDFThumbnail />
										<ViewFileCard href={`${file.url}`} size="w-[80px] h-[100px]" />
									</div>
									{file.related.length > 0 ?
										<FileDesc selectMode={false} fileType="pdf" fileName={file.name} /> :
										<FileDesc selectMode={true} fileType="pdf" fileName={file.name}
											value={file.id.toString()} onChange={selectFile} checked={selectedFiles.includes(file.id)}
										/>
									}
								</div>
							))
						}

						{uploadMode &&
							<label htmlFor="fileUpload"
								className="relative flex flex-col justify-center items-center w-[95%] h-[300px] bg-[#242628] text-white rounded-md"
							>
								<div className="h-16 w-16">
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
								<p className="text-wrap text-center">Upload files <br />(accept .jpg, .jpeg, .png, .webp, .pdf)</p>
								{numUpload != 0 &&
									<p className="absolute bottom-[5%] right-[5%] text-wrap text-center text-sm sm:text-md">
										{`${numUpload} ${numUpload == 1 ? "file is" : "files are"} ready to be uploaded.`}
									</p>
								}
								<input type="file" title="" name="fileUpload" id="fileUpload"
									accept="image/jpg, image/jpeg, image/png, image/webp, application/pdf" multiple
									required className="w-full h-full opacity-0 absolute left-0 top-0 -z-1 file:h-full hover:cursor-pointer file:hover:cursor-pointer"
									onChange={handleUpload}
								/>
							</label>
						}
					</div>

				</div>
			</div>
		</>
	);
};

export default Page;