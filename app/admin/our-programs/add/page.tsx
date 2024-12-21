"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../../components/Toast";
import Spinner from "../../../components/Spinner";
import FileCards from "../../../components/FileCards";

const page = () => {
	const router = useRouter();
	
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [desc, setDesc] = useState("");
	
  const [categories, setCategories] = useState([]); // List of categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category from the list
	const [newCategory, setNewCategory] = useState(""); // New category
	const [addCategory, setAddCategory] = useState(false); // Status whether to add new category or select existed category
	
  const [fileName, setFileName] = useState("Upload PDF file"); // PDF Name
  const [file, setFile] = useState(null); // Form file
	const [uploadFile, setUploadFile] = useState(true); // Status whether to upload new file or pick existed file
	const [existedFiles, setExistedFiles] = useState(null); // List of existed files
	const [selectedExistedFile, setSelectedExistedFile] = useState(null); // Selected existed file
	const [selectedExistedFileName, setSelectedExistedFileName] = useState("Select Existed File"); // Selected existed file name
	
  const [imageName, setImageName] = useState("Upload Thumbnail"); // Image Name
  const [image, setImage] = useState(null); // Form image
	const [uploadImage, setUploadImage] = useState(true); // Status whether to upload new image or pick existed image
	const [existedImages, setExistedImages] = useState(null); // List of existed images
	const [selectedExistedImage, setSelectedExistedImage] = useState(null); // Selected existed image
	const [selectedExistedImageName, setSelectedExistedImageName] = useState("Select Existed Image"); // Selected existed image name
	
	const [showFilesPickWindow, setShowFilesPickWindow] = useState(false);
	const [showImagesPickWindow, setShowImagesPickWindow] = useState(false);
	
	const [allLoaded, setAllLoaded] = useState(false); // If all existed data have been retrieved completely.
	
	// For Handling Toast
	const [isSubmit, setIsSubmit] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMsg, setToastMsg] = useState("");
	
	const handleShowFilesPickWindow = (e) => {
		setShowFilesPickWindow(!showFilesPickWindow);
	};
	
	const handleShowImagesPickWindow = (e) => {
		setShowImagesPickWindow(!showImagesPickWindow);
	};

	const changeFileStatus = (e) => {
		setUploadFile(!uploadFile);
	};
	
	const changeImageStatus = (e) => {
		setUploadImage(!uploadImage);
	};
	
	const changeCategoryStatus = (e) => {
		setAddCategory(!addCategory);
	};
	
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeLevel = (e) => {
    setLevel(e.target.value);
  };

  const changeDesc = (e) => {
    setDesc(e.target.value);
  };

  const changeSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };
	
	const changeNewCategory = (e) => {
    setNewCategory(e.target.value);
  };

  const changeFile = (e) => {
    if (e.target.files[0] != null && e.target.accept.includes(e.target.files[0].type)) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    } else {
			e.target.value = null;
      setFileName("Upload PDF file");
      setFile(null);
    }
  };

  const changeImage = (e) => {
    if (e.target.files[0] != null && e.target.accept.includes(e.target.files[0].type)) {
      setImageName(e.target.files[0].name);
      setImage(e.target.files[0]);
    } else {
			e.target.value = null;
      setImageName("Upload Thumbnail");
      setImage(null);
    }
  };
	
	const changeSelectedExistedFile = (e) => {
		let existedFileAttr = JSON.parse(e.currentTarget.getAttribute('value'));
		setSelectedExistedFile(existedFileAttr[0]);
		setSelectedExistedFileName(existedFileAttr[1]);
		setShowFilesPickWindow(false);
	};
	
	const changeSelectedExistedImage = (e) => {
		let existedImageAttr = JSON.parse(e.currentTarget.getAttribute('value'));
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
			const res_json = await response.json();
			setExistedFiles(res_json.filter((rec) => rec.name.includes("pdf") || rec.name.includes("PDF")));
			setExistedImages(res_json.filter((rec) => !rec.name.includes("pdf") && !rec.name.includes("PDF") && !pattern.test(rec.name)));
		} catch (err) {
			return new Error(err.message);
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
	
	const getRequiredData = async () => {
		await getCategories();
		await getFilesImages();
		setAllLoaded(true);
	};

  const handleAdd = async (e) => {
    e.preventDefault();
		let isComplete = title && desc && (selectedCategory || newCategory) && 
		((file && uploadFile) || (selectedExistedFile && !uploadFile)) && 
		((image && uploadImage) || (selectedExistedImage && !uploadImage));
    try {
			if (isComplete) {
				setIsSubmit(true);
				const formData = new FormData();
				if (uploadFile) {
					formData.append("files", file);
					formData.append("newFile", 1);
				} else {
					formData.append("files", selectedExistedFile);
					formData.append("newFile", 0);
				}
				
				if (uploadImage) {
					formData.append("files", image);
					formData.append("newImage", 1);
				} else {
					formData.append("files", selectedExistedImage);
					formData.append("newImage", 0);
				}
				
				formData.append("title", title);
				formData.append("level", level);
				if (!addCategory) {
					formData.append("category", selectedCategory);
					formData.append("newCategory", 0);
				} else {
					formData.append("category", newCategory);
					formData.append("newCategory", 1);
				}
				formData.append("desc", desc);

				const response = await fetch("/api/program", {
					method: "POST",
					body: formData,
				});
		
				if (response.ok) {
					router.push("/admin/our-programs");
				} else {
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
			setIsSubmit(false);
			setToastMsg("Something's wrong");
			handleToast();
		}
  };

  useEffect(() => {
    getRequiredData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center md:ml-[220px] p-8 z-0">
			{(isSubmit || !allLoaded) && 
			<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-500/[0.5] z-[100]">
				<Spinner />
			</div>}
			
			{showToast && 
			<div className="fixed top-20 right-8 w-full z-[100]">
				<Toast message={toastMsg} onClose={() => setShowToast(false)} />
			</div>}
			
			{showFilesPickWindow && 
			<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-500/[0.5] z-[100]">
				<FileCards fileType="pdf" files={existedFiles} onFileSelected={changeSelectedExistedFile} onClose={() => setShowFilesPickWindow(false)} />
			</div>}
			{showImagesPickWindow && 
			<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-500/[0.5] z-[100]">
				<FileCards fileType="image" files={existedImages} onImageSelected={changeSelectedExistedImage} onClose={() => setShowImagesPickWindow(false)} />
			</div>}
			
      <h1 className="text-3xl md:text-6xl font-bold">Add a Program</h1>

      <section className="flex justify-center mt-8 w-full">
        <form
          className="flex flex-row flex-wrap justify-around w-full"
          method="POST"
          onSubmit={handleAdd}
        >
          <div className="flex flex-col space-y-3 basis-[90%] md:basis-[40%]">
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
										{categories.length > 0 ? categories.map((choice: any) => (
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

          <div className="relative flex flex-col space-y-3 basis-[90%] md:basis-[40%] mt-2 md:mt-0">
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
											required={uploadFile}
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
								{uploadImage  &&
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
											required={uploadImage}
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
            <div className="md:absolute w-full flex flex-row justify-end gap-8 md:bottom-0">
              <a
                href="/admin/our-programs"
                className="py-2 px-5 bg-white text-black hover:bg-neutral-200 
								active:ring-offset-2 active:ring-2 active:ring-neutral-800 
								font-semibold rounded-md border-2 border-neutral-800">
                Cancel
              </a>
              <button type="submit" 
							className="py-2 px-5 bg-[#b3ff00] text-green-800 hover:bg-[#9ee004] 
							active:ring-offset-2 active:ring-2 active:ring-neutral-800 font-semibold rounded-md">
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default page;
