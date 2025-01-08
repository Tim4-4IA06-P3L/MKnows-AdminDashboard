"use client";
import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../../components/Toast";
import Spinner from "../../../components/Spinner";
import FileCards from "../../../components/FileCards";
import CancelBtn from "../../../components/CancelBtn";
import ConfirmBtn from "../../../components/ConfirmBtn";
import BlockBackground from "../../../components/BlockBackground";
import Title from "../../../components/Title";
import { StrapiFile, Training } from "@/app/Types";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [trainingType, setTrainingType] = useState<string>("");
  const [isNewTraining, setIsNewTraining] = useState<boolean>(false);

  const [fileName, setFileName] = useState<string>("Upload PDF file"); // PDF Name
  const [file, setFile] = useState<File | null>(null); // Form file
  const [uploadFile, setUploadFile] = useState<boolean>(false); // Status whether to upload new file or pick existed file
  const [existedFiles, setExistedFiles] = useState<StrapiFile[] | null>(null); // List of existed files
  const [selectedExistedFile, setSelectedExistedFile] = useState<number | null>(null); // Selected existed file
  const [selectedExistedFileName, setSelectedExistedFileName] = useState<string>("Select Existed File"); // Selected existed file name

  const [imageName, setImageName] = useState<string>("Upload Thumbnail"); // Image Name
  const [image, setImage] = useState<File | null>(null); // Form image
  const [uploadImage, setUploadImage] = useState<boolean>(false); // Status whether to upload new image or pick existed image
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

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeTrainingType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrainingType(e.target.value);
  };

  const changeIsNewTraining = () => {
    setIsNewTraining(!isNewTraining);
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
  };

  const getTrainingData = async () => {
    const res = await fetch(`${process.env.STRAPI_URL}/api/trainings?populate=*&filters[documentId][$eq]=${id}`);
    const resJson = await res.json();
    const data: Training = resJson.data[0];
    setTitle(data.Title);
    setTrainingType(data.TrainingType);
    setIsNewTraining(data.NewTraining);
    setSelectedExistedFile(data.Document.id);
    setSelectedExistedFileName(data.Document.name);
    setSelectedExistedImage(data.Thumbnail.id);
    setSelectedExistedImageName(data.Thumbnail.name);
  };

  const getRequiredData = async () => {
    await getFilesImages();
    await getTrainingData();
    setAllLoaded(true);
  };

  useEffect(() => {
    getRequiredData();
  }, [allLoaded]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isComplete = title && trainingType &&
      ((file && uploadFile) || (selectedExistedFile && !uploadFile)) &&
      ((image && uploadImage) || (selectedExistedImage && !uploadImage));
    try {
      if (isComplete) {
        setIsSubmit(true);
        const formData = new FormData();
        formData.append("updateId", id);

        if (uploadFile) {
          if (file != null) {
            formData.append("files", file);
            formData.append("newFile", "1");
          }
        } else {
          if (selectedExistedFile != null) {
            formData.append("files", selectedExistedFile.toString());
            formData.append("newFile", "0");
          }
        }

        if (uploadImage) {
          if (image != null) {
            formData.append("files", image);
            formData.append("newImage", "1");
          }
        } else {
          if (selectedExistedImage != null) {
            formData.append("files", selectedExistedImage.toString());
            formData.append("newImage", "0");
          }
        }

        formData.append("title", title);
        formData.append("trainingType", trainingType);
        if (isNewTraining) {
          formData.append("isNewTraining", "1");
        } else {
          formData.append("isNewTraining", "0");
        }

        const response = await fetch("/api/training", {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          router.push("/admin/our-trainings");
        } else {
          setIsSubmit(false);
          setToastMsg("Submit failed");
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

      <Title title="Edit the Training" />
      <section className="flex justify-center mt-8 w-full">
        <form
          className="flex flex-row flex-wrap justify-between w-full gap-3 lg:gap-0"
          onSubmit={handleUpdate}
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
              <p className="font-semibold">
                Training Type <span className="text-red-500 font-semibold">*</span>
              </p>
              <div className="flex flex-row justify-between items-center gap-2">
                <div className="flex flex-row gap-2">
                  <input
                    type="radio"
                    name="trainingType"
                    id="Online"
                    value="Online"
                    checked={trainingType == "Online"}
                    onChange={changeTrainingType}
                  />
                  <label className="font-semibold" htmlFor="Online">
                    Online Training
                  </label>
                </div>

                <div className="flex flex-row gap-2">
                  <input
                    type="radio"
                    name="trainingType"
                    id="Public"
                    value="Public"
                    checked={trainingType == "Public"}
                    onChange={changeTrainingType}
                  />
                  <label className="font-semibold" htmlFor="Public">
                    Public Training
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  name="isNewTraining"
                  id="isNewTraining"
                  checked={isNewTraining}
                  onChange={changeIsNewTraining}
                />
                <label className="font-semibold" htmlFor="isNewTraining">
                  Is It a New Training? <span className="text-red-500 font-semibold">*</span>
                </label>
              </div>
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
                      title=""
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
                      title=""
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

            <div className="w-full flex flex-row justify-end gap-8">
              <CancelBtn href="/admin/our-trainings" padding="py-2 px-5" fontWeight="font-semibold" text="Cancel" />
              <ConfirmBtn btnType="submit" padding="py-2 px-5" fontWeight="font-semibold" text="Save" />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Page;