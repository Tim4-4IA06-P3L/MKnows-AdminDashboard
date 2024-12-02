"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getCategories from "../../middleware/getCategories";

const page = () => {
	const [fileName, setFileName] = useState("Upload PDF file");
	const [imageName, setImageName] = useState("Upload Thumbnail");
	const [categories, setCategories] = useState([]);
	const router = useRouter();
	const changeFileLabel = (e) => {
		e.preventDefault();
		if (e.target.files[0] != null) {
			setFileName(e.target.files[0].name);
		} else {
			setFileName("Upload PDF file");
		}
	};
	const changeImageLabel = (e) => {
		e.preventDefault();
		if (e.target.files[0] != null) {
			setImageName(e.target.files[0].name);
		} else {
			setImageName("Upload Thumbnail");
		}
	};
	
	const getResponse = async () => {
		const response = await getCategories();
		setCategories(response);
	};
	
	useEffect(() => {
		getResponse();
	}, []);
	
  return (
    <div className="relative flex flex-col justify-center items-center md:ml-[220px] p-8 z-0">
			<h1 className="text-3xl md:text-6xl font-bold">Add a Program</h1>
			
			<section className="flex justify-center mt-8 w-full">
				<form action="#" className="flex flex-row flex-wrap justify-around w-full">
					<div className="flex flex-col space-y-3 basis-[90%] md:basis-[40%]">
						<div className="flex flex-col space-y-2">
							<label className="font-semibold" htmlFor="title">Title <span className="text-red-500 font-semibold">*</span></label>
							<input type="text" name="title" placeholder="Input title" className="border-neutral-500 border-2 rounded-md py-3 px-1" />
						</div>
						<div className="flex flex-col space-y-2">
							<label className="font-semibold" htmlFor="level">Level <span className="text-red-500 font-semibold">*</span></label>
							<input type="text" name="level" placeholder="Input level" className="border-neutral-500 border-2 rounded-md py-3 px-1" />
						</div>
						<div className="flex flex-col space-y-2">
							<label className="font-semibold" htmlFor="category">Category <span className="text-red-500 font-semibold">*</span></label>
							<select name="category" className="w-full py-3 rounded-md border-neutral-500 border-2">
								{categories.map((choice) => (
									<option key={choice.documentId} value={choice.Category}>{choice.Category}</option>
								))}
							</select>
						</div>
						<div className="flex flex-col space-y-2">
							<label className="font-semibold" htmlFor="description">Description <span className="text-red-500 font-semibold">*</span></label>
							<textarea name="description" placeholder="Input the description here" rows="8" cols="18"
								className="border-neutral-500 border-2 rounded-md py-3 px-1 placeholder:text-center placeholder:translate-y-[100%]">
							</textarea>
						</div>
					</div>
					
					<div className="relative flex flex-col space-y-3 basis-[90%] md:basis-[40%] mt-2 md:mt-0">
						<div className="flex flex-col space-y-2">
							<p className="font-semibold">File <span className="text-red-500 font-semibold">*</span></p>
								<label htmlFor="file" className="relative w-full bg-[#242628] border-[#242628] border-2 cursor-pointer py-3 px-1 rounded-md text-white truncate">
									{fileName}
									<input type="file" name="file" 
										className="w-full h-full opacity-0 absolute left-0 top-0 -z-1 file:h-full hover:cursor-pointer file:hover:cursor-pointer" 
										onChange={(e) => changeFileLabel(e)}/>
								</label>
						</div>
						<div className="flex flex-col space-y-2">
							<p className="font-semibold">Image <span className="text-red-500 font-semibold">*</span></p>
								<label htmlFor="image" className="relative w-full bg-[#242628] border-[#242628] border-2 cursor-pointer py-3 px-1 rounded-md text-white truncate">
									{imageName}
									<input type="file" name="image" 
										className="w-full h-full opacity-0 absolute left-0 top-0 -z-1 file:h-full hover:cursor-pointer file:hover:cursor-pointer" 
										onChange={(e) => changeImageLabel(e)}/>
								</label>
						</div>
						<div className="md:absolute w-full flex flex-row justify-end gap-8 md:bottom-0">
							<a href="/our-programs"
									className="p-3 bg-red-200 text-red-500 font-semibold">
								Cancel
							</a>
							<button type="submit" name="submit" value="Submit"
									className="p-3 bg-[#b3ff00] font-semibold">
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
