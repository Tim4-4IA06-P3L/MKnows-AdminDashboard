"use client";
import React, { useState, useEffect, useRef } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import ProfilePhotoModal from "../components/ProfilePhotoModal";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

const page = () => {
	const router = new useRouter();
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
			console.log(artificialURL);
			setNewPhotoURL(artificialURL);
			setShowModal(false);
		}
	};
	
	const cancelUpload = (e) => {
		setNewPhotoURL(oldPhotoURL.current);
		setNewPhotoExt("");
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
				setShowToast(true);
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
				setShowToast(true);
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
			setShowToast(true);
			return;
		}
		
		router.push("/dashboard");
	};
	
	useEffect(() => {
		getRequiredData();
	}, []);
	
  return (
    <div className="flex flex-col justify-center items-center md:ml-[220px] p-8">
			{(isSubmit || !allLoaded) && 
			<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-500/[0.5] z-[100]">
				<Spinner />
			</div>}
			
			{showModal && 
			<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-500/[0.5] z-[100]">
				<ProfilePhotoModal avatarURL={newPhotoURL} onClose={toggleShowModal} onUpload={changePhoto} onRemove={changeRemovePhoto} />
			</div>}
			
			{showToast && 
			<div className="fixed top-20 right-8 w-full z-[100]">
				<Toast message={toastMsg} onClose={() => setShowToast(false)} />
			</div>}
			
      <div className="flex flex-col justify-start relative w-full sm:w-[60%] gap-8">
				<h1 className="text-3xl md:text-6xl font-bold">Your Account</h1>
				<div className="flex flex-row justify-start items-center gap-3 w-max">
					<div 
						className="w-8 h-8 sm:w-16 sm:h-16 rounded-[50%] bg-neutral-500 bg-contain bg-center"
						style={{ backgroundImage: `url('${newPhotoURL}')` }}>
					</div>
					<p onClick={toggleShowModal}
					className="py-2 px-5 bg-[#b3ff00] text-green-800 hover:bg-[#9ee004] cursor-pointer 
					active:ring-offset-2 active:ring-2 active:ring-neutral-800 font-semibold rounded-md">
						Update Profile Photo
					</p>
					{(oldPhotoURL.current != newPhotoURL) &&
						<p onClick={cancelUpload}
						className="py-2 px-5 bg-white text-black hover:bg-neutral-200 cursor-pointer
						active:ring-offset-2 active:ring-2 active:ring-neutral-800 font-semibold rounded-md
						border-2 border-neutral-800">
							Cancel
						</p>
					}
				</div>
				
				<form className="flex flex-col justify-center w-full" onSubmit={handleUpdate}>
					<label htmlFor="username" className="font-bold">New Username<span className="text-red-500">*</span></label>
					<input type="text" id="username" name="username" value={newUsername} 
						onChange={changeUsername} required autoComplete="one-time-code"
						className="w-full rounded-md border-2 border-neutral-500 py-5 px-2 mb-8"
					/>
					
					<label htmlFor="oldPassword" className="font-bold">Current Password</label>
					<div className="relative mb-8">
						<input type={hideOldPassword ? "password" : "text"} id="oldPassword" name="oldPassword" value={oldPassword} 
							onChange={changeOldPassword} autoComplete="one-time-code"
							className="w-full rounded-md border-2 border-neutral-500 py-5 px-2"
						/>
						<button onClick={toggleHideOldPassword} type="button"
							className="flex justify-center items-center absolute right-3 w-5 h-5 top-6">
							{hideOldPassword ? <EyeIcon /> : <EyeSlashIcon />}
						</button>
					</div>
					
					<div className="flex flex-row gap-2 w-[100%] items-end">
						<div className="basis-[50%]">
							<label htmlFor="password" className="font-bold">New Password</label>
							<div className="relative mb-8">
								<input type={hidePassword ? "password" : "text"} id="password" name="password" value={newPassword} 
									onChange={changePassword} autoComplete="one-time-code"
									className="w-full rounded-md border-2 border-neutral-500 py-5 px-2"
								/>
								<button onClick={toggleHidePassword} type="button"
									className="flex justify-center items-center absolute right-3 w-5 h-5 top-6">
									{hidePassword ? <EyeIcon /> : <EyeSlashIcon />}
								</button>
							</div>
						</div>
						<div className="basis-[50%]">
							<label htmlFor="confirmPassword" className="font-bold">Confirm New Password</label>
							<div className="relative mb-8">
								<input type={hidePassword ? "password" : "text"} id="confirmPassword" name="confirmPassword" value={confirmNewPassword} 
									onChange={changeConfirmPassword} autoComplete="one-time-code"
									className="w-full rounded-md border-2 border-neutral-500 py-5 px-2"
								/>
								<button onClick={toggleHideConfirmPassword} type="button"
									className="flex justify-center items-center absolute right-3 w-5 h-5 top-6">
									{hideConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
								</button>
							</div>
						</div>
					</div>
					
					<div className="relative flex flex-row gap-3 self-end">
						<a
							href="/dashboard"
							className="py-2 px-5 bg-white text-black hover:bg-neutral-200 
							active:ring-offset-2 active:ring-2 active:ring-neutral-800 
							font-semibold rounded-md border-2 border-neutral-800">
							Cancel
						</a>
						<button type="submit" 
						className="py-2 px-5 bg-[#b3ff00] text-green-800 hover:bg-[#9ee004] 
						active:ring-offset-2 active:ring-2 active:ring-neutral-800 font-semibold rounded-md">
							Save
						</button>
					</div>
				</form>
			</div>
    </div>
  );
};

export default page;
