"use client";
import React, { useState, useEffect, useRef } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import ProfilePhotoModal from "../../components/ProfilePhotoModal";
import Toast from "../../components/Toast";
import Spinner from "../../components/Spinner";
import Avatar from "../../components/Avatar";
import CancelBtn from "../../components/CancelBtn";
import ConfirmBtn from "../../components/ConfirmBtn";
import BlockBackground from "../../components/BlockBackground";
import PasswordInput from "../../components/PasswordInput";
import Title from "../../components/Title";

const page = () => {
	const AdminID = useRef("");
	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPhoto, setNewPhoto] = useState(null);
	const [newPhotoExt, setNewPhotoExt] = useState("");
	const [removePhoto, setRemovePhoto] = useState(false);
	const oldPhotoURL = useRef("/Avatar101.jpg");
	const [newPhotoURL, setNewPhotoURL] = useState(oldPhotoURL.current);
	const [hidePassword, setHidePassword] = useState(true);
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
	const [hideOldPassword, setHideOldPassword] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [allLoaded, setAllLoaded] = useState(false); // If all existed data have been retrieved completely.
	const [isSubmit, setIsSubmit] = useState(false);
	const [toastMsg, setToastMsg] = useState("");
	const [showToast, setShowToast] = useState(false);
	
	const changeUsername = (e) => {
		setNewUsername(e.target.value);
	};
	
	const changeOldPassword = (e) => {
		setOldPassword(e.target.value);
	};
	
	const changePassword = (e) => {
		setNewPassword(e.target.value);
	};
	
	const changeConfirmPassword = (e) => {
		setConfirmNewPassword(e.target.value);
	};
	
	const changePhoto = (e) => {
		if (e.target.files[0] != null && e.target.accept.includes(e.target.files[0].type)) {
			setNewPhoto(e.target.files[0]);
			setNewPhotoExt(e.target.files[0].type.split("/")[1]);
			const artificialURL = URL.createObjectURL(e.target.files[0]);
			setNewPhotoURL(artificialURL);
			setRemovePhoto(false);
			setShowModal(false);
		}
	};
	
	const cancelUpload = (e) => {
		setNewPhotoURL(oldPhotoURL.current);
		setNewPhotoExt("");
		setNewPhoto(null);
		setRemovePhoto(false);
	};
	
	const changeRemovePhoto = (e) => {
		setRemovePhoto(true);
		setNewPhoto(null);
		setNewPhotoExt("");
		setNewPhotoURL("/Avatar101.jpg");
		setShowModal(false);
	}
	
	const getMe = async () => {
		const meRes = await fetch('/api/me', {
			method: 'GET'
		});
		const meJson = await meRes.json();
		setNewUsername(meJson.username);
		AdminID.current = meJson.AdminID;
	};
	
	const getPhotoURL = async () => {
		const res = await fetch('/api/avatar', {
			method: 'GET'
		});
		const res_json = await res.json();
		oldPhotoURL.current = res_json.avatarURL ? `${process.env.STRAPI_URL}${res_json.avatarURL}` : "/Avatar101.jpg";
		setNewPhotoURL(res_json.avatarURL ? `${process.env.STRAPI_URL}${res_json.avatarURL}` : "/Avatar101.jpg");
	};
	
	const getRequiredData = async () => {
		await getMe();
		await getPhotoURL();
		setAllLoaded(true);
	};
	
	const toggleHideOldPassword = () => {
		setHideOldPassword(!hideOldPassword);
	};
	
	const toggleHidePassword = () => {
		setHidePassword(!hidePassword);
	};
	
	const toggleHideConfirmPassword = () => {
		setHideConfirmPassword(!hideConfirmPassword);
	};
	
	const toggleShowModal = () => {
		setShowModal(!showModal);
	};
	
	const handleToast = () => {
		setShowToast(true);
		setTimeout(() => setShowToast(false), 5000);
	};
	
	const reqUpdateData = async (formData) => {
		const response = await fetch('/api/me', {
			method: 'PUT',
			body: formData
		});
		return response.status;
	};
	
	const handleUpdate = async (e) => {
		e.preventDefault();
		setIsSubmit(true);
		const reqPhotoFormData = new FormData();
		const reqFormData = new FormData();
		
		if (newPhoto) {
			reqPhotoFormData.append('files', newPhoto, `Avatar-${AdminID.current}.${newPhotoExt}`);
			const photoResponse = await fetch('/api/avatar', {
				method: 'POST',
				body: reqPhotoFormData
			});
		}
		
		if (removePhoto) {
			const removeRes = await fetch('/api/avatar', {
				method: 'DELETE'
			});
			
			if (!removeRes.ok) {
				setIsSubmit(false);
				setToastMsg("Failed updating photo");
				handleToast();
				return;
			}
		}
		
		reqFormData.append('newUsername', newUsername);
		if (newPassword && confirmNewPassword && oldPassword) {
			if ((newPassword == confirmNewPassword) && oldPassword) {
				reqFormData.append('oldPassword', oldPassword);
				reqFormData.append('newPassword', newPassword);
			} else {
				setIsSubmit(false);
				setToastMsg("Different password confirmation");
				handleToast();
				return;
			}
		}
		const response = await fetch('/api/me', {
			method: 'PUT',
			body: reqFormData
		});
		
		if (!response.ok) {
			setIsSubmit(false);
			setToastMsg("Wrong password");
			handleToast();
			return;
		}
		
		window.location.reload();
	};
	
	useEffect(() => {
		getRequiredData();
	}, []);
	
  return (
    <>
			{(isSubmit || !allLoaded) && 
			<BlockBackground bgColor="bg-neutral-500/[0.5]" >
				<Spinner />
			</BlockBackground>}
			
			{showModal && 
			<ProfilePhotoModal avatarURL={newPhotoURL} onClose={toggleShowModal} onUpload={changePhoto} onRemove={changeRemovePhoto} />}
			
			{showToast && <Toast message={toastMsg} />}
			
      <div className="flex flex-col justify-start relative w-full sm:w-[60%] gap-8">
				<Title title="Your Account" />
				<div className="flex flex-row justify-start items-center gap-3 w-max">
					<Avatar PhotoURL={newPhotoURL} className="border-[1px] border-black" />
					
					<ConfirmBtn onClick={toggleShowModal} btnType="button" padding="py-2 px-5" 
						fontWeight="font-semibold" text="Update Profile Photo" 
					/>
					
					{(oldPhotoURL.current != newPhotoURL) &&
						<CancelBtn onClick={cancelUpload} padding="py-2 px-5" fontWeight="font-semibold" text="Cancel" />
					}
				</div>
				
				<form className="flex flex-col justify-center w-full" onSubmit={handleUpdate}>
					<label htmlFor="username" className="font-bold">New Username<span className="text-red-500">*</span></label>
					<input type="text" id="username" name="username" value={newUsername} 
						onChange={changeUsername} required autoComplete="one-time-code"
						className="w-full rounded-md border-2 border-neutral-500 py-5 px-2 mb-8"
					/>
					
					<PasswordInput idName="oldPassword" label="Current Password" hideStatus={hideOldPassword}
						value={oldPassword} required={Boolean(newPassword || confirmNewPassword)} 
						onChange={changeOldPassword} toggle={toggleHideOldPassword}
					/>
					
					<div className="flex flex-row gap-2 w-[100%] items-end">
						<div className="basis-[50%]">
							<PasswordInput idName="password" label="New Password" hideStatus={hidePassword}
								value={newPassword} required={Boolean(oldPassword || confirmNewPassword)} 
								onChange={changePassword} toggle={toggleHidePassword}
							/>
						</div>
						<div className="basis-[50%]">
							<PasswordInput idName="confirmPassword" label="Confirm New Password" hideStatus={hideConfirmPassword}
								value={confirmNewPassword} required={Boolean(oldPassword || newPassword)} 
								onChange={changeConfirmPassword} toggle={toggleHideConfirmPassword}
							/>
						</div>
					</div>
					
					<div className="relative flex flex-row gap-3 self-end">
						<CancelBtn padding="py-2 px-5" href="/admin/dashboard" text="Cancel" fontWeight="font-semibold" />
						<ConfirmBtn padding="py-2 px-5" btnType="submit" fontWeight="font-semibold" text="Save" />
					</div>
				</form>
			</div>
    </>
  );
};

export default page;
