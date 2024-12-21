"use client";
import React, { useEffect, useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import EditCategoryModal from "../../components/EditCategoryModal";
import ConfirmBtn from "../../components/ConfirmBtn";
import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";
import NoContentBox from "../../components/NoContentBox";
import Toast from "../../components/Toast";

const page = () => {
	const [categories, setCategories] = useState([0]);
	const [newCategory, setNewCategory] = useState("");
	const [editCategory, setEditCategory] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [deleteId, setDeleteId] = useState("");
	const [editId, setEditId] = useState("");
	const [toastMsg, setToastMsg] = useState("");
	const [showToast, setShowToast] = useState(false);
	
	const changeNewCategory = (e) => {
		setNewCategory(e.target.value);
	};
	
	const changeEditCategory = (e) => {
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
	
	const onDelete = (e) => {
		setDeleteId(e.target.value);
		setShowDeleteModal(true);
	};
	
	const onEdit = (e) => {
		setEditId(e.target.value);
		setShowEditModal(true);
	}
	
	const onDeleteModal = async () => {
		const response = await fetch('/api/category', {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				documentId: deleteId
			})
		});
		setCategories(categories.filter((rec) => rec.documentId != deleteId));
		setDeleteId("");
		setShowDeleteModal(false);
		setToastMsg("Delete successful");
		handleToast();
	};
	
	const onEditModal = async (e) => {
		e.preventDefault();
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
		getCategories();
		setEditId("");
		setEditCategory("");
		setShowEditModal(false);
		setToastMsg("Edit successful");
		handleToast();
	};
	
	const addCategory = async (e) => {
		e.preventDefault();
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
		setNewCategory("");
		getCategories();
		setToastMsg("Add successful");
		handleToast();
	};
	
	const getCategories = async () => {
		const response = await fetch(`${process.env.STRAPI_URL}/api/categories?populate=*&sort=Category`);
		const res_json = await response.json();
		setCategories(res_json.data);
	};
	
	useEffect(() => {
		getCategories();
	}, []);
	
  return (
    <>
			{showDeleteModal && (
        <DeleteModal messageType="Delete Category?" modalType="category" 
					onCancel={onCancelModal} onDelete={onDeleteModal}
				/>
      )}
			
			{showEditModal && (
				<EditCategoryModal value={editCategory} onChange={changeEditCategory} onCancel={onCancelModal} onEdit={onEditModal} />
      )}
			
			{showToast &&
				<Toast message={toastMsg} error={false} />
			}
			
      <h1 className="text-3xl md:text-6xl font-bold">Categories</h1>
			
			<div className="w-full flex flex-col justify-center items-center">
				{categories.length == 0 &&
					<NoContentBox message="You haven't had any categories yet." />
				}
				
				{(categories[0] != 0 && categories.length > 0) &&
					categories.map((rec) => (
						<div className="w-[95%] sm:w-[90%] bg-neutral-100 rounded-md p-5 m-5 gap-3 flex justify-between items-center" key={rec.documentId}>
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
				<form className="w-[95%] sm:w-[90%] bg-[#242628] text-white rounded-md p-5 m-5 gap-3 flex justify-between items-center"
				onSubmit={addCategory}>
					<input type="text" name="newCategory" id="newCategory" 
						className="rounded-md p-2 text-black" placeholder="Add new category" required
						value={newCategory} onChange={changeNewCategory} 
					/>
					<ConfirmBtn btnType="submit" padding="p-2" text="Add" />
				</form>
			</div>
    </>
  );
};

export default page;
