"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getCategories from "../../middleware/getCategories";
import Toast from "../../components/Toast";

const page = () => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("beginner");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fileName, setFileName] = useState("Upload PDF file");
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("Upload Thumbnail");
  const [image, setImage] = useState(null);
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
    if (e.target.files[0] != null) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    } else {
      setFileName("Upload PDF file");
      setFile(null);
    }
  };

  const changeImage = (e) => {
    if (e.target.files[0] != null) {
      setImageName(e.target.files[0].name);
      setImage(e.target.files[0]);
    } else {
      setImageName("Upload Thumbnail");
      setImage(null);
    }
  };

  const getCategoriesResponse = async () => {
    const response = await getCategories();
    setCategories(response);
    setSelectedCategory(response[0].id);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
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
        console.log(response.status);
      }
    } catch (error) {
			
		}
  };

  useEffect(() => {
    getCategoriesResponse();
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center md:ml-[220px] p-8 z-0">
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
                <option key="beginner" value="beginner">
                  Beginner
                </option>
                <option key="intermediate" value="intermediate">
                  Intermediate
                </option>
                <option key="advance" value="advance">
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
                className="relative w-full bg-[#242628] border-[#242628] border-2 cursor-pointer py-3 px-1 rounded-md text-white truncate"
              >
                {fileName}
                <input
                  type="file"
                  name="file"
                  id="file"
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
                className="relative w-full bg-[#242628] border-[#242628] border-2 cursor-pointer py-3 px-1 rounded-md text-white truncate"
              >
                {imageName}
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="w-full h-full opacity-0 absolute left-0 top-0 -z-1 file:h-full hover:cursor-pointer file:hover:cursor-pointer"
                  onChange={(e) => changeImage(e)}
                />
              </label>
            </div>
            <div className="md:absolute w-full flex flex-row justify-end gap-8 md:bottom-0">
              <a
                href="/our-programs"
                className="p-3 bg-red-200 text-red-500 font-semibold"
              >
                Cancel
              </a>
              <button type="submit" className="p-3 bg-[#b3ff00] font-semibold">
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
