"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DeleteModal from "../components/DeleteModal";
import { Program } from "../Types";

const page = () => {
  const [deleteId, setDeleteId] = useState("");
  const [deleteFileId, setDeleteFileId] = useState("");
  const [deleteImageId, setDeleteImageId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<Array<Program | number>>([0]);
  const getPrograms = async () => {
    const programResponse = await fetch(
      `${process.env.STRAPI_URL}/api/our-programs?populate=*`
    );
    const responseJson = await programResponse.json();
    const programs = await responseJson.data;
    setData(programs);
  };

  useEffect(() => {
    getPrograms();
  }, []);

  const onDelete = (e) => {
    const parsedIDs = JSON.parse(e.target.value);
    setDeleteId(parsedIDs[0]);
    setDeleteFileId(parsedIDs[1]);
    setDeleteImageId(parsedIDs[2]);
    setShowModal(true);
  };

  const confirmCancel = (e) => {
    setDeleteId("");
    setDeleteFileId("");
    setDeleteImageId("");
    setShowModal(false);
  };

  const confirmDelete = async (e) => {
    try {
      const response = await fetch("/api/program", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deleteId,
          fileId: deleteFileId,
          imageId: deleteImageId,
        }),
      });

      if (response.ok) {
        setData(
          data.filter(
            (rec) => typeof rec != "number" && rec.documentId != deleteId
          )
        );
        setDeleteId("");
        setDeleteFileId("");
        setDeleteImageId("");
        setShowModal(false);
      } else {
        setDeleteId("");
        setDeleteFileId("");
        setDeleteImageId("");
        setShowModal(false);
      }
    } catch (err) {
      console.log(err.message);
      setDeleteId("");
      setDeleteFileId("");
      setDeleteImageId("");
      setShowModal(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center md:ml-[220px] p-8 gap-8">
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-500/[0.5] z-[100]">
          <DeleteModal onCancel={confirmCancel} onDelete={confirmDelete} />
        </div>
      )}
      <section className="flex justify-between items-center w-full">
        <h1 className="text-3xl md:text-6xl font-bold">Our Programs</h1>
        <a
          href="/our-programs/add"
          className="px-5 py-3 rounded-lg bg-[#b3ff00] hover:bg-[#9ee004] 
				active:ring-offset-2 active:ring-2 active:ring-neutral-800 text-center font-semibold"
        >
          Add a program
        </a>
      </section>
      {data.length == 0 && (
        <section className="flex justify-center mt-8">
          <div className="p-8 bg-neutral-200 rounded-lg">
            <p className="font-semibold">You haven't had any programs yet.</p>
          </div>
        </section>
      )}

      {data[0] != 0 && data.length > 0 && (
        <section className="flex flex-col justify-center w-full gap-8">
          {data.map(
            (rec) =>
              typeof rec != "number" && (
                <div
                  className="relative flex flex-row justify-start items-center w-full h-max bg-[#242628] p-3 pr-0 space-x-3"
                  key={rec.documentId}
                >
                  <div className="relative h-full basis-[20%] flex-shrink-0">
                    <Image
                      src={`${process.env.STRAPI_URL}${rec.Thumbnail.formats.small.url}`}
                      width={rec.Thumbnail.formats.small.width}
                      height={rec.Thumbnail.formats.small.height}
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        width: "auto",
                        height: "100%",
                      }}
                      alt="Thumbnail"
                    />
                  </div>

                  <div className="text-white basis-[70%] text-wrap">
                    <p className="text-[12px]">{rec.Category.Category}</p>
                    <h3 className="font-bold text-lg">{rec.Title}</h3>
                    <p className="text-justify min-[320px]:max-sm:static sm:hidden">
                      {rec.Level}
                    </p>
                    <p className="text-justify min-[320px]:max-sm:hidden">
                      {rec.Description}
                    </p>
                  </div>

                  <div className="flex flex-col flex-shrink-0 items-center justify-around w-[120px] h-full right-0 space-y-5">
                    <a href={`/our-programs/${rec.documentId}`}
                      className="bg-sky-600 hover:bg-sky-700 active:ring-offset-1 
							active:ring-neutral-100 active:ring-1 active:ring-offset-black text-white text-center rounded-md w-[60%] py-2"
                    >
                      Edit
                    </a>
                    <button
                      type="button"
                      value={`["${rec.documentId}", ${rec.Thumbnail.id}, ${rec.Document.id}]`}
                      onClick={onDelete}
                      className="bg-red-600 hover:bg-red-700 active:ring-offset-1 
							active:ring-neutral-100 active:ring-1 active:ring-offset-black text-white rounded-md w-[60%] py-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        </section>
      )}
    </div>
  );
};

export default page;
