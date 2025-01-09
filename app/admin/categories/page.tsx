"use client";
import React, { useEffect, useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import EditCategoryModal from "../../components/EditCategoryModal";
import ConfirmBtn from "../../components/ConfirmBtn";
import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";
import NoContentBox from "../../components/NoContentBox";
import Toast from "../../components/Toast";
import Title from "../../components/Title";
import BlockBackground from "../../components/BlockBackground";
import Spinner from "../../components/Spinner";
import { Category } from "@/app/Types";

const Page = () => {
	const [categories, setCategories] = useState<(Category | number)[]>([0]);
	const [newCategory, setNewCategory] = useState<string>("");
	const [editCategory, setEditCategory] = useState<string>("");
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const [editId, setEditId] = useState<string>("");
	const [toastMsg, setToastMsg] = useState<string>("");
	const [showToast, setShowToast] = useState<boolean>(false);
	const [allLoaded, setAllLoaded] = useState<boolean>(false);
	const [processing, setProcessing] = useState<boolean>(false);

	const changeNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewCategory(e.target.value);
	};

	const changeEditCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditCategory(e.target.value);
	};

	const handleToast = () => {
		setShowToast(true);
		setTimeout(() => setShowToast(false), 5000);
	};

	const onCancelModal = () => {
		setEditId("");
		setEditCategory("");
		setDeleteId("");
		setShowDeleteModal(false);
		setShowEditModal(false);
	}

	const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
		setDeleteId(e.currentTarget.getAttribute('value') ?? '');
		setShowDeleteModal(true);
	};

	const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
		setEditId(e.currentTarget.getAttribute('value') ?? '');
		setShowEditModal(true);
	}

	const onDeleteModal = async () => {
		setShowDeleteModal(false);
		setProcessing(true);
		const response = await fetch('/api/category', {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				documentId: deleteId
			})
		});
		if (response.ok) {
			setShowDeleteModal(false);
			setProcessing(false);
			setCategories(categories.filter((rec) => typeof rec != 'number' && rec.documentId != deleteId));
			setDeleteId("");
			setShowDeleteModal(false);
			setToastMsg("Delete successful");
			handleToast();
		} else {
			setShowDeleteModal(false);
			setProcessing(false);
			setToastMsg("Delete failed");
			handleToast();
		}
	};

	const onEditModal = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowEditModal(false);
		setProcessing(true);
		const response = await fetch('/api/category', {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				documentId: editId,
				Category: editCategory
			})
		});
		if (response.ok) {
			getCategories();
			setProcessing(false);
			setEditId("");
			setEditCategory("");
			setShowEditModal(false);
			setToastMsg("Edit successful");
			handleToast();
		} else {
			setProcessing(false);
			setShowEditModal(false);
			setToastMsg("Edit failed");
			handleToast();
		}
	};

	const addCategory = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setProcessing(true);
		const response = await fetch('/api/category', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				data: {
					Category: newCategory
				}
			})
		});
		if (response.ok) {
			setProcessing(false);
			setNewCategory("");
			getCategories();
			setToastMsg("Add successful");
			handleToast();
		} else {
			setProcessing(false);
			setToastMsg("Add failed");
			handleToast();
		}
	};

	const getCategories = async () => {
		const response = await fetch(`${process.env.STRAPI_URL}/api/categories?populate=*&sort=Category`);
		const res_json = await response.json();
		setCategories(res_json.data);
	};

	useEffect(() => {
		getCategories();
		setAllLoaded(true);
	}, []);

	return (
		<>
			{showDeleteModal && (
				<DeleteModal
					messageType="Delete Category?"
					modalType="category"
					onCancel={onCancelModal}
					onDelete={onDeleteModal}
				/>
			)}

			{showEditModal && (
				<EditCategoryModal value={editCategory} onChange={changeEditCategory} onCancel={onCancelModal} onEdit={onEditModal} />
			)}

			{showToast &&
				<Toast message={toastMsg} error={false} />
			}

			{(!allLoaded || processing) &&
				<BlockBackground bgColor="bg-neutral-500/[0.5]">
					<Spinner />
				</BlockBackground>
			}

			<Title title="Categories" />

			<div className="w-full flex flex-col justify-center items-center">
				<form className="w-full bg-[#242628] text-white rounded-md p-5 m-5 gap-3 flex justify-between items-center flex-wrap"
					onSubmit={addCategory}>
					<input type="text" name="newCategory" id="newCategory"
						className="rounded-md p-2 text-black w-[100%] sm:w-[50%]" placeholder="Add new category" required
						value={newCategory} onChange={changeNewCategory}
					/>
					<ConfirmBtn btnType="submit" padding="p-2" text="Add" />
				</form>

				{categories.length == 0 &&
					<NoContentBox message="You haven't had any categories yet." />
				}

				{(categories[0] != 0 && categories.length > 0) &&
					categories.map((rec) => (typeof rec != 'number' &&
						<div className="w-full bg-neutral-100 rounded-md p-5 m-5 gap-3 flex justify-between items-center" key={rec.documentId}>
							<div>
								<p className="font-semibold">{rec.Category}</p>
								{
									rec.programs.length > 0 &&
									<p className="text-sm text-red-500">
										This category has {rec.programs.length} linked program(s).
									</p>
								}
							</div>
							<div className="flex justify-between gap-5">
								<EditBtn btnType="button" value={`${rec.documentId}`} onClick={onEdit} width="w-max" padding="p-2" />
								{!(rec.programs.length > 0) &&
									<DeleteBtn btnType="button" value={`${rec.documentId}`} onClick={onDelete} width="w-max" padding="p-2" />
								}
							</div>
						</div>
					))
				}
			</div>
		</>
	);
};

export default Page;
