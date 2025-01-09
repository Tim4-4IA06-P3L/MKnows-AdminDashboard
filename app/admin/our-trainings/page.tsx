"use client";
import React, { useState, useEffect } from "react";
import DeleteModal from "../../components/DeleteModal";
import ConfirmBtn from "../../components/ConfirmBtn";
import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";
import Thumbnail from "../../components/Thumbnail";
import BlockBackground from "../../components/BlockBackground";
import Spinner from "../../components/Spinner";
import NoContentBox from "../../components/NoContentBox";
import Title from "../../components/Title";
import { Training } from "../../Types";

const Page = () => {
  const [deleteId, setDeleteId] = useState("");
  const [deleteFileId, setDeleteFileId] = useState("");
  const [deleteFileStatus, setDeleteFileStatus] = useState(false);
  const [deleteImageStatus, setDeleteImageStatus] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<Array<Training | number>>([0]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [deleteProcess, setDeleteProcess] = useState<boolean>(false);

  const getTrainings = async () => {
    const trainingResponse = await fetch(
      `${process.env.STRAPI_URL}/api/trainings?populate=*&sort=Title`
    );
    const responseJson = await trainingResponse.json();
    const trainings = await responseJson.data;
    setData(trainings);
  };

  useEffect(() => {
    getTrainings();
    setAllLoaded(true);
  }, []);

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
    const parsedIDs = JSON.parse(e.currentTarget.getAttribute('value') ?? '');
    setDeleteId(parsedIDs[0]);
    setDeleteFileId(parsedIDs[1]);
    setDeleteImageId(parsedIDs[2]);
    setShowModal(true);
  };

  const confirmCancel = () => {
    setDeleteFileStatus(false);
    setDeleteImageStatus(false);
    setDeleteId("");
    setDeleteFileId("");
    setDeleteImageId("");
    setShowModal(false);
  };

  const changeDeleteFileCheckbox = () => {
    setDeleteFileStatus(!deleteFileStatus);
  };

  const changeDeleteImageCheckbox = () => {
    setDeleteImageStatus(!deleteImageStatus);
  };

  const confirmDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
    setDeleteProcess(true);
    try {
      const deleteFormData = new FormData();
      deleteFormData.append('deleteId', deleteId);
      if (deleteFileStatus) {
        deleteFormData.append('deleteFileId', deleteFileId);
      }
      if (deleteImageStatus) {
        deleteFormData.append('deleteImageId', deleteImageId);
      }
      const response = await fetch("/api/training", {
        method: "DELETE",
        body: deleteFormData
      });

      if (response.ok) {
        setData(
          data.filter(
            (rec) => typeof rec != "number" && rec.documentId != deleteId
          )
        );
        setDeleteProcess(false);
        setDeleteFileStatus(false);
        setDeleteImageStatus(false);
        setDeleteId("");
        setDeleteFileId("");
        setDeleteImageId("");
        setShowModal(false);
      } else {
        setDeleteProcess(false);
        setDeleteFileStatus(false);
        setDeleteImageStatus(false);
        setDeleteId("");
        setDeleteFileId("");
        setDeleteImageId("");
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      setDeleteProcess(false);
      setDeleteFileStatus(false);
      setDeleteImageStatus(false);
      setDeleteId("");
      setDeleteFileId("");
      setDeleteImageId("");
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <BlockBackground bgColor="bg-neutral-500/[0.5]">
          <DeleteModal messageType="Delete Training?" modalType="training"
            checkboxFileStatus={deleteFileStatus} checkboxImageStatus={deleteImageStatus}
            changeCheckboxFile={changeDeleteFileCheckbox} changeCheckboxImage={changeDeleteImageCheckbox}
            onCancel={confirmCancel} onDelete={confirmDelete}
          />
        </BlockBackground>
      )}

      {(!allLoaded || deleteProcess) &&
        <BlockBackground bgColor="bg-neutral-500/[0.5]">
          <Spinner />
        </BlockBackground>
      }

      <section className="flex justify-between items-center w-full">
        <Title title="Our Trainings" />
        <ConfirmBtn href="/admin/our-trainings/add" padding="px-5 py-3" fontWeight="font-semibold" text="Add a training" />
      </section>

      {data.length == 0 && (
        <NoContentBox message="You haven't had any trainings yet." />
      )}

      {data[0] != 0 && data.length > 0 && (
        <section className="flex flex-col justify-center w-full gap-8">
          {data.map(
            (rec) =>
              typeof rec != "number" && (
                <div
                  className="relative flex flex-row justify-start items-center w-full h-max bg-[#242628] p-3 pr-0 space-x-3 rounded-md"
                  key={rec.documentId}
                >
                  <div className="relative h-full basis-[20%] flex-shrink-0">
                    <Thumbnail src={`${rec.Thumbnail.url}`} width={rec.Thumbnail.width}
                      height={rec.Thumbnail.height} objectFit="contain" objectPosition="center"
                    />
                  </div>

                  <div className="text-white basis-[70%] text-wrap">
                    <p className="text-[12px]">{`${rec.TrainingType} Training`}
                      <span className="text-[12px] text-green-500">
                        {`${rec.NewTraining ? " (New!)" : ""}`}
                      </span>
                    </p>
                    <h3 className="font-bold text-lg sm:text-2xl">{rec.Title}</h3>
                  </div>

                  <div className="flex flex-col flex-shrink-0 items-center justify-around w-[120px] h-full right-0 space-y-5">
                    <EditBtn href={`/admin/our-trainings/${rec.documentId}`} width="w-[60%]" padding="py-2" />
                    <DeleteBtn btnType="button"
                      value={`["${rec.documentId}", ${rec.Document.id}, ${rec.Thumbnail.id}]`}
                      onClick={onDelete} width="w-[60%]" padding="py-2"
                    />
                  </div>
                </div>
              )
          )}
        </section>
      )}
    </>
  );
};

export default Page;