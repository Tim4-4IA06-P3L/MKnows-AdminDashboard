"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../../components/Toast";
import Spinner from "../../../components/Spinner";
import FileCards from "../../../components/FileCards";
import CancelBtn from "../../../components/CancelBtn";
import ConfirmBtn from "../../../components/ConfirmBtn";
import BlockBackground from "../../../components/BlockBackground";
import Title from "../../../components/Title";
import { Category, StrapiFile } from "@/app/Types";

const Page = () => {
	const router = useRouter();

	const [title, setTitle] = useState<string>("");
	const [level, setLevel] = useState<string>("Beginner");
	const [desc, setDesc] = useState<string>("");

	const [categories, setCategories] = useState<Category[]>([]); // List of categories
	const [selectedCategory, setSelectedCategory] = useState<string>(""); // Selected category from the list
	const [newCategory, setNewCategory] = useState<string>(""); // New category
	const [addCategory, setAddCategory] = useState<boolean>(false); // Status whether to add new category or select existed category

	const [fileName, setFileName] = useState<string>("Upload PDF file"); // PDF Name
	const [file, setFile] = useState<File | null>(null); // Form file
	const [uploadFile, setUploadFile] = useState<boolean>(true); // Status whether to upload new file or pick existed file
	const [existedFiles, setExistedFiles] = useState<StrapiFile[] | null>(null); // List of existed files
	const [selectedExistedFile, setSelectedExistedFile] = useState<number | null>(null); // Selected existed file
	const [selectedExistedFileName, setSelectedExistedFileName] = useState<string>("Select Existed File"); // Selected existed file name

	const [imageName, setImageName] = useState<string>("Upload Thumbnail"); // Image Name
	const [image, setImage] = useState<File | null>(null); // Form image
	const [uploadImage, setUploadImage] = useState<boolean>(true); // Status whether to upload new image or pick existed image
	const [existedImages, setExistedImages] = useState<StrapiFile[] | null>(null); // List of existed images
	const [selectedExistedImage, setSelectedExistedImage] = useState<number | null>(null); // Selected existed image
	const [selectedExistedImageName, setSelectedExistedImageName] = useState<string>("Select Existed Image"); // Selected existed image name

	const [showFilesPickWindow, setShowFilesPickWindow] = useState<boolean>(false);
	const [showImagesPickWindow, setShowImagesPickWindow] = useState<boolean>(false);

	const [allLoaded, setAllLoaded] = useState<boolean>(false); // If all existed data have been retrieved completely.

	// For Handling Toast
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const [showToast, setShowToast] = useState<boolean>(false);
	const [toastMsg, setToastMsg] = useState<string>("");

	const handleShowFilesPickWindow = () => {
		setShowFilesPickWindow(!showFilesPickWindow);
	};

	const handleShowImagesPickWindow = () => {
		setShowImagesPickWindow(!showImagesPickWindow);
	};

	const changeFileStatus = () => {
		setUploadFile(!uploadFile);
	};

	const changeImageStatus = () => {
		setUploadImage(!uploadImage);
	};

	const changeCategoryStatus = () => {
		setAddCategory(!addCategory);
	};

	const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const changeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLevel(e.target.value);
	};

	const changeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDesc(e.target.value);
	};

	const changeSelectedCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(e.target.value);
	};

	const changeNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewCategory(e.target.value);
	};

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files != null) {
			if (e.target.accept.includes(e.target.files[0].type)) {
				setFileName(e.target.files[0].name);
				setFile(e.target.files[0]);
			} else {
				e.target.value = "";
				setFileName("Upload PDF file");
				setFile(null);
			}
		}
	};

	const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files != null) {
			if (e.target.accept.includes(e.target.files[0].type)) {
				setImageName(e.target.files[0].name);
				setImage(e.target.files[0]);
			} else {
				e.target.value = "";
				setImageName("Upload Thumbnail");
				setImage(null);
			}
		}
	};

	const changeSelectedExistedFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const existedFileAttr = JSON.parse(e.currentTarget.getAttribute('value') ?? '');
		setSelectedExistedFile(existedFileAttr[0]);
		setSelectedExistedFileName(existedFileAttr[1]);
		setShowFilesPickWindow(false);
	};

	const changeSelectedExistedImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const existedImageAttr = JSON.parse(e.currentTarget.getAttribute('value') ?? '');
		setSelectedExistedImage(existedImageAttr[0]);
		setSelectedExistedImageName(existedImageAttr[1]);
		setShowImagesPickWindow(false);
	};

	const handleToast = () => {
		setShowToast(true);
		setTimeout(() => setShowToast(false), 5000);
	};

	const getFilesImages = async () => {
		const pattern = /Avatar-[\w]*.[A-Za-z]*/;
		try {
			const response = await fetch(`${process.env.STRAPI_URL}/api/upload/files`);
			const res_json: StrapiFile[] = await response.json();
			setExistedFiles(res_json.filter((rec) => rec.ext.includes("pdf") || rec.ext.includes("PDF")));
			setExistedImages(res_json.filter((rec) => !rec.ext.includes("pdf") && !rec.ext.includes("PDF") && !pattern.test(rec.name)));
		} catch (err) {
			console.log(err);
			setIsSubmit(false);
			setToastMsg("Error fetching files");
			handleToast();
		}
	}

	const getCategories = async () => {
		const response = await fetch(`${process.env.STRAPI_URL}/api/categories?sort=Category`);
		const res_json = await response.json();
		const data = await res_json.data;
		setCategories(data);
		if (data.length > 0) {
			setSelectedCategory(data[0].id);
		} else {
			setSelectedCategory("");
		}
	};

	const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isComplete = title && desc && (selectedCategory || newCategory) &&
			((file && uploadFile) || (selectedExistedFile && !uploadFile)) &&
			((image && uploadImage) || (selectedExistedImage && !uploadImage));
		try {
			if (isComplete) {
				setIsSubmit(true);
				const formData = new FormData();
				const fileFormData = new FormData();
				const imageFormData = new FormData();
				if (uploadFile) {
					if (file != null) {
						fileFormData.append("files", file);
						const response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
							method: 'POST',
							headers: {
								"Authorization": `Bearer ${process.env.API_TOKEN}`,
							},
							body: fileFormData,
						});
						if (!response.ok) {
							setIsSubmit(false);
							setToastMsg("Upload PDF failed");
							handleToast();
						} else {
							const resJson = await response.json();
							formData.append("file", resJson[0].id);
						}
					}
				} else {
					if (selectedExistedFile != null) {
						formData.append("file", selectedExistedFile.toString());
					}
				}

				if (uploadImage) {
					if (image != null) {
						imageFormData.append("files", image);
						const response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
							method: 'POST',
							headers: {
								"Authorization": `Bearer ${process.env.API_TOKEN}`,
							},
							body: imageFormData,
						});
						if (!response.ok) {
							setIsSubmit(false);
							setToastMsg("Upload image failed");
							handleToast();
						} else {
							const resJson = await response.json();
							formData.append("file", resJson[0].id);
						}
					}
				} else {
					if (selectedExistedImage != null) {
						formData.append("file", selectedExistedImage.toString());
					}
				}
				formData.append("title", title);
				formData.append("level", level);
				if (!addCategory) {
					formData.append("category", selectedCategory);
					formData.append("newCategory", "0");
				} else {
					formData.append("category", newCategory);
					formData.append("newCategory", "1");
				}
				formData.append("desc", desc);

				const response = await fetch("/api/program", {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					router.push("/admin/our-programs");
				} else {
					response.json().then((res) => console.log(res.message));
					setIsSubmit(false);
					setToastMsg("Request failed");
					handleToast();
				}
			} else {
				setIsSubmit(false);
				setToastMsg("Incomplete inputs");
				handleToast();
			}
		} catch (error) {
			console.log(error);
			setIsSubmit(false);
			setToastMsg("Something's wrong");
			handleToast();
		}
	};

	useEffect(() => {
		const getRequiredData = async () => {
			await getCategories();
			await getFilesImages();
			setAllLoaded(true);
		};
		getRequiredData();
	}, []);

	return (
		<>
			{(isSubmit || !allLoaded) &&
				<BlockBackground bgColor="bg-neutral-500/[0.5]">
					<Spinner />
				</BlockBackground>}

			{showToast && <Toast message={toastMsg} />}

			{showFilesPickWindow &&
				<BlockBackground bgColor="bg-neutral-500/[0.5]">
					<FileCards fileType="pdf" files={existedFiles} onFileSelected={changeSelectedExistedFile} onClose={() => setShowFilesPickWindow(false)} />
				</BlockBackground>}

			{showImagesPickWindow &&
				<BlockBackground bgColor="bg-neutral-500/[0.5]">
					<FileCards fileType="image" files={existedImages} onImageSelected={changeSelectedExistedImage} onClose={() => setShowImagesPickWindow(false)} />
				</BlockBackground>}

			<Title title="Add a Program" />

			<section className="flex justify-center mt-8 w-full">
				<form
					className="flex flex-row flex-wrap justify-between w-full gap-3 lg:gap-0"
					onSubmit={handleAdd}
				>
					<div className="flex flex-col space-y-3 basis-[100%] lg:basis-[45%]">
						<div className="flex flex-col space-y-2">
							<label className="font-semibold" htmlFor="title">
								Title <span className="text-red-500 font-semibold">*</span>
							</label>
							<input
								type="text"
								name="title"
								id="title"
								placeholder="Input title"
								value={title}
								required
								onChange={(e) => changeTitle(e)}
								className="border-neutral-500 border-2 rounded-md py-3 px-1"
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<label className="font-semibold" htmlFor="level">
								Level <span className="text-red-500 font-semibold">*</span>
							</label>
							<select
								name="level"
								id="level"
								value={level}
								required
								onChange={(e) => changeLevel(e)}
								className="w-full py-3 rounded-md border-neutral-500 border-2"
							>
								<option key="Beginner" value="Beginner">
									Beginner
								</option>
								<option key="Intermediate" value="Intermediate">
									Intermediate
								</option>
								<option key="Advance" value="Advance">
									Advance
								</option>
							</select>
						</div>
						<div className="flex flex-col space-y-2">
							<label className="font-semibold" htmlFor="category">
								Category <span className="text-red-500 font-semibold">*</span>
							</label>
							<div className="flex flex-row gap-2 w-full">
								{!addCategory &&
									<select
										name="category"
										id="category"
										value={selectedCategory}
										required
										onChange={(e) => changeSelectedCategory(e)}
										className="relative w-[80%] border-2 border-neutral-500 cursor-pointer py-3 px-1 rounded-md text-black"
									>
										{categories.length > 0 ? categories.map((choice: Category) => (
											<option key={choice.id} value={choice.id}>
												{choice.Category}
											</option>
										)) :
											<option disabled>
												No categories yet.
											</option>}
									</select>
								}

								{addCategory &&
									<input type='text' placeholder='New category' required={addCategory} value={newCategory} onChange={changeNewCategory}
										className="relative w-[80%] border-neutral-500 border-2 
									py-3 px-1 rounded-md text-black" />
								}
								<div className={`py-3 px-1 flex justify-center items-center cursor-pointer w-[20%] rounded-md
								${addCategory ? "bg-[#242628] text-white" : "bg-neutral-200 text-black"}`}
									onClick={changeCategoryStatus}>
									{addCategory ? "New" : "Select"}
								</div>
							</div>
						</div>
						<div className="flex flex-col space-y-2">
							<label className="font-semibold" htmlFor="description">
								Description <span className="text-red-500 font-semibold">*</span>
							</label>
							<textarea
								name="description"
								id="description"
								placeholder="Input the description here"
								rows={8}
								cols={18}
								onChange={(e) => changeDesc(e)}
								value={desc}
								required
								className="border-neutral-500 border-2 rounded-md py-3 px-1 placeholder:text-center placeholder:translate-y-[100%]"
							></textarea>
						</div>
					</div>

					<div className="relative flex flex-col space-y-3 basis-[100%] lg:basis-[45%] mt-2 md:mt-0">
						<div className="flex flex-col space-y-2">
							<p className="font-semibold">
								File <span className="text-red-500 font-semibold">*</span>
							</p>
							<div className="flex flex-row gap-2 w-full">
								{uploadFile &&
									<label
										htmlFor="file"
										className="relative w-[80%] bg-[#242628] border-[#242628] border-2 
										cursor-pointer py-3 px-1 rounded-md text-white"
									>
										<p className="absolute max-w-[80%] text-ellipsis text-nowrap overflow-clip">{fileName}</p>
										<input
											type="file"
											name="file"
											id="file"
											accept="application/pdf"
											className="w-full h-full opacity-0 absolute left-0 top-0 -z-1 file:h-full hover:cursor-pointer file:hover:cursor-pointer"
											onChange={(e) => changeFile(e)}
										/>
									</label>
								}
								{!uploadFile &&
									<div className="relative w-[80%] bg-neutral-200 border-neutral-200 border-2 
									cursor-pointer py-3 px-1 rounded-md text-black" onClick={handleShowFilesPickWindow}>
										<p className="absolute max-w-[80%] text-ellipsis text-nowrap overflow-clip">{selectedExistedFileName}</p>
									</div>
								}
								<div className={`py-3 px-1 flex justify-center items-center cursor-pointer w-[20%] rounded-md
								${uploadFile ? "bg-[#242628] text-white" : "bg-neutral-200 text-black"}`}
									onClick={changeFileStatus}>
									{uploadFile ? "Upload" : "Pick"}
								</div>
							</div>
						</div>
						<div className="flex flex-col space-y-2">
							<p className="font-semibold">
								Image <span className="text-red-500 font-semibold">*</span>
							</p>
							<div className="flex flex-row gap-2 w-full">
								{uploadImage &&
									<label
										htmlFor="image"
										className="relative w-[80%] bg-[#242628] border-[#242628] border-2 
										cursor-pointer py-3 px-1 rounded-md text-white"
									>
										<p className="absolute max-w-[80%] text-ellipsis text-nowrap overflow-clip">{imageName}</p>
										<input
											type="file"
											name="image"
											id="image"
											accept="image/png, image/jpg, image/jpeg, image/webp"
											className="w-full h-full opacity-0 absolute left-0 top-0 -z-1 file:h-full hover:cursor-pointer file:hover:cursor-pointer"
											onChange={(e) => changeImage(e)}
										/>
									</label>
								}
								{!uploadImage &&
									<div className="relative w-[80%] bg-neutral-200 border-neutral-200 border-2 
									cursor-pointer py-3 px-1 rounded-md text-black" onClick={handleShowImagesPickWindow}>
										<p className="absolute max-w-[80%] text-ellipsis text-nowrap overflow-clip">{selectedExistedImageName}</p>
									</div>
								}
								<div className={`py-3 px-1 flex justify-center items-center cursor-pointer w-[20%] rounded-md
								${uploadImage ? "bg-[#242628] text-white" : "bg-neutral-200 text-black"}`}
									onClick={changeImageStatus}>
									{uploadImage ? "Upload" : "Pick"}
								</div>
							</div>
						</div>
						<div className="lg:absolute w-full flex flex-row justify-end gap-8 lg:bottom-0">
							<CancelBtn href="/admin/our-programs" padding="py-2 px-5" fontWeight="font-semibold" text="Cancel" />
							<ConfirmBtn btnType="submit" padding="py-2 px-5" fontWeight="font-semibold" text="Save" />
						</div>
					</div>
				</form>
			</section>
		</>
	);
};

export default Page;
