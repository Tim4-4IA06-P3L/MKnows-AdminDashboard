"use client";
import React, { useEffect, useState } from "react";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";
import EditCategoryModal from "../../components/EditCategoryModal";

const page = () => {
	const [categories, setCategories] = useState([0]);
	const [newCategory, setNewCategory] = useState("");
	const [editCategory, setEditCategory] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [deleteId, setDeleteId] = useState("");
	const [editId, setEditId] = useState("");
	
	const changeNewCategory = (e) => {
		setNewCategory(e.target.value);
	};
	
	const changeEditCategory = (e) => {
		setEditCategory(e.target.value);
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
    <div className="flex flex-col justify-center items-center md:ml-[220px] p-8">
			{showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-500/[0.5] z-[100]">
          <DeleteCategoryModal onCancel={onCancelModal} onDelete={onDeleteModal} />
        </div>
      )}
			
			{showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-500/[0.5] z-[100]">
          <EditCategoryModal value={editCategory} onChange={changeEditCategory} onCancel={onCancelModal} onEdit={onEditModal} />
        </div>
      )}
			
      <h1 className="text-3xl md:text-6xl font-bold">Categories</h1>
			{categories.length == 0 &&
				<section className="flex justify-center mt-8">
          <div className="p-8 bg-neutral-200 rounded-lg">
            <p className="font-semibold">You haven't had any categories yet.</p>
          </div>
        </section>
			}
			
			{(categories[0] != 0 && categories.length > 0) &&
				categories.map((rec) => (
					<div className="w-[95%] sm:w-[90%] bg-neutral-100 rounded-md p-5 m-5 gap-3 flex justify-between items-center" key={rec.documentId}>
						<div>
							<p className="font-semibold">{rec.Category}</p>
							{rec.programs.length > 0 && 
								<p className="text-sm text-red-500">
									This category has {rec.programs.length} linked program(s).
								</p>
							}
						</div>
						<div className="flex justify-between gap-5">
							<button type="button" value={`${rec.documentId}`} onClick={onEdit}
								className="bg-sky-600 hover:bg-sky-700 active:ring-offset-1 
								active:ring-neutral-100 active:ring-1 active:ring-offset-black text-white text-center rounded-md w-max p-2"
							>
								Edit
							</button>
							
							{!(rec.programs.length > 0) &&
								<button
									type="button" 
									value={`${rec.documentId}`} onClick={onDelete}
									className="bg-red-600 hover:bg-red-700 active:ring-offset-1 
									active:ring-neutral-100 active:ring-1 active:ring-offset-black text-white rounded-md w-max p-2"
								>
									Delete
								</button>
							}
						</div>
					</div>
				))
			}
			<form className="w-[95%] sm:w-[90%] bg-[#242628] text-white rounded-md p-5 m-5 gap-3 flex justify-between items-center"
			onSubmit={addCategory}>
				<input type="text" name="newCategory" id="newCategory" 
				className="rounded-md p-2 text-black" placeholder="Add new category" required
				value={newCategory} onChange={changeNewCategory} />
				<button type="submit"
					className="bg-[#b3ff00] hover:bg-[#9ee004] active:ring-offset-1 
					active:ring-neutral-100 active:ring-1 active:ring-offset-black text-black text-center rounded-md w-max p-2"
				>
					Add
				</button>
			</form>
    </div>
  );
};

export default page;
