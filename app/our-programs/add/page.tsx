"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getCategories from "../../middleware/getCategories";
import Toast from "../../components/Toast";
import Spinner from "../../components/Spinner";

const page = () => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fileName, setFileName] = useState("Upload PDF file");
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("Upload Thumbnail");
  const [image, setImage] = useState(null);
	const [isSubmit, setIsSubmit] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMsg, setToastMsg] = useState("");
  const router = useRouter();

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
	
	const handleToast = () => {
		setShowToast(true);
		setTimeout(() => setShowToast(false), 5000);
	};

  const getCategoriesResponse = async () => {
    const response = await getCategories();
    setCategories(response);
    setSelectedCategory(response[0].id);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
			if (title && desc && selectedCategory && file && image) {
				setIsSubmit(true);
				const formData = new FormData();
				formData.append("files", file);
				formData.append("files", image);
				formData.append("title", title);
				formData.append("level", level);
				formData.append("category", selectedCategory);
				formData.append("desc", desc);

				const response = await fetch("/api/add_program", {
					method: "POST",
					body: formData,
				});
		
				if (response.ok) {
					router.push("/our-programs");
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
    getCategoriesResponse();
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center md:ml-[220px] p-8 z-0">
			{isSubmit && 
			<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-100 opacity-70 z-[100]">
				<Spinner />
			</div>}
			{showToast && 
			<div className="fixed top-20 right-8 w-full z-[100]">
				<Toast message={toastMsg} onClose={() => setShowToast(false)} />
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
              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={(e) => changeSelectedCategory(e)}
                className="w-full py-3 rounded-md border-neutral-500 border-2"
              >
                {categories.map((choice: any) => (
                  <option key={choice.id} value={choice.id}>
                    {choice.Category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="description">
                Description{" "}
                <span className="text-red-500 font-semibold">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Input the description here"
                rows={8}
                cols={18}
                onChange={(e) => changeDesc(e)}
                value={desc}
                className="border-neutral-500 border-2 rounded-md py-3 px-1 placeholder:text-center placeholder:translate-y-[100%]"
              ></textarea>
            </div>
          </div>

          <div className="relative flex flex-col space-y-3 basis-[90%] md:basis-[40%] mt-2 md:mt-0">
            <div className="flex flex-col space-y-2">
              <p className="font-semibold">
                File <span className="text-red-500 font-semibold">*</span>
              </p>
              <label
                htmlFor="file"
                className="relative w-full bg-[#242628] border-[#242628] border-2 
								cursor-pointer py-3 px-1 rounded-md text-white"
              >
								<p className="max-w-[400px] text-ellipsis text-nowrap overflow-clip">{fileName}</p>
                <input
                  type="file"
                  name="file"
                  id="file"
									accept="application/pdf"
                  className="w-full h-full opacity-0 absolute left-0 top-0 -z-1 file:h-full hover:cursor-pointer file:hover:cursor-pointer"
                  onChange={(e) => changeFile(e)}
                />
              </label>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="font-semibold">
                Image <span className="text-red-500 font-semibold">*</span>
              </p>
              <label
                htmlFor="image"
                className="relative w-full bg-[#242628] border-[#242628] border-2 
								cursor-pointer py-3 px-1 rounded-md text-white"
              >
                <p className="max-w-[400px] text-ellipsis text-nowrap overflow-clip">{imageName}</p>
                <input
                  type="file"
                  name="image"
                  id="image"
									accept="image/png, image/jpg, image/jpeg, image/webp"
                  className="w-full h-full opacity-0 absolute left-0 top-0 -z-1 file:h-full hover:cursor-pointer file:hover:cursor-pointer"
                  onChange={(e) => changeImage(e)}
                />
              </label>
            </div>
            <div className="md:absolute w-full flex flex-row justify-end gap-8 md:bottom-0">
              <a
                href="/our-programs"
                className="py-2 px-5 bg-white text-black font-semibold rounded-md border-2 border-neutral-800"
              >
                Cancel
              </a>
              <button type="submit" className="py-2 px-5 bg-[#b3ff00] text-green-800 font-semibold rounded-md">
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
